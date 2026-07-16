import { useEffect, useState } from 'react';
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
      style={{ paddingTop: '80px' }}
    >
      <PageBackground />

      <div className="relative z-10 w-full max-w-2xl">

        {/* Progresso */}
        <div className="mb-7">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold" style={{ color: 'rgba(199,210,254,0.7)' }}>
              Pergunta {perguntaAtual} <span style={{ color: 'rgba(199,210,254,0.4)' }}>de {TOTAL_PERGUNTAS}</span>
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
            {Array.from({ length: TOTAL_PERGUNTAS }, (_, i) => (
              <div
                key={i}
                className="flex-1 rounded-full transition-all duration-500"
                style={{
                  height: i === perguntaAtual - 1 ? 5 : 4,
                  background: i < perguntaAtual
                    ? 'linear-gradient(90deg, #4f46e5, #a5b4fc)'
                    : i === perguntaAtual - 1
                      ? 'rgba(79,70,229,0.4)'
                      : 'rgba(255,255,255,0.1)',
                  boxShadow: i < perguntaAtual ? '0 0 8px rgba(79,70,229,0.4)' : 'none',
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
            style={{ background: 'rgba(79,70,229,0.2)', color: '#a5b4fc', border: '1px solid rgba(79,70,229,0.3)' }}
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
                color: '#c7d2fe',
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
              background: 'linear-gradient(135deg, #4f46e5, #4338ca)',
              color: '#fff',
              boxShadow: '0 4px 24px rgba(79,70,229,0.45)',
            } : {
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.28)',
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
