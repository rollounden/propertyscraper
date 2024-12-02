'use client'

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Search History</h2>
        <p className="text-muted-foreground">
          View your recent property searches and their results.
        </p>
      </div>

      <div className="rounded-lg border">
        {/* Add history table here */}
        <div className="p-4">
          <p className="text-center text-sm text-muted-foreground">
            No search history yet. Try searching for a property!
          </p>
        </div>
      </div>
    </div>
  )
}
