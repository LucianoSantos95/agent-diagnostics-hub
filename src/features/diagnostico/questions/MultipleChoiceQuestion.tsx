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
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 border"
            style={selecionado ? {
              background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(29,78,216,0.3))',
              borderColor: '#3b82f6',
              color: '#fff',
              boxShadow: '0 0 0 1px rgba(59,130,246,0.5), 0 4px 12px rgba(37,99,235,0.2)'
            } : {
              background: 'rgba(255,255,255,0.04)',
              borderColor: 'rgba(255,255,255,0.1)',
              color: '#cbd5e1'
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all"
                style={selecionado
                  ? { borderColor: '#60a5fa', background: '#2563eb' }
                  : { borderColor: 'rgba(255,255,255,0.3)' }
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
