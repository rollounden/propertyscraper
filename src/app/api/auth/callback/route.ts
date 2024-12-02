import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    console.log('Auth callback hit:', { code: code ? 'present' : 'missing' })

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      await supabase.auth.exchangeCodeForSession(code)
      console.log('Successfully exchanged code for session')

      // Make sure to use the absolute URL for redirection
      const redirectUrl = new URL('/dashboard', request.url)
      console.log('Redirecting to:', redirectUrl.toString())
      
      // Set cache-control headers to prevent caching
      const response = NextResponse.redirect(redirectUrl)
      response.headers.set('cache-control', 'no-store, max-age=0')
      return response
    }

    console.log('No code present, redirecting to sign in')
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  } catch (error) {
    console.error('Error in auth callback:', error)
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }
}
