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
  const resposta = respostas[perguntaAtual];
  const podeAvancar = !!resposta?.trim();
  const progresso = (perguntaAtual / 7) * 100;
  const microcopy = perguntaAtual > 1 ? PERGUNTAS[perguntaAtual - 2]?.microcopy : undefined;

  function handleAvancar() {
    setDirecao('frente');
    onAvancar();
  }

  function handleVoltar() {
    setDirecao('tras');
    onVoltar();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Barra de progresso */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500 font-medium">Pergunta {perguntaAtual} de 7</span>
            {microcopy && (
              <span className="text-xs text-[#1B3A5C] font-medium">{microcopy}</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1B3A5C] rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
        </div>

        {/* Card da pergunta */}
        <div
          className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-180
            ${animando
              ? direcao === 'frente' ? 'opacity-0 translate-x-4' : 'opacity-0 -translate-x-4'
              : 'opacity-100 translate-x-0'
            }`}
        >
          <h2 className="text-lg font-semibold text-[#1B3A5C] mb-5 leading-snug">
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
        <div className="flex gap-3 mt-5">
          {perguntaAtual > 1 && (
            <button
              onClick={handleVoltar}
              className="flex-none px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium
                hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={handleAvancar}
            disabled={!podeAvancar}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200
              ${podeAvancar
                ? 'bg-[#1B3A5C] text-white hover:bg-[#152e4a] shadow-md hover:shadow-lg active:scale-95'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            {perguntaAtual === 7 ? 'Ver resultado →' : 'Continuar →'}
          </button>
        </div>

      </div>
    </div>
  );
}
