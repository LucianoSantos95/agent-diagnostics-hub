import { useState } from 'react';
import { type ResultadoDiagnostico } from '../engine/recomendacao';
import AccordionResultado from '../resultado/AccordionResultado';
import BlocoPersonalizacao from '../resultado/BlocoPersonalizacao';
import CapturaEmail from '../resultado/CapturaEmail';
import PerguntaOrcamento from '../resultado/PerguntaOrcamento';
import CTAComercial from '../resultado/CTAComercial';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

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

const COR_TEXTO: Record<string, string> = {
  atendimento: '#38bdf8',
  vendas: '#34d399',
  operacao: '#a78bfa',
  financeiro: '#fbbf24',
};

interface Props {
  resultado: ResultadoDiagnostico;
  respostas: Record<number, string>;
  sessionId: string;
  onSalvarEmail: (email: string) => Promise<void>;
  onSalvarOrcamento: (orcamento: string) => Promise<void>;
  onRegistrarCTA: () => void;
  onReiniciar: () => void;
}

export default function TelaResultado({ resultado, respostas, sessionId, onSalvarEmail, onSalvarOrcamento, onRegistrarCTA, onReiniciar }: Props) {
  const [desbloqueado, setDesbloqueado] = useState(false);
  const tarefaP4 = respostas[4] ?? '';
  const cor = COR_CATEGORIA[resultado.categoria];
  const corTexto = COR_TEXTO[resultado.categoria];

  const acordionItens = [
    { titulo: '📋 O que você precisa', conteudo: resultado.oQuePrecisa },
    { titulo: '🧭 Onde encontrar', conteudo: resultado.ondeEncontrar },
    { titulo: '🚀 Como começar essa semana', conteudo: resultado.comoComecar },
    { titulo: '⚠️ Erros comuns nessa categoria', conteudo: resultado.errosComuns },
  ];

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ paddingTop: '60px' }}
    >
      <PageBackground variant="result" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* Header resultado — hero section */}
        <div className="rounded-2xl overflow-hidden border animate-fade-up" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {/* Topo colorido */}
          <div className="px-6 py-6 relative overflow-hidden" style={{ background: cor }}>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }} />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-1">
                Seu diagnóstico
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{ICONE[resultado.categoria]}</span>
                <div>
                  <h1 className="text-2xl font-extrabold text-white">{resultado.titulo}</h1>
                  <p className="text-sm text-white/80 mt-0.5">{resultado.subtitulo}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Por que você precisa */}
          <div className="px-6 py-5" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: corTexto }}>
              Por que esse agente?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{resultado.porque}</p>
          </div>
        </div>

        {/* Aviso ferramentas genéricas */}
        {resultado.avisoToolsGenericas && (
          <div
            className="rounded-xl px-5 py-4 border animate-fade-up delay-100"
            style={{ background: 'rgba(245,158,11,0.08)', borderColor: 'rgba(245,158,11,0.28)' }}
          >
            <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: '#fbbf24' }}>
              Você já tentou antes
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#fde68a' }}>
              O erro mais comum é usar uma ferramenta genérica para um problema específico.
              Um agente configurado para o <em>seu</em> gargalo é completamente diferente
              de um chatbot de prateleira.
            </p>
          </div>
        )}

        {/* Ferramentas recomendadas */}
        <div className="animate-fade-up delay-200">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: corTexto }}>
              Ferramentas para começar agora
            </p>
            <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
          </div>
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
            {resultado.ferramentas.map((f) => (
              <a
                key={f.nome}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl p-4 border group transition-all duration-200 hover:scale-[1.02] hover:border-blue-500/40"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.09)',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{f.nome}</p>
                  <span className="text-xs" style={{ color: 'rgba(147,197,253,0.5)' }}>↗</span>
                </div>
                <p className="text-xs leading-snug" style={{ color: '#94a3b8' }}>{f.descricao}</p>
                <span
                  className="inline-block text-xs font-semibold mt-1 px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}
                >
                  {f.plano}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Personalização P4 — gancho de valor antes do gate */}
        <BlocoPersonalizacao tarefaP4={tarefaP4} categoria={resultado.categoria} />

        {/* Gate de e-mail OU conteúdo desbloqueado */}
        {!desbloqueado ? (
          <CapturaEmail
            sessionId={sessionId}
            categoria={resultado.categoria}
            onSalvar={onSalvarEmail}
            onDesbloquear={() => setDesbloqueado(true)}
          />
        ) : (
          <div className="flex flex-col gap-5 animate-fade-up">
            {/* Guia de implementação */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(147,197,253,0.6)' }}>
                  Seu guia de implementação
                </p>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
              </div>
              <AccordionResultado itens={acordionItens} />
            </div>

            {/* Orçamento — capturado depois de entregar valor */}
            <PerguntaOrcamento onSalvar={onSalvarOrcamento} />

            {/* CTA Comercial — o único CTA forte, no fim do fluxo */}
            <CTAComercial onRegistrarCTA={onRegistrarCTA} />
          </div>
        )}

        {/* Reiniciar */}
        <div className="text-center pb-2">
          <button
            onClick={onReiniciar}
            className="text-sm underline transition-colors hover:text-blue-300"
            style={{ color: 'rgba(147,197,253,0.4)' }}
          >
            Refazer com outras respostas
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
