'use client'

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tools</h2>
        <p className="text-muted-foreground">
          Manage your property search tools and settings.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Add tool cards here */}
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Property Search</h3>
          <p className="text-sm text-muted-foreground">
            Search for property owner details from UAE real estate portals.
          </p>
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Coming Soon</h3>
          <p className="text-sm text-muted-foreground">
            More tools are coming soon...
          </p>
        </div>
      </div>
    </div>
  )
}
