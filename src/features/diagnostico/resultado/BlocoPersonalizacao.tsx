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
      style={{ background: "rgba(59,130,246,0.1)", borderColor: "rgba(59,130,246,0.25)" }}>
      <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#60a5fa" }}>
        Personalizado para voce
      </p>
      <p className="text-sm leading-relaxed" style={{ color: "#bfdbfe" }}>
        Voce mencionou: <span className="font-semibold text-white">"{tarefaP4}"</span>. {CONEXAO[categoria]}
      </p>
    </div>
  );
}
