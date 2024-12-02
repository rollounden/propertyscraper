'use client'

import { useState, useEffect } from 'react'
import { useAuth } from './auth-provider'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import { getUserCredits, deductCredits } from '@/lib/credits'
import { createSearchResult } from '@/lib/search'

export function PropertySearchForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState<number>(0)

  useEffect(() => {
    if (user) {
      loadCredits()
    }
  }, [user])

  async function loadCredits() {
    if (!user) return
    const amount = await getUserCredits(user.id)
    setCredits(amount)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Error",
        description: "You must be signed in to search for properties",
        variant: "destructive",
      })
      return
    }

    if (credits < 1) {
      toast({
        title: "Insufficient Credits",
        description: "You need at least 1 credit to perform a search",
        variant: "destructive",
      })
      return
    }

    try {
      setLoading(true)

      // Create search result first
      const searchResult = await createSearchResult(user.id, url)
      if (!searchResult) {
        throw new Error('Failed to create search result')
      }

      // Deduct credits
      const deducted = await deductCredits(user.id, 1)
      if (!deducted) {
        throw new Error('Failed to deduct credits')
      }

      // Refresh credits display
      await loadCredits()

      // Send request to webhook
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          searchId: searchResult.id
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to process property search')
      }

      toast({
        title: "Search Started",
        description: "Your property search has been initiated. Results will appear in your history.",
      })

      // Clear form
      setUrl('')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process property search",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Search Property</h3>
        <div className="text-sm text-muted-foreground">
          Credits: {credits}
        </div>
      </div>
      
      <div className="flex gap-2">
        <Input
          type="url"
          placeholder="Enter property URL from propertyfinder.ae, bayut.com, or dubizzle.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Each search costs 1 credit. Results will appear in your search history.
      </p>
    </form>
  )
}
