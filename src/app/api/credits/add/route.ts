import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { user_id, amount } = await request.json()

    if (!user_id || !amount) {
      console.error('Missing required fields:', { user_id, amount })
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Call the add_credits RPC function directly
    const { error } = await supabase.rpc('add_credits', {
      user_id,
      amount_to_add: amount
    })

    if (error) {
      console.error('Failed to add credits:', error)
      return new NextResponse(error.message, { status: 500 })
    }

    return new NextResponse('Credits added successfully', { status: 200 })
  } catch (error) {
    console.error('Error in /api/credits/add:', error)
    return new NextResponse(
      error instanceof Error ? error.message : 'Error adding credits',
      { status: 500 }
    )
  }
}
