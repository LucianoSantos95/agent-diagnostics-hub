import { type Categoria } from "../engine/recomendacao";

const CONEXAO: Record<Categoria, string> = {
  atendimento: "Automatizar isso com um agente de atendimento libera horas do seu dia sem precisar contratar mais ninguem.",
  vendas: "Esse e exatamente o tipo de tarefa que um agente de follow-up resolve — sem depender da sua memoria.",
  operacao: "Esse padrao e o caso de uso ideal para automacao operacional: repetitivo, previsivel e consumindo tempo valioso.",
  financeiro: "Esse padrao aparece muito em negocios que cresceram sem estrutura financeira — um agente resolve o operacional.",
};

interface Props { tarefaP4: string; categoria: Categoria; }

export default function BlocoPersonalizacao({ tarefaP4, categoria }: Props) {
  if (!tarefaP4.trim()) return null;
  return (
    <div className="rounded-xl px-5 py-4 border"
      style={{ background: "var(--accent-soft)", borderColor: "var(--accent-border)" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--text-accent)" }}>
        Personalizado para você
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        Você mencionou: <span className="font-semibold" style={{ color: "var(--text-primary)" }}>"{tarefaP4}"</span>. {CONEXAO[categoria]}
      </p>
    </div>
  );
}
