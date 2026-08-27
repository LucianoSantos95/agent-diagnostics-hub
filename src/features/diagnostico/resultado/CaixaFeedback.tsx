import { useState } from 'react';
import { z } from 'zod';
import { Check, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  nome: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  mensagem: z.string().trim().min(1, 'Escreva sua mensagem').max(2000),
});

interface Props {
  email: string;
}

export default function CaixaFeedback({ email }: Props) {
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    const parsed = schema.safeParse({
      nome: 'Diagnóstico',
      email,
      mensagem,
    });
    if (!parsed.success) {
      setErro(parsed.error.issues[0]?.message ?? 'Verifique a mensagem');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('feedbacks').insert(parsed.data);
    setLoading(false);
    if (error) {
      setErro('Não foi possível enviar agora. Tente novamente.');
      return;
    }
    setEnviado(true);
  }

  return (
    <div
      className="rounded-2xl px-5 py-5 border animate-fade-up relative overflow-hidden"
      style={{
        background: 'var(--warn-tint)',
        borderColor: 'var(--warn-border)',
        boxShadow: '0 10px 40px -20px rgba(245,158,11,0.35)',
      }}
    >
      {enviado ? (
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
            style={{ background: 'rgba(52,211,153,0.18)' }}
          >
            <Check size={18} color="#34d399" />
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Recebido, obrigado 🙌
            </p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Sua opinião ajuda a melhorar o próximo diagnóstico.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-flex items-center justify-center w-7 h-7 rounded-lg animate-glow-pulse"
              style={{ background: 'var(--warn-tint)', border: '1px solid var(--warn-border)' }}
            >
              <MessageCircle size={14} color="currentColor" style={{ color: 'var(--warn)' }} />
            </span>
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--warn)' }}
            >
              Sua opinião conta
            </p>
          </div>
          <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Como foi essa experiência pra você?
          </p>
          <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>
            30 segundos que ajudam a melhorar o diagnóstico pra quem vier depois.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              maxLength={2000}
              required
              placeholder="O que ficou claro? O que faltou? Alguma sugestão?"
              className="w-full text-sm rounded-xl px-3 py-2 focus:outline-none"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-primary)',
                minHeight: 80,
                resize: 'vertical',
                fontFamily: 'inherit',
              }}
            />

            {erro && <p className="text-xs" style={{ color: 'var(--danger)' }}>{erro}</p>}

            <button
              type="submit"
              disabled={loading}
              className="self-start inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.03] active:scale-95"
              style={{
                background: loading
                  ? 'rgba(245,158,11,0.5)'
                  : 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 6px 24px rgba(245,158,11,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
                cursor: loading ? 'wait' : 'pointer',
                border: 'none',
              }}
            >
              <MessageCircle size={16} />
              {loading ? 'Enviando...' : 'Deixar feedback'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
