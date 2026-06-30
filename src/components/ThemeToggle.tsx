import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme, type Theme } from '@/contexts/ThemeContext';

const OPCOES: { id: Theme; label: string; Icon: typeof Sun }[] = [
  { id: 'claro', label: 'Claro', Icon: Sun },
  { id: 'escuro', label: 'Escuro', Icon: Moon },
  { id: 'padrao', label: 'Padrão', Icon: Sparkles },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Alterar tema"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 30,
          height: 30,
          borderRadius: 999,
          background: 'var(--surface-soft)',
          border: '1px solid var(--surface-border)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <Lightbulb size={15} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: 160,
            background: 'var(--surface)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--surface-border)',
            borderRadius: 12,
            padding: 6,
            boxShadow: '0 12px 32px rgba(0,0,0,0.25)',
            zIndex: 100,
          }}
        >
          {OPCOES.map(({ id, label, Icon }) => {
            const ativo = theme === id;
            return (
              <button
                key={id}
                onClick={() => { setTheme(id); setOpen(false); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: 'none',
                  background: ativo ? 'rgba(59,130,246,0.18)' : 'transparent',
                  color: ativo ? '#60a5fa' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontWeight: ativo ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
