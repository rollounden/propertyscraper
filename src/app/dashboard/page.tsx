'use client'

import { useAuth } from '@/components/auth-provider'
import { PropertySearchForm } from "@/components/property-search-form"
import { CreditsDisplay } from '@/components/credits-display'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Please sign in to access the dashboard</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="text-sm">
            Balance: <CreditsDisplay />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Property Search</h2>
            <p className="text-muted-foreground">
              Search for property owner details from UAE real estate portals.
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <PropertySearchForm />
          </div>
        </div>
      </div>
    </div>
  )
}
