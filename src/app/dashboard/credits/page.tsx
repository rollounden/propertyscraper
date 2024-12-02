'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { Card } from '@/components/ui/card'
import { getUserCredits } from '@/lib/credits'
import { CreditsDisplay } from '@/components/credits-display'

export default function CreditsPage() {
  const { user } = useAuth()
  const [credits, setCredits] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCredits() {
      if (!user) return
      try {
        const amount = await getUserCredits(user.id)
        setCredits(amount)
        setError(null)
      } catch (err) {
        console.error('Error fetching credits:', err)
        setError('Failed to load credits')
      }
    }

    fetchCredits()
  }, [user])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to view your credits</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Credits</h1>

        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : credits === null ? (
                <p>Loading...</p>
              ) : (
                <p className="text-3xl font-bold">
                  <CreditsDisplay credits={credits} />
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Need More Credits?</h2>
          <p className="mb-4">
            Contact us to purchase additional credits for your account.
          </p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Email:</span>{' '}
              <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
                support@example.com
              </a>
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{' '}
              <a href="tel:+1234567890" className="text-blue-500 hover:underline">
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
