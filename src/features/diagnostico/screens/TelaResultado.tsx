import { useState } from 'react';
import { type ResultadoDiagnostico } from '../engine/recomendacao';
import AccordionResultado from '../resultado/AccordionResultado';
import BlocoPersonalizacao from '../resultado/BlocoPersonalizacao';
import CapturaEmail from '../resultado/CapturaEmail';
import CaixaFeedback from '../resultado/CaixaFeedback';
import PerguntaOrcamento from '../resultado/PerguntaOrcamento';
import CTAComercial from '../resultado/CTAComercial';
import StackRecomendada from '../resultado/StackRecomendada';
import FerramentasIAGeral from '../resultado/FerramentasIAGeral';
import CombinacoesLogicas from '../resultado/CombinacoesLogicas';
import Footer from '@/components/Footer';
import PageBackground from '@/components/PageBackground';

const ICONE: Record<string, string> = {
  atendimento: '💬',
  vendas: '📈',
  operacao: '⚙️',
  financeiro: '💰',
};

// Paleta Midnight Indigo — cada categoria carrega o mesmo DNA indigo
// com um acento cromático sutil que preserva diferenciação sem quebrar o sistema.
const COR_CATEGORIA: Record<string, string> = {
  atendimento: 'linear-gradient(135deg, #1e1e5a 0%, #3b3fa8 55%, #4f46e5 100%)',
  vendas: 'linear-gradient(135deg, #14324a 0%, #1e5566 55%, #2dd4a8 100%)',
  operacao: 'linear-gradient(135deg, #1e1e5a 0%, #4338ca 55%, #7c3aed 100%)',
  financeiro: 'linear-gradient(135deg, #2d1f4a 0%, #6b3fa8 55%, #c9a84c 100%)',
};

const COR_TEXTO: Record<string, string> = {
  atendimento: '#a5b4fc',
  vendas: '#5cbdb9',
  operacao: '#c4b5fd',
  financeiro: '#e8b84a',
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
  const [emailCapturado, setEmailCapturado] = useState('');
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
        <div className="rounded-2xl overflow-hidden border animate-fade-up" style={{ borderColor: 'rgba(255,255,255,0.08)', boxShadow: '0 24px 60px -30px rgba(79,70,229,0.4)' }}>
          {/* Topo colorido */}
          <div className="px-6 py-7 relative overflow-hidden" style={{ background: cor }}>
            {/* Grid técnico */}
            <div className="absolute inset-0 opacity-[0.14]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            {/* Artefato geométrico orbital — mesmo DNA da TelaAbertura */}
            <svg
              className="absolute -right-16 -top-16 opacity-30 pointer-events-none"
              width="260" height="260" viewBox="0 0 260 260" fill="none" aria-hidden="true"
            >
              <circle cx="130" cy="130" r="120" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" strokeDasharray="2 6" />
              <circle cx="130" cy="130" r="88" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
              <circle cx="130" cy="130" r="56" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" strokeDasharray="3 4" />
              <circle cx="130" cy="42" r="3" fill="rgba(255,255,255,0.9)" />
              <circle cx="218" cy="130" r="2" fill="rgba(255,255,255,0.7)" />
              <circle cx="130" cy="130" r="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
            </svg>
            {/* Corner mark */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Diagnóstico · 01</span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-white/70 mb-3">
                Seu diagnóstico
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl">{ICONE[resultado.categoria]}</span>
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight">{resultado.titulo}</h1>
                  <p className="text-sm text-white/80 mt-1">{resultado.subtitulo}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Por que você precisa */}
          <div className="px-6 py-5 border-t" style={{ background: 'rgba(15,15,42,0.55)', borderColor: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] mb-2" style={{ color: corTexto }}>
              Por que esse agente?
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{resultado.porque}</p>
          </div>
        </div>

        {/* Meta em 3 meses — usa P6 */}
        {resultado.metaTresMeses && (
          <div
            className="rounded-2xl p-5 border animate-fade-up delay-75 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(52,211,153,0.09), rgba(79,70,229,0.09))',
              borderColor: 'rgba(52,211,153,0.28)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🎯</span>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.24em]" style={{ color: '#34d399' }}>
                Sua meta em 3 meses
              </p>
            </div>
            <p className="text-base leading-relaxed mb-2" style={{ color: 'var(--text-primary)' }}>
              <span className="font-semibold">"{resultado.metaTresMeses}"</span>
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {resultado.pontePessoal}
            </p>
          </div>
        )}

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
                  <span className="text-xs" style={{ color: 'rgba(199,210,254,0.5)' }}>↗</span>
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

        {/* Stack completa por categoria */}
        <StackRecomendada categoria={resultado.categoria} corTexto={corTexto} />

        {/* Combinações lógicas — como as ferramentas se encaixam */}
        <CombinacoesLogicas categoria={resultado.categoria} corTexto={corTexto} />

        {/* IA de uso geral — bloco fixo, útil para qualquer negócio */}
        <FerramentasIAGeral />

        {/* Personalização P4 — gancho de valor antes do gate */}
        <BlocoPersonalizacao tarefaP4={tarefaP4} categoria={resultado.categoria} />

        {/* Gate de e-mail OU conteúdo desbloqueado */}
        {!desbloqueado ? (
          <CapturaEmail
            sessionId={sessionId}
            categoria={resultado.categoria}
            onSalvar={onSalvarEmail}
            onDesbloquear={(email) => {
              setEmailCapturado(email);
              setDesbloqueado(true);
            }}
          />
        ) : (
          <div className="flex flex-col gap-5 animate-fade-up">
            {/* Caixinha de feedback — aparece logo após capturar o e-mail */}
            <CaixaFeedback email={emailCapturado} />

            {/* Guia de implementação */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(199,210,254,0.6)' }}>
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
            style={{ color: 'rgba(199,210,254,0.4)' }}
          >
            Refazer com outras respostas
          </button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
