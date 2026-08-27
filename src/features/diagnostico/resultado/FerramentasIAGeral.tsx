import { IA_GERAL } from '../engine/ferramentasGerais';

interface Props { tarefaP4?: string }

export default function FerramentasIAGeral({ tarefaP4 }: Props = {}) {
  const p4 = tarefaP4?.trim();

  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-accent)' }}>
          IA de uso geral · qualquer negócio adota
        </p>
        <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Independente do agente que você vai montar, essas ferramentas resolvem 80% do trabalho manual do dia a dia. Cada uma é forte em uma coisa diferente.
      </p>
      {p4 && (
        <p
          className="text-xs mb-3 px-3 py-2 rounded-lg border"
          style={{ color: 'var(--text-accent)', background: 'var(--accent-soft)', borderColor: 'var(--accent-chip-border)' }}
        >
          <span className="font-mono font-bold uppercase tracking-widest text-[10px] mr-2">Dica</span>
          Comece testando uma dessas com "{p4.length > 80 ? `${p4.slice(0, 80).trimEnd()}…` : p4}" — é a forma mais rápida de sentir o ganho no seu contexto.
        </p>
      )}

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {IA_GERAL.map((t) => (
          <a
            key={t.nome}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl p-4 border transition-all hover:scale-[1.01] hover:border-indigo-400/40"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border-soft)',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{t.nome}</p>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>↗</span>
            </div>
            <p
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-accent)' }}
            >
              {t.forte}
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Como usar no seu negócio: </span>
              {t.comoUsar}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
