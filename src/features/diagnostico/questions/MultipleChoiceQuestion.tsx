interface Props {
  opcoes: string[];
  valorAtual: string | undefined;
  onChange: (valor: string) => void;
}

export default function MultipleChoiceQuestion({ opcoes, valorAtual, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {opcoes.map(opcao => {
        const selecionado = valorAtual === opcao;
        return (
          <button
            key={opcao}
            onClick={() => onChange(opcao)}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
            style={selecionado ? {
              background: 'linear-gradient(135deg, rgba(79,70,229,0.32), rgba(29,78,216,0.32))',
              borderColor: '#6366f1',
              color: '#ffffff',
              boxShadow: '0 0 0 1px rgba(99,102,241,0.55), 0 6px 18px rgba(79,70,229,0.28)',
            } : {
              background: 'rgba(255,255,255,0.06)',
              borderColor: 'rgba(165,180,252,0.28)',
              color: '#e2e8f0',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
            }}
            onMouseEnter={(e) => {
              if (selecionado) return;
              e.currentTarget.style.background = 'rgba(79,70,229,0.12)';
              e.currentTarget.style.borderColor = 'rgba(99,102,241,0.55)';
            }}
            onMouseLeave={(e) => {
              if (selecionado) return;
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(165,180,252,0.28)';
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                style={selecionado
                  ? { borderColor: '#a5b4fc', background: '#4f46e5' }
                  : { borderColor: 'rgba(165,180,252,0.6)' }
                }
              >
                {selecionado && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              {opcao}
            </span>
          </button>
        );
      })}
    </div>
  );
}
