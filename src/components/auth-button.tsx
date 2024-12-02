'use client'

import { Button } from "./ui/button"
import { useAuth } from "./auth-provider"
import { supabase } from "@/lib/supabase"

export function AuthButton() {
  const { user, loading } = useAuth()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return <Button disabled>Loading...</Button>
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {user.email}
        </span>
        <Button variant="outline" onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Button onClick={handleSignIn}>
      Sign in with Google
    </Button>
  )
}
