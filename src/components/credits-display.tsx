'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { getUserCredits } from '@/lib/credits'

export function CreditsDisplay() {
  const { user } = useAuth()
  const [credits, setCredits] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCredits() {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const amount = await getUserCredits(user.id)
        setCredits(amount)
        setError(null)
      } catch (err) {
        console.error('Error fetching credits:', err)
        setError('Failed to load credits')
        setCredits(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCredits()
  }, [user])

  if (loading) {
    return <span className="text-muted-foreground">Loading credits...</span>
  }

  if (error) {
    return <span className="text-red-500" title={error}>Error loading credits</span>
  }

  if (!user) {
    return <span className="text-muted-foreground">Not signed in</span>
  }

  if (credits === null) {
    return <span className="text-muted-foreground">No credits found</span>
  }

  return (
    <span className="font-medium">
      {credits} credit{credits !== 1 ? 's' : ''}
    </span>
  )
}
