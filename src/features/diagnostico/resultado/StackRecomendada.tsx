import { STACKS } from '../engine/ferramentasGerais';
import type { Categoria } from '../engine/recomendacao';

interface Props {
  categoria: Categoria;
  corTexto: string;
}

export default function StackRecomendada({ categoria, corTexto }: Props) {
  const stack = STACKS[categoria];
  return (
    <div className="animate-fade-up delay-200">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: corTexto }}>
          Stack completa para essa categoria
        </p>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Não é só um agente — é o kit inteiro cobrindo o fluxo. Cada peça resolve uma parte do problema.
      </p>
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
        {stack.map((item, i) => (
          <a
            key={item.nome}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
            style={{
              borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              textDecoration: 'none',
            }}
          >
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded"
              style={{
                background: 'rgba(79,70,229,0.14)',
                color: '#a5b4fc',
                border: '1px solid rgba(79,70,229,0.28)',
                minWidth: 92,
                textAlign: 'center',
              }}
            >
              {item.papel}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {item.nome}
              </p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                {item.descricao}
              </p>
            </div>
            <span className="text-xs" style={{ color: 'rgba(199,210,254,0.5)' }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
