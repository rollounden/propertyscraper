import { NextResponse } from 'next/server'
import { updateSearchResult, markSearchAsFailed } from '@/lib/search'
import { supabase } from '@/lib/supabase'

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL

export async function POST(request: Request) {
  console.log('Webhook endpoint hit')
  console.log('Environment MAKE_WEBHOOK_URL:', MAKE_WEBHOOK_URL) // Log the webhook URL
  
  try {
    const body = await request.json()
    
    // Verify webhook secret if needed
    // const webhookSecret = process.env.WEBHOOK_SECRET
    // if (request.headers.get('x-webhook-secret') !== webhookSecret) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    const { searchId, success, data, error, url } = body

    if (!url) {
      console.error('No URL provided')
      return NextResponse.json(
        { error: 'Property URL is required' },
        { status: 400 }
      )
    }

    if (!MAKE_WEBHOOK_URL) {
      console.error('Webhook URL not configured')
      return NextResponse.json(
        { error: 'Webhook URL not configured' },
        { status: 500 }
      )
    }

    console.log('Preparing to send request to Make.com webhook...')
    
    const webhookPayload = {
      propertyUrl: url,
      timestamp: new Date().toISOString(),
    }
    console.log('Webhook payload:', webhookPayload)

    // Send the URL to Make.com webhook
    console.log('Sending POST request to:', MAKE_WEBHOOK_URL)
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    })

    console.log('Make.com response status:', response.status)
    
    const responseText = await response.text()
    console.log('Raw response:', responseText)

    if (!response.ok) {
      console.error('Make.com webhook failed:', response.status, responseText)
      throw new Error(`Failed to send webhook: ${response.status} ${responseText}`)
    }

    let result
    try {
      result = responseText ? JSON.parse(responseText) : {}
    } catch (e) {
      console.log('Response was not JSON:', responseText)
      result = { raw: responseText }
    }

    console.log('Processed response:', result)

    if (!searchId) {
      return new NextResponse('Missing searchId', { status: 400 })
    }

    if (success && data) {
      await updateSearchResult(searchId, data)
    } else {
      await markSearchAsFailed(searchId, error)
    }

    // Handle user sign up events
    if (body.type === 'auth.signup') {
      const { user_id } = body.data

      // Insert initial credits for new user
      const { error } = await supabase
        .from('credits')
        .insert({
          user_id,
          amount: 10 // Give 10 free credits to new users
        })

      if (error && error.code !== '23505') { // Ignore unique violation errors
        console.error('Error initializing credits:', error)
        return new NextResponse('Error initializing credits', { status: 500 })
      }
    }

    return new NextResponse('OK', { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
