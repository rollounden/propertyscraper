'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "./auth-provider"

export function PropertySearchForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to search for properties",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    console.log("Form submitted")

    const formData = new FormData(event.currentTarget)
    const url = formData.get("url")

    console.log("Making fetch request...")
    try {
      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      console.log("Response received")
      const data = await response.json()
      console.log("Data:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit URL")
      }

      toast({
        title: "Success",
        description: "Property search request submitted successfully",
      })
    } catch (error: any) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit property URL",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Input
          type="url"
          name="url"
          placeholder="Enter property URL from propertyfinder.ae, bayut.com, or dubizzle.com"
          required
          disabled={loading || !user}
        />
      </div>
      <Button type="submit" disabled={loading || !user}>
        {loading ? "Searching..." : "Search Property"}
      </Button>
      {!user && (
        <p className="text-sm text-muted-foreground">
          Please sign in to search for properties
        </p>
      )}
    </form>
  )
}
