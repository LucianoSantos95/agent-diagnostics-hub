import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import PageBackground from '@/components/PageBackground'

type State =
  | { kind: 'loading' }
  | { kind: 'valid' }
  | { kind: 'already' }
  | { kind: 'invalid' }
  | { kind: 'submitting' }
  | { kind: 'done' }
  | { kind: 'error'; message: string }

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string

export default function UnsubscribePage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [state, setState] = useState<State>({ kind: 'loading' })

  useEffect(() => {
    if (!token) {
      setState({ kind: 'invalid' })
      return
    }
    ;(async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON } },
        )
        const data = await res.json()
        if (data.valid) setState({ kind: 'valid' })
        else if (data.reason === 'already_unsubscribed') setState({ kind: 'already' })
        else setState({ kind: 'invalid' })
      } catch {
        setState({ kind: 'invalid' })
      }
    })()
  }, [token])

  const confirm = async () => {
    setState({ kind: 'submitting' })
    const { data, error } = await supabase.functions.invoke('handle-email-unsubscribe', {
      body: { token },
    })
    if (error) {
      setState({ kind: 'error', message: 'Não foi possível concluir. Tente novamente.' })
      return
    }
    if ((data as any)?.success) setState({ kind: 'done' })
    else if ((data as any)?.reason === 'already_unsubscribed') setState({ kind: 'already' })
    else setState({ kind: 'error', message: 'Não foi possível concluir.' })
  }

  return (
    <>
      <PageBackground />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground mb-2">Focus Inteligente</h1>
          <p className="text-sm text-muted-foreground mb-6">Cancelar recebimento de e-mails</p>

          {state.kind === 'loading' && <p>Validando link…</p>}

          {state.kind === 'valid' && (
            <>
              <p className="mb-6 text-foreground">
                Confirme que você não deseja mais receber e-mails do diagnóstico
                Focus Inteligente neste endereço.
              </p>
              <button
                onClick={confirm}
                className="w-full rounded-lg bg-primary text-primary-foreground font-medium py-3 hover:opacity-90"
              >
                Confirmar cancelamento
              </button>
            </>
          )}

          {state.kind === 'submitting' && <p>Processando…</p>}
          {state.kind === 'done' && (
            <p className="text-foreground">
              Pronto! Você não receberá mais e-mails deste endereço.
            </p>
          )}
          {state.kind === 'already' && (
            <p className="text-foreground">Este endereço já estava cancelado.</p>
          )}
          {state.kind === 'invalid' && (
            <p className="text-destructive">Link inválido ou expirado.</p>
          )}
          {state.kind === 'error' && <p className="text-destructive">{state.message}</p>}
        </div>
      </div>
    </>
  )
}
