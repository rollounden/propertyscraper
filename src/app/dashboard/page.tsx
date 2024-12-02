'use client'

import { PropertySearchForm } from "@/components/property-search-form"

export default function DashboardPage() {
  return (
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
  )
}
