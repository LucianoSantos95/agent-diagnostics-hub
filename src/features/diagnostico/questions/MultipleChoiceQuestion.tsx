interface Props {
  opcoes: string[];
  valorAtual: string | undefined;
  onChange: (valor: string) => void;
  /** Permite selecionar várias opções (salvo como "a; b; c"). */
  multi?: boolean;
  /** Opção que, ao ser marcada, zera as demais (ex.: "Nada ainda"). */
  exclusiva?: string;
}

const SEP = '; ';

export default function MultipleChoiceQuestion({ opcoes, valorAtual, onChange, multi, exclusiva }: Props) {
  const selecionadas = multi
    ? (valorAtual ?? '').split(/\s*;\s*/).map((s) => s.trim()).filter(Boolean)
    : [];

  function estaSelecionado(opcao: string): boolean {
    return multi ? selecionadas.includes(opcao) : valorAtual === opcao;
  }

  function handleClick(opcao: string) {
    if (!multi) {
      onChange(opcao);
      return;
    }
    const jaTem = selecionadas.includes(opcao);
    if (exclusiva && opcao === exclusiva) {
      onChange(jaTem ? '' : opcao);
      return;
    }
    let proximas = jaTem ? selecionadas.filter((o) => o !== opcao) : [...selecionadas, opcao];
    if (exclusiva) proximas = proximas.filter((o) => o !== exclusiva);
    onChange(proximas.join(SEP));
  }

  return (
    <div className="flex flex-col gap-3">
      {opcoes.map((opcao) => {
        const selecionado = estaSelecionado(opcao);
        return (
          <button
            key={opcao}
            onClick={() => handleClick(opcao)}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
            style={selecionado ? {
              background: 'var(--accent-soft)',
              borderColor: 'var(--accent)',
              color: 'var(--text-primary)',
              boxShadow: '0 0 0 1px var(--accent-border), 0 6px 18px rgba(79,70,229,0.18)',
            } : {
              background: 'var(--card)',
              borderColor: 'var(--accent-chip-border)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              if (selecionado) return;
              e.currentTarget.style.background = 'var(--accent-soft)';
              e.currentTarget.style.borderColor = 'var(--accent-border)';
            }}
            onMouseLeave={(e) => {
              if (selecionado) return;
              e.currentTarget.style.background = 'var(--card)';
              e.currentTarget.style.borderColor = 'var(--accent-chip-border)';
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className={`w-4 h-4 border-2 flex-shrink-0 flex items-center justify-center transition-all ${multi ? 'rounded-[5px]' : 'rounded-full'}`}
                style={selecionado
                  ? { borderColor: 'var(--accent)', background: 'var(--accent)' }
                  : { borderColor: 'var(--accent-border)' }
                }
              >
                {selecionado && (
                  multi
                    ? <span className="text-[10px] leading-none font-bold" style={{ color: 'var(--accent-contrast)' }}>✓</span>
                    : <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-contrast)' }} />
                )}
              </span>
              {opcao}
            </span>
          </button>
        );
      })}
    </div>
  );
}
