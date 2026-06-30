import { useEffect, useState } from 'react';
import MultipleChoiceQuestion from '../questions/MultipleChoiceQuestion';
import FreeTextQuestion from '../questions/FreeTextQuestion';

interface Pergunta {
  numero: number;
  texto: string;
  tipo: 'multipla' | 'texto';
  opcoes?: string[];
  placeholder?: string;
  microcopy?: string;
}

const PERGUNTAS: Pergunta[] = [
  {
    numero: 1,
    texto: 'Onde está o maior gargalo da sua empresa hoje?',
    tipo: 'multipla',
    opcoes: [
      'Atendimento ao cliente — demoro para responder, perco gente no caminho',
      'Vendas e follow-up — esqueço de cobrar resposta, perco oportunidade',
      'Operação interna — processo manual, retrabalho, tarefa repetitiva',
      'Financeiro — não sei prever caixa, cobrança de cliente é manual',
    ],
  },
  {
    numero: 2,
    texto: 'Quantas pessoas trabalham com você hoje, incluindo você?',
    tipo: 'multipla',
    opcoes: ['Só eu', '2 a 5 pessoas', '6 a 20 pessoas', 'Mais de 20 pessoas'],
    microcopy: 'Boa! Mais perguntas rápidas.',
  },
  {
    numero: 3,
    texto: 'Quantas mensagens ou contatos de clientes você recebe por dia, em média?',
    tipo: 'multipla',
    opcoes: ['Menos de 10', 'Entre 10 e 50', 'Mais de 50'],
    microcopy: 'Quase na metade!',
  },
  {
    numero: 4,
    texto: 'Descreva em 1 frase a tarefa que mais consome seu tempo hoje, mesmo sendo repetitiva.',
    tipo: 'texto',
    placeholder: 'Ex: responder as mesmas dúvidas de clientes todo dia no WhatsApp',
    microcopy: 'Ótimo! Isso vai personalizar sua recomendação.',
  },
  {
    numero: 5,
    texto: 'Já tentou alguma ferramenta de IA antes?',
    tipo: 'multipla',
    opcoes: [
      'Não, seria minha primeira vez',
      'Sim, testei mas não deu certo',
      'Sim, uso algo hoje mas quero melhorar',
    ],
    microcopy: 'Estamos chegando lá!',
  },
  {
    numero: 6,
    texto: 'Se desse certo, o que mudaria no seu dia a dia daqui a 3 meses?',
    tipo: 'texto',
    placeholder: 'Ex: pararia de passar o dia respondendo mensagens e focaria em vender',
    microcopy: 'Última reta!',
  },
  {
    numero: 7,
    texto: 'Você tem orçamento mensal disponível para uma ferramenta de IA?',
    tipo: 'multipla',
    opcoes: [
      'Ainda não, só quero entender o que existe',
      'Até R$200/mês',
      'Entre R$200 e R$800/mês',
      'Acima de R$800/mês',
    ],
  },
];

interface Props {
  perguntaAtual: number;
  respostas: Record<number, string>;
  onResponder: (pergunta: number, valor: string) => void;
  onAvancar: () => void;
  onVoltar: () => void;
}

export default function TelaPerguntas({ perguntaAtual, respostas, onResponder, onAvancar, onVoltar }: Props) {
  const [animando, setAnimando] = useState(false);
  const [direcao, setDirecao] = useState<'frente' | 'tras'>('frente');
  const [perguntaVisivel, setPerguntaVisivel] = useState(perguntaAtual);

  useEffect(() => {
    setAnimando(true);
    const t = setTimeout(() => {
      setPerguntaVisivel(perguntaAtual);
      setAnimando(false);
    }, 260);
    return () => clearTimeout(t);
  }, [perguntaAtual]);

  const pergunta = PERGUNTAS[perguntaVisivel - 1];
  const podeAvancar = !!(respostas[perguntaAtual]?.trim());
  const microcopy = perguntaAtual > 1 ? PERGUNTAS[perguntaAtual - 2]?.microcopy : undefined;

  function handleAvancar() { setDirecao('frente'); onAvancar(); }
  function handleVoltar() { setDirecao('tras'); onVoltar(); }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #1B3A5C 55%, #0f2440 100%)', paddingTop: '80px' }}
    >
      {/* Animated blobs */}
      <div
        className="animate-blob absolute pointer-events-none"
        style={{
          top: '-100px', right: '-80px', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="animate-blob2 delay-2000 absolute pointer-events-none"
        style={{
          bottom: '-120px', left: '-60px', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Progresso */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold" style={{ color: 'rgba(147,197,253,0.7)' }}>
              Pergunta {perguntaAtual} <span style={{ color: 'rgba(147,197,253,0.4)' }}>de 7</span>
            </span>
            {microcopy && (
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full animate-fade-up"
                style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.25)' }}
              >
                {microcopy}
              </span>
            )}
          </div>
          {/* Segmented progress */}
          <div className="flex gap-1.5">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-500"
                style={{
                  height: i === perguntaAtual - 1 ? 5 : 4,
                  background: i < perguntaAtual
                    ? 'linear-gradient(90deg, #3b82f6, #818cf8)'
                    : i === perguntaAtual - 1
                      ? 'rgba(59,130,246,0.4)'
                      : 'rgba(255,255,255,0.1)',
                  boxShadow: i < perguntaAtual ? '0 0 8px rgba(99,102,241,0.4)' : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Question card */}
        <div
          className="rounded-2xl p-7 sm:p-8 border"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
            opacity: animando ? 0 : 1,
            transform: animando
              ? direcao === 'frente' ? 'translateX(24px) scale(0.98)' : 'translateX(-24px) scale(0.98)'
              : 'translateX(0) scale(1)',
            transition: 'opacity 0.28s cubic-bezier(0.34,1.56,0.64,1), transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <div
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold mb-4"
            style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}
          >
            {perguntaVisivel}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
            {pergunta.texto}
          </h2>

          {pergunta.tipo === 'multipla' ? (
            <MultipleChoiceQuestion
              opcoes={pergunta.opcoes!}
              valorAtual={respostas[perguntaAtual]}
              onChange={v => onResponder(perguntaAtual, v)}
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
              className="flex-none px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#93c5fd',
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
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff',
              boxShadow: '0 4px 24px rgba(37,99,235,0.45)',
            } : {
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.28)',
              cursor: 'not-allowed',
            }}
          >
            {perguntaAtual === 7 ? 'Ver meu resultado →' : 'Continuar →'}
          </button>
        </div>

      </div>
    </div>
  );
}
