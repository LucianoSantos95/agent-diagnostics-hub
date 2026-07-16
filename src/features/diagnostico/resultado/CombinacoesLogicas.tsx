import { COMBINACOES } from '../engine/ferramentasGerais';
import type { Categoria } from '../engine/recomendacao';

interface Props {
  categoria: Categoria;
  corTexto: string;
}

export default function CombinacoesLogicas({ categoria, corTexto }: Props) {
  const combos = COMBINACOES[categoria];
  return (
    <div className="animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: corTexto }}>
          Combinações lógicas · como as peças se encaixam
        </p>
        <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </div>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Uma ferramenta sozinha resolve pouco. Aqui estão 3 fluxos prontos mostrando como agente + automação + IA geral se conectam pra virar resultado.
      </p>
      <div className="flex flex-col gap-3">
        {combos.map((c, idx) => (
          <div
            key={c.titulo}
            className="rounded-2xl p-5 border"
            style={{
              background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(129,140,248,0.03))',
              borderColor: 'rgba(79,70,229,0.22)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                style={{
                  background: 'rgba(79,70,229,0.2)',
                  color: '#a5b4fc',
                  border: '1px solid rgba(79,70,229,0.35)',
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
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {passo}
                  </span>
                  {i < c.fluxo.length - 1 && (
                    <span style={{ color: '#818cf8', fontWeight: 700 }}>→</span>
                  )}
                </span>
              ))}
            </div>

            <p
              className="text-[11px] font-mono uppercase tracking-widest"
              style={{ color: '#818cf8' }}
            >
              Pra quem: <span className="normal-case tracking-normal font-sans" style={{ color: 'var(--text-muted)', fontSize: 12 }}>{c.paraQuem}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
