import { useState } from 'react';
import { Check } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  nome: z.string().trim().min(1, 'Informe seu nome').max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
  mensagem: z.string().trim().min(1, 'Escreva sua mensagem').max(2000),
});

interface Props {
  /** E-mail já capturado no passo anterior — pré-preenchido. */
  email: string;
}

export default function CaixaFeedback({ email }: Props) {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    const parsed = schema.safeParse({ nome, email, mensagem });
    if (!parsed.success) {
      setErro(parsed.error.issues[0]?.message ?? 'Verifique os campos');
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 10,
    border: '1px solid var(--surface-border)',
    background: 'var(--surface-soft)',
    color: 'var(--text-primary)',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <div
      className="rounded-2xl px-6 py-6 border animate-fade-up"
      style={{ background: 'var(--card-deep)', borderColor: 'rgba(245,158,11,0.45)' }}
    >
      {enviado ? (
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
            style={{ background: 'rgba(52,211,153,0.18)' }}
          >
            <Check size={18} color="#34d399" />
          </span>
          <div>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              Feedback recebido — obrigado!
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Vamos ler com atenção e usar pra melhorar o diagnóstico.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p
            className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] mb-1"
            style={{ color: '#f59e0b' }}
          >
            Sua opinião conta
          </p>
          <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            O diagnóstico fez sentido pra você?
          </p>
          <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Leva 30 segundos e ajuda a deixar a recomendação mais precisa pra quem vier depois.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              style={inputStyle}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              maxLength={100}
              required
            />
            <textarea
              style={{ ...inputStyle, minHeight: 84, resize: 'vertical' }}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="O que fez sentido? O que faltou?"
              maxLength={2000}
              required
            />
            {erro && <p className="text-xs" style={{ color: '#f87171' }}>{erro}</p>}
            <button
              type="submit"
              disabled={loading}
              className="text-sm font-bold px-5 py-3 rounded-xl text-white self-start"
              style={{
                background: loading
                  ? 'rgba(245,158,11,0.5)'
                  : 'linear-gradient(135deg,#f59e0b,#d97706)',
                boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
                cursor: loading ? 'wait' : 'pointer',
              }}
            >
              {loading ? 'Enviando…' : 'Enviar feedback'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
