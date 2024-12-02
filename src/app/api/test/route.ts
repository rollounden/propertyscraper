import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    webhookUrl: process.env.MAKE_WEBHOOK_URL || 'not set',
    message: 'Test endpoint'
  })
}
