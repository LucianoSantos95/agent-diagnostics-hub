// Reexporta o client oficial (gerado), que lê as variáveis corretas
// (VITE_SUPABASE_PUBLISHABLE_KEY). Antes este arquivo criava um client próprio
// com VITE_SUPABASE_ANON_KEY, que não existe — caindo no placeholder e fazendo
// o insert da sessão falhar silenciosamente (→ "session_not_found").
export { supabase } from '@/integrations/supabase/client'

export const supabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
