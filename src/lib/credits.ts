import { supabase } from './supabase'

export type UserCredits = {
  id: string
  user_id: string
  amount: number
  created_at: string
  updated_at: string
}

export async function getUserCredits(userId: string): Promise<number> {
  try {
    console.log('Fetching credits for user:', userId)
    const { data, error } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', userId)
      .maybeSingle()
    
    if (error) {
      console.error('Error fetching credits:', error)
      throw error
    }

    console.log('Credits data:', data)
    return data?.amount ?? 0
  } catch (error) {
    console.error('Error in getUserCredits:', error)
    throw error
  }
}

export async function addCredits(userId: string, amount: number): Promise<boolean> {
  try {
    console.log('Adding credits:', { userId, amount })
    const { error } = await supabase
      .rpc('add_credits', {
        p_user_id: userId,
        p_amount: amount
      })

    if (error) {
      console.error('Error adding credits:', error)
      throw error
    }

    return true
  } catch (error) {
    console.error('Error in addCredits:', error)
    throw error
  }
}

export async function deductCredits(userId: string, amount: number): Promise<boolean> {
  return addCredits(userId, -amount)
}

// Initialize credits for a new user
export async function initializeUserCredits(userId: string): Promise<void> {
  try {
    console.log('Initializing credits for user:', userId)
    const { error } = await supabase
      .from('credits')
      .insert({ 
        user_id: userId,
        amount: 3 // Start with 3 credits
      })
      .single()

    if (error && error.code !== '23505') { // Ignore unique violation errors
      console.error('Error initializing credits:', error)
      throw error
    }
  } catch (error) {
    console.error('Error in initializeUserCredits:', error)
    throw error
  }
}
