import { useMemo } from 'react';
import { type ResultadoDiagnostico } from '../engine/recomendacao';
import { montarPlaybook } from '../playbooks';
import type { Playbook } from '../playbooks';
import BaixarPlaybook from '../resultado/BaixarPlaybook';
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
  atendimento: 'linear-gradient(135deg, #1e1e5a 0%, #3b3fa8 55%, #4f46e5 100%)',
  vendas: 'linear-gradient(135deg, #14324a 0%, #1e5566 55%, #2dd4a8 100%)',
  operacao: 'linear-gradient(135deg, #1e1e5a 0%, #4338ca 55%, #7c3aed 100%)',
  financeiro: 'linear-gradient(135deg, #2d1f4a 0%, #6b3fa8 55%, #c9a84c 100%)',
};

const DIF_TXT = ['', 'fácil', 'média', 'técnica'];

interface Props {
  resultado: ResultadoDiagnostico;
  respostas: Record<number, string>;
  sessionId: string;
  onSalvarEmail: (email: string) => void;
  onSalvarOrcamento: (orcamento: string) => Promise<void>;
  onRegistrarCTA: () => void;
  onRegistrarPlaybook?: () => void;
  onReiniciar: () => void;
}

function LabelSecao({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-accent)' }}>
        {children}
      </p>
      <div className="flex-1 h-px" style={{ background: 'var(--border-hairline)' }} />
    </div>
  );
}

function CardFerramenta({ nome, url, oQueResolve, meta }: { nome: string; url: string; oQueResolve: string; meta?: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl p-4 border block transition-all hover:scale-[1.01]"
      style={{ background: 'var(--card)', borderColor: 'var(--border-soft)', textDecoration: 'none' }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{nome}</p>
        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-accent)' }}>Ir para {nome} ↗</span>
      </div>
      <p className="text-xs leading-snug mt-1" style={{ color: 'var(--text-secondary)' }}>{oQueResolve}</p>
      {meta && <p className="text-[11px] mt-2 font-mono uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{meta}</p>}
    </a>
  );
}

function Recomendacao({ pb }: { pb: Playbook }) {
  const p = pb.pontoDePartida;
  const metaP = `Dificuldade ${DIF_TXT[p.dificuldade]} · ${p.tempoSetup} · ${p.precoBRL.split('.')[0]}`;
  const alt = pb.alternativas[0];

  if (pb.forma === 'agente') {
    return (
      <div className="animate-fade-up">
        <LabelSecao>O caminho pro seu caso</LabelSecao>
        <ul className="flex flex-col gap-2 mb-4">
          {pb.resumoBullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-accent)' }}>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p
          className="text-sm leading-relaxed px-4 py-3 rounded-xl border"
          style={{ color: 'var(--text-primary)', background: 'var(--card)', borderColor: 'var(--border-soft)' }}
        >
          Ferramentas resolvem cerca de <strong>70%</strong>. Os <strong>30% que quebram</strong> — integração,
          configuração pro seu processo e manutenção — é onde a Focus entra.
        </p>
      </div>
    );
  }

  if (pb.forma === 'validar') {
    return (
      <div className="animate-fade-up">
        <LabelSecao>Antes de escolher ferramenta</LabelSecao>
        <ul className="flex flex-col gap-2 mb-4">
          {pb.resumoBullets.map((b) => (
            <li key={b} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--text-accent)' }}>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Pra começar já, sem se comprometer com uma stack: tenha o ChatGPT, Claude ou Gemini aberto no dia
          a dia — resolve boa parte do trabalho manual de texto em qualquer cenário.
        </p>
      </div>
    );
  }

  if (pb.forma === 'ferramenta-mais-complemento') {
    const integ = pb.integracoes[0];
    return (
      <div className="animate-fade-up">
        <LabelSecao>Suas duas peças</LabelSecao>
        <div className="flex flex-col gap-2">
          <CardFerramenta nome={p.nome} url={p.url} oQueResolve={`Peça 1 — ${p.oQueResolve}`} meta={metaP} />
          <div className="text-center text-lg" style={{ color: 'var(--text-accent)' }}>+</div>
          <div className="rounded-xl p-4 border" style={{ background: 'var(--card)', borderColor: 'var(--border-soft)' }}>
            <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Peça 2 — ligar {pb.complementoLabel}</p>
            <p className="text-xs leading-snug mt-1" style={{ color: 'var(--text-secondary)' }}>
              {integ ? integ.resultado : 'Conectar o que entra numa ponta pra aparecer na outra sozinho.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // uma-ferramenta
  return (
    <div className="animate-fade-up">
      <LabelSecao>Comece por aqui</LabelSecao>
      <CardFerramenta nome={p.nome} url={p.url} oQueResolve={p.oQueResolve} meta={metaP} />
      {alt && (
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
          Alternativa: <span style={{ color: 'var(--text-secondary)' }}>{alt.nome}</span> — {alt.oQueResolve}
        </p>
      )}
    </div>
  );
}

export default function TelaResultado({
  resultado, respostas, sessionId,
  onSalvarEmail, onSalvarOrcamento, onRegistrarCTA, onRegistrarPlaybook, onReiniciar,
}: Props) {
  const tarefa = respostas[5] ?? '';
  const playbook = useMemo(() => montarPlaybook(resultado, tarefa), [resultado, tarefa]);
  const cor = COR_CATEGORIA[resultado.categoria];
  const confAlta = resultado.confianca === 'alta';

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ paddingTop: '60px' }}>
      <PageBackground variant="result" />
      <div className="relative z-10 max-w-xl mx-auto px-4 py-8 flex flex-col gap-5">

        {/* HERO */}
        <div
          className="rounded-2xl overflow-hidden border animate-fade-up"
          style={{ borderColor: 'var(--border-soft)', boxShadow: '0 24px 60px -30px rgba(79,70,229,0.4)' }}
        >
          <div className="px-6 py-6 relative overflow-hidden" style={{ background: cor }}>
            <div className="absolute inset-0 opacity-[0.12]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />
            <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-85">
              <span
                className="w-1.5 h-1.5 rounded-full"
                aria-hidden
                style={{ background: confAlta ? '#34d399' : resultado.confianca === 'media' ? '#fbbf24' : '#f87171' }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/85">
                Confiança {confAlta ? 'alta' : resultado.confianca === 'media' ? 'média' : 'a validar'}
              </span>
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-white/70 mb-3">
                Seu diagnóstico
              </p>
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none mt-0.5">{ICONE[resultado.categoria]}</span>
                <div>
                  <h1 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight">
                    {playbook.headline}
                  </h1>
                  <p className="text-sm text-white/85 mt-1.5 leading-relaxed">{playbook.subheadline}</p>
                </div>
              </div>
            </div>
          </div>

          {(resultado.metaTresMeses || !confAlta) && (
            <div className="px-6 py-4 border-t flex flex-col gap-2" style={{ background: 'var(--card-deep)', borderColor: 'var(--border-hairline)' }}>
              {resultado.metaTresMeses && (
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  🎯 Te aproxima de: <span style={{ color: 'var(--text-primary)' }}>"{resultado.metaTresMeses}"</span>
                </p>
              )}
              {!confAlta && (
                <p
                  className="text-xs leading-relaxed px-3 py-2 rounded-lg border"
                  style={{
                    color: resultado.confianca === 'media' ? 'var(--warn-text)' : 'var(--danger-text)',
                    background: resultado.confianca === 'media' ? 'var(--warn-tint)' : 'var(--danger-tint)',
                    borderColor: resultado.confianca === 'media' ? 'var(--warn-border)' : 'var(--danger-border)',
                  }}
                >
                  <span className="font-mono font-bold uppercase tracking-widest text-[10px] mr-2">
                    {resultado.confianca === 'media' ? 'Nota' : 'Atenção'}
                  </span>
                  {resultado.confiancaExplicacao}
                </p>
              )}
            </div>
          )}
        </div>

        {/* RECOMENDAÇÃO — varia por forma */}
        <Recomendacao pb={playbook} />

        {/* PLAYBOOK PDF + e-mail opt-in */}
        <BaixarPlaybook
          playbook={playbook}
          sessionId={sessionId}
          onBaixar={onRegistrarPlaybook}
          onSalvarEmail={onSalvarEmail}
        />

        {/* CTA — copy adapta à forma */}
        <CTAComercial forma={playbook.forma} onRegistrarCTA={onRegistrarCTA} />

        {/* Orçamento — 1 toque, depois do valor */}
        <PerguntaOrcamento onSalvar={onSalvarOrcamento} />

        <div className="text-center pb-2">
          <button
            onClick={onReiniciar}
            className="text-sm underline transition-colors hover:opacity-80"
            style={{ color: 'var(--text-muted)' }}
          >
            Refazer com outras respostas
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
