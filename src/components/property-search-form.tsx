"use client"

import { useState, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function PropertySearchForm() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('Form submitted')
    
    if (!url) {
      console.log('No URL provided')
      return
    }

    try {
      setIsLoading(true)
      console.log('Making fetch request...')
      
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
      
      console.log('Response received')
      const data = await res.json()
      console.log('Data:', data)
      
      toast({
        title: "Success!",
        description: "URL submitted successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error!",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter property URL"
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </Button>
    </form>
  )
}
