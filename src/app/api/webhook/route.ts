import { NextResponse } from 'next/server'
import { updateSearchResult, markSearchAsFailed } from '@/lib/search'
import { supabase } from '@/lib/supabase'

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL

export async function POST(request: Request) {
  console.log('Webhook endpoint hit')
  
  try {
    const body = await request.json()
    console.log('Received webhook data:', body)

    // Check if this is an initial request (has url and searchId) or Make.com response (has raw)
    if (body.url && body.searchId) {
      // This is the initial request - forward to Make.com
      console.log('Forwarding request to Make.com...')
      
      const webhookPayload = {
        propertyUrl: body.url,
        searchId: body.searchId,
        timestamp: new Date().toISOString(),
      }

      if (!MAKE_WEBHOOK_URL) {
        console.error('Make.com webhook URL not configured')
        await markSearchAsFailed(body.searchId, 'Webhook URL not configured')
        return NextResponse.json(
          { error: 'Webhook URL not configured' },
          { status: 500 }
        )
      }

      // Send to Make.com
      const response = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload),
      })

      if (!response.ok) {
        const error = `Make.com request failed: ${response.status}`
        console.error(error)
        await markSearchAsFailed(body.searchId, error)
        return NextResponse.json(
          { error },
          { status: 500 }
        )
      }

      return NextResponse.json({ message: 'Search started' })
    } 
    else if (body.raw && body.searchId) {
      // This is the Make.com response
      console.log('Processing Make.com response')
      
      let propertyData
      try {
        propertyData = JSON.parse(body.raw)[0]
        console.log('Parsed property data:', propertyData)
      } catch (error) {
        console.error('Failed to parse property data:', error)
        await markSearchAsFailed(body.searchId, 'Failed to parse property data')
        return NextResponse.json(
          { error: 'Failed to parse property data' },
          { status: 400 }
        )
      }

      // Extract and organize the data
      const propertyDetails = {
        propertyName: propertyData.PropertyNameEn,
        zone: propertyData.ZoneNameEn,
        propertyType: propertyData.PropertyTypeNameEn,
        propertyValue: propertyData.PropertyValue,
        rooms: propertyData.RoomsCount,
        size: propertyData.PropertySize,
        permitNumber: propertyData.PermitNumber,
        buildingName: propertyData.BuildingNameEn,
        unitNumber: propertyData.PropertyUnitNumber,
        permitEndDate: propertyData.PermitEndDate
      }

      const contactDetails = {
        authorityName: propertyData.AuthorityNameEn,
        licenseNumber: propertyData.LicenseNumber,
        cardHolderNumber: propertyData.CardHolderNumber,
        cardHolderName: propertyData.CardHolderNameEn,
        cardHolderMobile: propertyData.CardHolderMobile,
        cardHolderEmail: propertyData.CardHolderEmail
      }

      // Update the search result
      const { error } = await supabase
        .from('search_results')
        .update({
          status: 'completed',
          property_details: propertyDetails,
          contact_details: contactDetails,
          completed_at: new Date().toISOString()
        })
        .eq('id', body.searchId)

      if (error) {
        console.error('Failed to update search result:', error)
        await markSearchAsFailed(body.searchId, 'Failed to update database')
        return NextResponse.json(
          { error: 'Failed to update search result' },
          { status: 500 }
        )
      }

      return NextResponse.json({ message: 'Search result updated successfully' })
    } 
    else {
      console.error('Invalid webhook payload:', body)
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
