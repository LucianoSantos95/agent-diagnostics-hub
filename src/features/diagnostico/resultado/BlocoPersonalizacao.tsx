import { type Categoria } from '../engine/recomendacao';

const CONEXAO: Record<Categoria, string> = {
  atendimento: 'Automatizar isso com um agente de atendimento vai liberar horas do seu dia sem precisar contratar mais ninguém.',
  vendas: 'Esse é exatamente o tipo de tarefa que um agente de follow-up resolve — sem depender da sua memória ou disponibilidade.',
  operacao: 'Esse é o caso de uso ideal para automação operacional: repetitivo, previsível e consumindo tempo que poderia ir para o que importa.',
  financeiro: 'Esse padrão aparece muito em negócios que cresceram sem estrutura financeira — e um agente resolve o operacional sem precisar de um time inteiro.',
};

interface Props {
  tarefaP4: string;
  categoria: Categoria;
}

export default function BlocoPersonalizacao({ tarefaP4, categoria }: Props) {
  if (!tarefaP4.trim()) return null;

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4">
      <p className="text-xs text-[#1B3A5C] font-semibold uppercase tracking-wide mb-2">
        Personalizado para você
      </p>
      <p className="text-sm text-gray-700 leading-relaxed">
        Você mencionou:{' '}
        <span className="font-medium text-[#1B3A5C]">"{tarefaP4}"</span>.{' '}
        {CONEXAO[categoria]}
      </p>
    </div>
  );
}
