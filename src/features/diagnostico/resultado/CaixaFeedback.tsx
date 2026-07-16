import { useState } from 'react';
import { z } from 'zod';
import { Check } from 'lucide-react';
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
      className="rounded-2xl px-5 py-5 border animate-fade-up"
      style={{
        background: 'rgba(129,140,248,0.06)',
        borderColor: 'rgba(129,140,248,0.22)',
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
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: '#a5b4fc' }}
          >
            Sua opinião conta
          </p>
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

            {erro && <p className="text-xs" style={{ color: '#f87171' }}>{erro}</p>}

            <button
              type="submit"
              disabled={loading}
              className="self-start text-sm font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-[1.02] active:scale-95"
              style={{
                background: loading
                  ? 'rgba(79,70,229,0.5)'
                  : 'linear-gradient(135deg, #4f46e5, #4338ca)',
                boxShadow: '0 4px 18px rgba(79,70,229,0.3)',
                cursor: loading ? 'wait' : 'pointer',
                border: 'none',
              }}
            >
              {loading ? 'Enviando...' : 'Enviar feedback'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
