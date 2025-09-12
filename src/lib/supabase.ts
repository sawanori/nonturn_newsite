import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

// Check if we're using the new API key format
const isNewKeyFormat = supabaseAnonKey.startsWith('sb_publishable_');

// Create a dummy client if environment variables are not set
// This allows the app to run without Supabase (using mock API)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  },
  global: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // Add apikey header for new key format
      ...(isNewKeyFormat ? { 'apikey': supabaseAnonKey } : {})
    }
  }
})