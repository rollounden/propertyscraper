'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, session: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()
        console.log('Initial session:', initialSession ? 'present' : 'absent')
        
        setSession(initialSession)
        setUser(initialSession?.user ?? null)

        // If we're on the sign-in page and have a session, redirect to dashboard
        if (initialSession && window.location.pathname === '/auth/signin') {
          console.log('Redirecting to dashboard from sign-in page')
          window.location.href = '/dashboard'
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    // Get initial session
    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state changed:', event, newSession ? 'session present' : 'no session')
      
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setLoading(false)

      // Handle sign in
      if (event === 'SIGNED_IN') {
        console.log('User signed in, refreshing')
        
        // If we're on the sign-in page, redirect to dashboard
        if (window.location.pathname === '/auth/signin') {
          window.location.href = '/dashboard'
        }
      }

      // Handle sign out
      if (event === 'SIGNED_OUT') {
        console.log('User signed out')
        window.location.href = '/'
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
