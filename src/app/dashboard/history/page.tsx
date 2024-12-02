export default function HistoryPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        
        <div className="space-y-4">
          {/* We'll add the history list here */}
          <p className="text-gray-500">No search history available</p>
        </div>
      </div>
    </div>
  )
}
