"use client"

import { Button } from "@/components/ui/button"

export function TestButton() {
  const handleClick = async () => {
    try {
      console.log('Testing endpoint...')
      const res = await fetch('/api/test')
      const data = await res.json()
      console.log('Test response:', data)
    } catch (error) {
      console.error('Test error:', error)
    }
  }

  return (
    <Button onClick={handleClick} variant="outline">
      Test Connection
    </Button>
  )
}
