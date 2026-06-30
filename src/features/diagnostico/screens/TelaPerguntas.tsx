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
    }, 180);
    return () => clearTimeout(t);
  }, [perguntaAtual]);

  const pergunta = PERGUNTAS[perguntaVisivel - 1];
  const podeAvancar = !!(respostas[perguntaAtual]?.trim());
  const progresso = (perguntaAtual / 7) * 100;
  const microcopy = perguntaAtual > 1 ? PERGUNTAS[perguntaAtual - 2]?.microcopy : undefined;

  function handleAvancar() { setDirecao('frente'); onAvancar(); }
  function handleVoltar() { setDirecao('tras'); onVoltar(); }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(145deg, #0a1628 0%, #1B3A5C 55%, #0f2440 100%)' }}
    >
      <div className="w-full max-w-lg">

        {/* Progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold" style={{ color: 'rgba(147,197,253,0.7)' }}>
              Pergunta {perguntaAtual} de 7
            </span>
            {microcopy && (
              <span className="text-xs font-semibold text-emerald-400">{microcopy}</span>
            )}
          </div>
          {/* Bolinhas de progresso */}
          <div className="flex gap-2">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-1.5 rounded-full transition-all duration-500"
                style={{
                  background: i < perguntaAtual
                    ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                    : 'rgba(255,255,255,0.12)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-6 border transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.05)',
            borderColor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            opacity: animando ? 0 : 1,
            transform: animando
              ? direcao === 'frente' ? 'translateX(16px)' : 'translateX(-16px)'
              : 'translateX(0)'
          }}
        >
          <h2 className="text-lg font-bold text-white mb-6 leading-snug">
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

        {/* Navegação */}
        <div className="flex gap-3 mt-4">
          {perguntaAtual > 1 && (
            <button
              onClick={handleVoltar}
              className="flex-none px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#93c5fd'
              }}
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={handleAvancar}
            disabled={!podeAvancar}
            className="flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-200"
            style={podeAvancar ? {
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(37,99,235,0.4)'
            } : {
              background: 'rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.3)',
              cursor: 'not-allowed'
            }}
          >
            {perguntaAtual === 7 ? 'Ver resultado →' : 'Continuar →'}
          </button>
        </div>

      </div>
    </div>
  );
}
