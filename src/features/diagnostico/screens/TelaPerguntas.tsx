import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import MultipleChoiceQuestion from '../questions/MultipleChoiceQuestion';
import FreeTextQuestion from '../questions/FreeTextQuestion';
import PageBackground from '@/components/PageBackground';


interface Pergunta {
  numero: number;
  texto: string;
  tipo: 'multipla' | 'texto';
  opcoes?: string[];
  placeholder?: string;
  microcopy?: string;
  /** Múltipla escolha com várias respostas (resposta salva como "a; b; c"). */
  multi?: boolean;
  /** Opção que zera as demais quando marcada (ex.: "Nada ainda"). */
  exclusiva?: string;
}

const PERGUNTAS: Pergunta[] = [
  {
    numero: 1,
    texto: 'Como você trabalha hoje?',
    tipo: 'multipla',
    opcoes: [
      'Autônomo ou freelancer — sou eu que faço e entrego',
      'Consultor — presto serviço recorrente pra alguns clientes',
      'Agência — tenho um time entregando pra vários clientes',
      'Empresa com time — operação interna com funcionários',
    ],
  },
  {
    numero: 2,
    texto: 'Onde está o maior gargalo no seu trabalho hoje?',
    tipo: 'multipla',
    opcoes: [
      'Atendimento ao cliente — demoro para responder, perco gente no caminho',
      'Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade',
      'Operação interna — processo manual, retrabalho, tarefa repetitiva',
      'Financeiro — não sei prever caixa, cobrança de cliente é manual',
    ],
    microcopy: 'Boa! Mais perguntas rápidas.',
  },
  {
    numero: 3,
    texto: 'Quantas pessoas tocam a operação com você, contando você?',
    tipo: 'multipla',
    opcoes: ['Só eu', '2 a 5 pessoas', '6 a 20 pessoas', 'Mais de 20 pessoas'],
    microcopy: 'Quase na metade!',
  },
  {
    numero: 4,
    texto: 'Quantas mensagens ou contatos de clientes você recebe por dia, em média?',
    tipo: 'multipla',
    opcoes: ['Menos de 10', 'Entre 10 e 50', 'Mais de 50'],
    microcopy: 'Passando da metade.',
  },
  {
    numero: 5,
    texto: 'Descreva em 1 frase a tarefa que mais consome seu tempo hoje, mesmo sendo repetitiva.',
    tipo: 'texto',
    placeholder: 'Ex: responder as mesmas dúvidas de clientes todo dia no WhatsApp',
    microcopy: 'Ótimo! Isso vai personalizar sua recomendação.',
  },
  {
    numero: 6,
    texto: 'Se desse certo, o que mudaria no seu dia a dia daqui a 3 meses?',
    tipo: 'texto',
    placeholder: 'Ex: pararia de passar o dia respondendo mensagens e focaria em vender',
    microcopy: 'Estamos chegando lá!',
  },
  {
    numero: 7,
    texto: 'O que você já usa hoje? Marque tudo que se aplica.',
    tipo: 'multipla',
    multi: true,
    exclusiva: 'Nada ainda — seria minha primeira vez',
    opcoes: [
      'Nada ainda — seria minha primeira vez',
      'ChatGPT, Gemini ou Claude no dia a dia',
      'Um CRM (RD Station, Pipedrive, HubSpot, Kommo...)',
      'Planilhas (Google Sheets / Excel) pra controlar processo',
      'Automação (Make, Zapier, n8n)',
      'Chatbot ou atendimento (ManyChat, Typebot, Tidio...)',
      'Ferramenta de cobrança (Asaas, Cora, Vindi...)',
      'Já testei IA antes e não engatou',
    ],
    microcopy: 'Última reta!',
  },
];

const TOTAL_PERGUNTAS = PERGUNTAS.length;

interface Props {
  perguntaAtual: number;
  respostas: Record<number, string>;
  onResponder: (pergunta: number, valor: string) => void;
  onAvancar: () => void;
  onVoltar: () => void;
}

export default function TelaPerguntas({ perguntaAtual, respostas, onResponder, onAvancar, onVoltar }: Props) {
  const prefersReduced = useReducedMotion();
  const autoRef = useRef<number | undefined>(undefined);

  const pergunta = PERGUNTAS[perguntaAtual - 1];
  const podeAvancar = !!(respostas[perguntaAtual]?.trim());
  const microcopy = perguntaAtual > 1 ? PERGUNTAS[perguntaAtual - 2]?.microcopy : undefined;
  const ehUltima = perguntaAtual === TOTAL_PERGUNTAS;

  useEffect(() => () => window.clearTimeout(autoRef.current), []);

  function handleAvancar() {
    window.clearTimeout(autoRef.current);
    onAvancar();
  }
  function handleVoltar() {
    window.clearTimeout(autoRef.current);
    onVoltar();
  }

  // Múltipla escolha de resposta única avança sozinha — dá um respiro pro
  // usuário ver a seleção antes de trocar de tela. Texto livre e multi-seleção
  // continuam exigindo "Continuar".
  function handleResponder(valor: string) {
    onResponder(perguntaAtual, valor);
    if (pergunta.tipo === 'multipla' && !pergunta.multi && !ehUltima && valor.trim()) {
      window.clearTimeout(autoRef.current);
      autoRef.current = window.setTimeout(onAvancar, prefersReduced ? 0 : 260);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      <PageBackground />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Progresso */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Pergunta {perguntaAtual} <span style={{ color: 'var(--text-muted)' }}>de {TOTAL_PERGUNTAS}</span>
            </span>
            {microcopy && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full animate-fade-up"
                style={{ background: 'var(--success-tint)', color: 'var(--success)', border: '1px solid var(--success-border)' }}
              >
                {microcopy}
              </span>
            )}
          </div>
          {/* Segmented progress */}
          <div className="flex gap-1.5">
            {Array.from({ length: TOTAL_PERGUNTAS }, (_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-500"
                style={{
                  height: i === perguntaAtual - 1 ? 5 : 4,
                  background: i < perguntaAtual
                    ? 'linear-gradient(90deg, var(--accent), var(--text-accent))'
                    : i === perguntaAtual - 1
                      ? 'var(--accent-border)'
                      : 'var(--border-soft)',
                  boxShadow: i < perguntaAtual ? '0 0 8px var(--accent-glow)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Question card — re-monta a cada pergunta com fade-up via CSS.
            Sem AnimatePresence: não pode depender de animação concluir pra
            trocar de pergunta. */}
        <div
          key={perguntaAtual}
          className="rounded-2xl p-7 sm:p-8 border animate-fade-up"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border-soft)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold mb-4"
            style={{ background: 'var(--accent-chip-bg)', color: 'var(--text-accent)', border: '1px solid var(--accent-chip-border)' }}
          >
            {perguntaAtual}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold mb-6 leading-snug" style={{ color: 'var(--text-primary)' }}>
            {pergunta.texto}
          </h2>

          {pergunta.tipo === 'multipla' ? (
            <MultipleChoiceQuestion
              opcoes={pergunta.opcoes!}
              valorAtual={respostas[perguntaAtual]}
              multi={pergunta.multi}
              exclusiva={pergunta.exclusiva}
              onChange={handleResponder}
            />
          ) : (
            <FreeTextQuestion
              placeholder={pergunta.placeholder!}
              valorAtual={respostas[perguntaAtual]}
              onChange={v => onResponder(perguntaAtual, v)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-4">
          {perguntaAtual > 1 && (
            <button
              onClick={handleVoltar}
              className="flex-none px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--accent-chip-border)',
                color: 'var(--text-secondary)',
              }}
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={handleAvancar}
            disabled={!podeAvancar}
            className="flex-1 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95"
            style={podeAvancar ? {
              background: 'linear-gradient(135deg, var(--accent), #4338ca)',
              color: 'var(--accent-contrast)',
              boxShadow: '0 4px 24px var(--accent-glow)',
            } : {
              background: 'var(--card)',
              color: 'var(--text-muted)',
              cursor: 'not-allowed',
            }}
          >
            {perguntaAtual === TOTAL_PERGUNTAS ? 'Ver meu resultado →' : 'Continuar →'}
          </button>
        </div>

      </div>
    </div>
  );
}
