import { COMBINACOES } from '../engine/ferramentasGerais';
import type { Categoria } from '../engine/recomendacao';

interface Props {
  categoria: Categoria;
  corTexto: string;
  tarefaP4?: string;
}

export default function CombinacoesLogicas({ categoria, corTexto, tarefaP4 }: Props) {
  const combos = COMBINACOES[categoria];
  const p4 = tarefaP4?.trim();
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: corTexto }}>
          Combinações lógicas · como as peças se encaixam
        </p>
        <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Uma ferramenta sozinha resolve pouco. Aqui estão 3 fluxos prontos mostrando como agente + automação + IA geral se conectam pra virar resultado.
      </p>
      {p4 && (
        <p
          className="text-xs mb-3 px-3 py-2 rounded-lg border"
          style={{ color: 'var(--text-accent)', background: 'var(--accent-soft)', borderColor: 'var(--accent-chip-border)' }}
        >
          <span className="font-mono font-bold uppercase tracking-widest text-[10px] mr-2">No seu caso</span>
          "{p4.length > 100 ? `${p4.slice(0, 100).trimEnd()}…` : p4}" — pelo menos um destes fluxos resolve exatamente esse padrão.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {combos.map((c, idx) => (
          <div
            key={c.titulo}
            className="rounded-2xl p-5 border"
            style={{
              background: 'var(--accent-soft)',
              borderColor: 'var(--accent-chip-border)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  background: 'var(--accent-chip-bg)',
                  color: 'var(--text-accent)',
                  border: '1px solid var(--accent-chip-border)',
                }}
              >
                FLUXO {String(idx + 1).padStart(2, '0')}
              </span>
              <p className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {c.titulo}
              </p>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
              {c.descricao}
            </p>

            {/* Fluxo com setas */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              {c.fluxo.map((passo, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border-soft)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {passo}
                  </span>
                  {i < c.fluxo.length - 1 && (
                    <span style={{ color: 'var(--text-accent)', fontWeight: 700 }}>→</span>
                  )}
                </span>
              ))}
            </div>

            <p
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: 'var(--text-accent)' }}
            >
              Pra quem: <span className="normal-case tracking-normal font-sans" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{c.paraQuem}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
