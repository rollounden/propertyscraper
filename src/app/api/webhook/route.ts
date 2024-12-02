import { NextResponse } from 'next/server'

const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL

export async function POST(request: Request) {
  console.log('Webhook endpoint hit')
  console.log('Environment MAKE_WEBHOOK_URL:', MAKE_WEBHOOK_URL) // Log the webhook URL
  
  try {
    const body = await request.json()
    const { url } = body
    
    console.log('Received URL:', url)

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

    return NextResponse.json({
      message: 'Property search initiated',
      data: result
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process property search' },
      { status: 500 }
    )
  }
}
