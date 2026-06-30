import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Item {
  titulo: string;
  conteudo: string;
}

interface Props {
  itens: Item[];
}

export default function AccordionResultado({ itens }: Props) {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {itens.map((item, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
        >
          <button
            onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-sm font-semibold text-[#1B3A5C]">{item.titulo}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200
                ${aberto === i ? 'rotate-180' : ''}`}
            />
          </button>
          {aberto === i && (
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 whitespace-pre-line">
              {item.conteudo}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
