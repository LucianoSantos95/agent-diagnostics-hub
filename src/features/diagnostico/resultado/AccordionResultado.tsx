import { useState } from "react";

interface Item { titulo: string; conteudo: string; }
interface Props { itens: Item[]; }

export default function AccordionResultado({ itens }: Props) {
  const [aberto, setAberto] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {itens.map((item, i) => (
        <div key={i} className="rounded-xl overflow-hidden border transition-all duration-200"
          style={{
            background: aberto === i ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.04)",
            borderColor: aberto === i ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.08)"
          }}>
          <button onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left">
            <span className="text-sm font-semibold text-white">{item.titulo}</span>
            <span className="text-lg flex-shrink-0 ml-2 transition-transform duration-200"
              style={{ transform: aberto === i ? "rotate(180deg)" : "rotate(0deg)", color: "#60a5fa" }}>
              ↓
            </span>
          </button>
          {aberto === i && (
            <div className="px-5 pb-5 pt-1 text-sm leading-relaxed whitespace-pre-line border-t"
              style={{ color: "#cbd5e1", borderColor: "rgba(255,255,255,0.07)" }}>
              {item.conteudo}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
