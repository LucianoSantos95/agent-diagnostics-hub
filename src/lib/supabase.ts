import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

// Fallback seguro — app renderiza mesmo sem Supabase configurado
const url = SUPABASE_URL ?? 'https://placeholder.supabase.co'
const key = SUPABASE_ANON_KEY ?? 'placeholder'

export const supabase = createClient(url, key)
export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
