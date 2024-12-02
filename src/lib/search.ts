import { supabase } from './supabase'

export type SearchResult = {
  id: string
  user_id: string
  url: string
  property_data: any
  status: 'pending' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export async function createSearchResult(userId: string, url: string): Promise<SearchResult | null> {
  const { data, error } = await supabase
    .from('search_results')
    .insert({
      user_id: userId,
      url,
      status: 'pending'
    })
    .select()
    .single()
  
  if (error) {
    console.error('Error creating search result:', error)
    return null
  }

  return data
}

export async function updateSearchResult(id: string, propertyData: any): Promise<boolean> {
  const { error } = await supabase
    .from('search_results')
    .update({
      property_data: propertyData,
      status: 'completed'
    })
    .eq('id', id)
  
  if (error) {
    console.error('Error updating search result:', error)
    return false
  }

  return true
}

export async function markSearchAsFailed(id: string, error?: string): Promise<boolean> {
  const { error: updateError } = await supabase
    .from('search_results')
    .update({
      status: 'failed',
      property_data: { error: error || 'Search failed' }
    })
    .eq('id', id)
  
  if (updateError) {
    console.error('Error marking search as failed:', updateError)
    return false
  }

  return true
}

export async function getSearchHistory(userId: string): Promise<SearchResult[]> {
  const { data, error } = await supabase
    .from('search_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching search history:', error)
    return []
  }

  return data || []
}

export async function getSearchResult(id: string): Promise<SearchResult | null> {
  const { data, error } = await supabase
    .from('search_results')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching search result:', error)
    return null
  }

  return data
}
