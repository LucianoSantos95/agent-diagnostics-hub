import { useState } from "react";

const OPCOES = [
  'Ainda não, só quero entender o que existe',
  'Até R$200/mês',
  'Entre R$200 e R$800/mês',
  'Acima de R$800/mês',
];

interface Props {
  onSalvar: (orcamento: string) => Promise<void>;
}

export default function PerguntaOrcamento({ onSalvar }: Props) {
  const [selecionado, setSelecionado] = useState<string | null>(null);

  function handleSelecionar(opcao: string) {
    if (selecionado) return;
    setSelecionado(opcao);
    onSalvar(opcao).catch(() => null);
  }

  return (
    <div
      className="rounded-2xl px-6 py-5 border"
      style={{ background: "var(--surface)", borderColor: "var(--surface-border)" }}
    >
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Uma última pergunta rápida
      </p>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Você tem orçamento mensal para investir em automação de IA? Isso ajuda a recomendar o próximo passo certo.
      </p>

      {selecionado ? (
        <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--success)" }}>
          <span>✓</span> Anotado — obrigado!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {OPCOES.map(opcao => (
            <button
              key={opcao}
              onClick={() => handleSelecionar(opcao)}
              className="text-left text-sm rounded-xl px-4 py-3 transition-all duration-200 hover:scale-[1.01]"
              style={{
                background: "var(--surface-soft)",
                border: "1px solid var(--surface-border)",
                color: "var(--text-secondary)",
              }}
            >
              {opcao}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
