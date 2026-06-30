import { useEffect } from 'react';
import { X, Star } from 'lucide-react';

// TODO: substituir pelos depoimentos reais
const DEPOIMENTOS = [
  {
    nome: '[EDITAR — Nome do cliente]',
    empresa: '[EDITAR — Empresa / cargo]',
    iniciais: 'AB',
    cor: '#3b82f6',
    estrelas: 5,
    texto:
      '[EDITAR — depoimento real. Conte como o diagnóstico ajudou a identificar o gargalo certo e que ferramenta foi implementada.]',
  },
  {
    nome: '[EDITAR — Nome do cliente]',
    empresa: '[EDITAR — Empresa / cargo]',
    iniciais: 'CD',
    cor: '#10b981',
    estrelas: 5,
    texto:
      '[EDITAR — depoimento real. Resultado concreto: tempo economizado, vendas geradas, custo reduzido, etc.]',
  },
  {
    nome: '[EDITAR — Nome do cliente]',
    empresa: '[EDITAR — Empresa / cargo]',
    iniciais: 'EF',
    cor: '#f59e0b',
    estrelas: 5,
    texto:
      '[EDITAR — depoimento real. Como foi a experiência antes de descobrir o agente certo e a transformação depois.]',
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CaseRealDialog({ open, onClose }: Props) {
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

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        animation: 'fade-in-up 0.25s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--surface)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--surface-border)',
          borderRadius: 20,
          maxWidth: 640,
          width: '100%',
          maxHeight: '85vh',
          overflow: 'auto',
          padding: 28,
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: 999,
            border: 'none',
            background: 'var(--surface-soft)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={16} />
        </button>

        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#60a5fa', marginBottom: 6 }}>
            Cases reais
          </p>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            O que dizem quem já fez o diagnóstico
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DEPOIMENTOS.map((d, i) => (
            <div
              key={i}
              style={{
                background: 'var(--surface-soft)',
                border: '1px solid var(--surface-border)',
                borderRadius: 14,
                padding: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 999,
                    background: d.cor,
                    color: '#fff',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  {d.iniciais}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{d.nome}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{d.empresa}</p>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: d.estrelas }).map((_, j) => (
                    <Star key={j} size={12} fill="#f59e0b" stroke="#f59e0b" />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                "{d.texto}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
