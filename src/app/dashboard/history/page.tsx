'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { getSearchHistory, type SearchResult } from '@/lib/search'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function HistoryPage() {
  const { user } = useAuth()
  const [searches, setSearches] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadSearchHistory()
    }
  }, [user])

  async function loadSearchHistory() {
    if (!user) return
    setLoading(true)
    try {
      const history = await getSearchHistory(user.id)
      setSearches(history)
    } catch (error) {
      console.error('Error loading search history:', error)
    } finally {
      setLoading(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading history...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Search History</h2>
          <p className="text-muted-foreground">
            View your recent property searches and their results.
          </p>
        </div>
        <Button onClick={loadSearchHistory}>Refresh</Button>
      </div>

      {searches.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">No search history yet. Try searching for a property!</p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Results</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searches.map((search) => (
                <TableRow key={search.id}>
                  <TableCell className="font-medium max-w-[300px] truncate">
                    {search.url}
                  </TableCell>
                  <TableCell>
                    <span className={
                      search.status === 'completed' ? 'text-green-600' :
                      search.status === 'failed' ? 'text-red-600' :
                      'text-yellow-600'
                    }>
                      {search.status.charAt(0).toUpperCase() + search.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatDate(search.created_at)}</TableCell>
                  <TableCell>
                    {search.status === 'completed' && (
                      <pre className="text-sm max-w-[300px] truncate">
                        {JSON.stringify(search.property_data)}
                      </pre>
                    )}
                    {search.status === 'failed' && (
                      <span className="text-red-600">
                        {search.property_data?.error || 'Search failed'}
                      </span>
                    )}
                    {search.status === 'pending' && (
                      <span className="text-yellow-600">Processing...</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
