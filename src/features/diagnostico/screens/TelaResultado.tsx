import { type ResultadoDiagnostico } from '../engine/recomendacao';
import AccordionResultado from '../resultado/AccordionResultado';
import BlocoPersonalizacao from '../resultado/BlocoPersonalizacao';
import CapturaEmail from '../resultado/CapturaEmail';
import CTAComercial from '../resultado/CTAComercial';

const ICONE: Record<string, string> = {
  atendimento: '💬',
  vendas: '📈',
  operacao: '⚙️',
  financeiro: '💰',
};

interface Props {
  resultado: ResultadoDiagnostico;
  respostas: Record<number, string>;
  onSalvarEmail: (email: string) => Promise<void>;
  onRegistrarCTA: () => void;
  onReiniciar: () => void;
}

export default function TelaResultado({ resultado, respostas, onSalvarEmail, onRegistrarCTA, onReiniciar }: Props) {
  const tarefaP4 = respostas[4] ?? '';

  const acordionItens = [
    { titulo: 'O que você precisa', conteudo: resultado.oQuePrecisa },
    { titulo: 'Onde encontrar', conteudo: resultado.ondeEncontrar },
    { titulo: 'Como começar essa semana', conteudo: resultado.comoComecar },
    { titulo: 'Erros comuns nessa categoria', conteudo: resultado.errosComuns },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto flex flex-col gap-6">

        {/* Header do resultado */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{ICONE[resultado.categoria]}</span>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Sua recomendação</p>
              <h2 className="text-xl font-bold text-[#1B3A5C]">{resultado.titulo}</h2>
            </div>
          </div>
          <p className="text-sm text-gray-500 italic mb-3">{resultado.subtitulo}</p>
          <p className="text-sm text-gray-700 leading-relaxed">{resultado.porque}</p>
        </div>

        {/* Aviso extra se tentou ferramenta antes e não deu certo */}
        {resultado.avisoToolsGenericas && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4">
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
              Atenção — você já tentou antes
            </p>
            <p className="text-sm text-amber-800 leading-relaxed">
              O erro mais comum de quem testou e não viu resultado é usar uma ferramenta genérica
              para um problema específico. Um agente bem configurado para o <em>seu</em> gargalo
              é completamente diferente de um chatbot genérico ou de uma automação de prateleira.
            </p>
          </div>
        )}

        {/* Accordion */}
        <AccordionResultado itens={acordionItens} />

        {/* Bloco personalizado com P4 */}
        <BlocoPersonalizacao tarefaP4={tarefaP4} categoria={resultado.categoria} />

        {/* Captura de email */}
        <CapturaEmail onSalvar={onSalvarEmail} />

        {/* Reiniciar */}
        <div className="text-center">
          <button
            onClick={onReiniciar}
            className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
          >
            Refazer com outras respostas
          </button>
        </div>

        {/* CTA Comercial — visualmente separado */}
        <div className="pt-2">
          <CTAComercial onRegistrarCTA={onRegistrarCTA} />
        </div>

      </div>
    </div>
  );
}
