import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

const schema = z.object({
  nome: z.string().trim().min(1, 'Informe seu nome').max(100),
  email: z.string().trim().email('E-mail inválido').max(255),
  mensagem: z.string().trim().min(1, 'Escreva sua mensagem').max(2000),
});

interface Props { open: boolean; onClose: () => void; }

export default function FeedbackDialog({ open, onClose }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      // reset ao fechar
      setTimeout(() => {
        setNome(''); setEmail(''); setMensagem('');
        setErro(null); setEnviado(false); setLoading(false);
      }, 200);
    }
  }, [open]);

  if (!open) return null;

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

  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Deixe seu feedback"
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(3,4,20,0.82)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, overflowY: 'auto',
        animation: 'fade-in-up 0.25s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--card, #12142e)', backgroundColor: 'var(--card, #12142e)',
          border: '1px solid var(--surface-border)', borderRadius: 18,
          maxWidth: 460, width: '100%', padding: '28px 24px 24px', position: 'relative',
          maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto',
          boxShadow: '0 32px 80px -20px rgba(0,0,0,0.75)',
          margin: 'auto',
        }}
      >

        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: 'absolute', top: 12, right: 12, width: 30, height: 30,
            borderRadius: 999, border: 'none', background: 'var(--surface-soft)',
            color: 'var(--text-secondary)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <X size={14} />
        </button>

        {enviado ? (
          <div style={{ textAlign: 'center', padding: '20px 8px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 999, margin: '0 auto 14px',
              background: 'rgba(52,211,153,0.18)', display: 'inline-flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Check size={28} color="#34d399" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
              Feedback recebido!
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
              Obrigado por contribuir, {nome.split(' ')[0]}. Vamos ler com carinho.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 18, padding: '10px 22px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg,#4f46e5,#4338ca)', color: '#fff',
                fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#a5b4fc', marginBottom: 4 }}>
              Sua opinião conta
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px' }}>
              Deixe seu feedback
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Nome *</label>
                <input style={inputStyle} value={nome} onChange={e => setNome(e.target.value)} maxLength={100} required />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>E-mail *</label>
                <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} maxLength={255} required />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>Descreva aqui *</label>
                <textarea
                  style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }}
                  value={mensagem}
                  onChange={e => setMensagem(e.target.value)}
                  maxLength={2000}
                  required
                />
              </div>

              {erro && (
                <p style={{ fontSize: 12, color: '#f87171', margin: 0 }}>{erro}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  marginTop: 4, padding: '12px 18px', borderRadius: 12, border: 'none',
                  background: loading ? 'rgba(79,70,229,0.5)' : 'linear-gradient(135deg,#4f46e5,#4338ca)',
                  color: '#fff', fontWeight: 700, fontSize: 14, cursor: loading ? 'wait' : 'pointer',
                  boxShadow: '0 4px 18px rgba(79,70,229,0.35)',
                }}
              >
                {loading ? 'Enviando...' : 'Enviar feedback'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
