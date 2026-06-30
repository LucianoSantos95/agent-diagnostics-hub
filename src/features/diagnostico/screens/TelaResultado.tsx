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

const COR_CATEGORIA: Record<string, string> = {
  atendimento: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
  vendas: 'linear-gradient(135deg, #10b981, #059669)',
  operacao: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  financeiro: 'linear-gradient(135deg, #f59e0b, #d97706)',
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
  const cor = COR_CATEGORIA[resultado.categoria];

  const acordionItens = [
    { titulo: 'O que você precisa', conteudo: resultado.oQuePrecisa },
    { titulo: 'Onde encontrar', conteudo: resultado.ondeEncontrar },
    { titulo: 'Como começar essa semana', conteudo: resultado.comoComecar },
    { titulo: 'Erros comuns nessa categoria', conteudo: resultado.errosComuns },
  ];

  return (
    <div className="min-h-screen py-10 px-4"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #0f1f35 100%)' }}>
      <div className="max-w-lg mx-auto flex flex-col gap-5">

        {/* Header resultado */}
        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          {/* Topo colorido */}
          <div className="px-6 py-5" style={{ background: cor }}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{ICONE[resultado.categoria]}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-0.5">
                  Sua recomendação
                </p>
                <h2 className="text-2xl font-extrabold text-white">{resultado.titulo}</h2>
              </div>
            </div>
          </div>
          {/* Corpo */}
          <div className="px-6 py-5" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-sm italic mb-3" style={{ color: '#93c5fd' }}>{resultado.subtitulo}</p>
            <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{resultado.porque}</p>
          </div>
        </div>

        {/* Aviso ferramentas genéricas */}
        {resultado.avisoToolsGenericas && (
          <div className="rounded-xl px-5 py-4 border"
            style={{ background: 'rgba(245,158,11,0.1)', borderColor: 'rgba(245,158,11,0.3)' }}>
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#fbbf24' }}>
              ⚠️ Atenção — você já tentou antes
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#fde68a' }}>
              O erro mais comum é usar uma ferramenta genérica para um problema específico.
              Um agente configurado para o <em>seu</em> gargalo é completamente diferente
              de um chatbot de prateleira.
            </p>
          </div>
        )}

        {/* Accordion */}
        <AccordionResultado itens={acordionItens} />

        {/* Personalização P4 */}
        <BlocoPersonalizacao tarefaP4={tarefaP4} categoria={resultado.categoria} />

        {/* Captura email */}
        <CapturaEmail onSalvar={onSalvarEmail} />

        {/* Reiniciar */}
        <div className="text-center">
          <button onClick={onReiniciar}
            className="text-sm underline transition-colors"
            style={{ color: 'rgba(147,197,253,0.5)' }}>
            Refazer com outras respostas
          </button>
        </div>

        {/* CTA Comercial */}
        <CTAComercial onRegistrarCTA={onRegistrarCTA} />

      </div>
    </div>
  );
}
