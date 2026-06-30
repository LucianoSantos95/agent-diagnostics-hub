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
            className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200
              ${selecionado
                ? 'border-[#1B3A5C] bg-[#1B3A5C] text-white shadow-md'
                : 'border-gray-200 bg-white text-gray-700 hover:border-[#1B3A5C]/40 hover:bg-blue-50/50'
              }`}
          >
            <span className={`inline-flex items-center gap-3`}>
              <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all
                ${selecionado ? 'border-white bg-white' : 'border-gray-400'}`}
              >
                {selecionado && (
                  <span className="block w-2 h-2 rounded-full bg-[#1B3A5C] m-auto mt-[1px]" />
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
