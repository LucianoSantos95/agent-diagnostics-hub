import { useEffect, useState } from 'react';

interface Props {
  onIniciar: () => void;
}

export default function TelaAbertura({ onIniciar }: Props) {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisivel(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg flex flex-col items-center text-center gap-6">

        {/* Badge */}
        <div
          className={`transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="inline-flex items-center gap-2 bg-white border border-gray-200 text-[#1B3A5C] text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Diagnóstico gratuito · 2 minutos
          </span>
        </div>

        {/* H1 */}
        <div
          className={`transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '120ms' }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] leading-tight">
            Qual agente de IA sua empresa precisa primeiro?
          </h1>
        </div>

        {/* Subtítulo */}
        <div
          className={`transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '220ms' }}
        >
          <p className="text-gray-600 text-base leading-relaxed max-w-md">
            Responda 7 perguntas e descubra qual tipo de agente resolve o maior gargalo do seu negócio —
            sem precisar testar várias ferramentas às cegas.
          </p>
        </div>

        {/* CTA */}
        <div
          className={`transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '340ms' }}
        >
          <button
            onClick={onIniciar}
            className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white font-semibold text-base px-8 py-4 rounded-xl
              shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            Começar diagnóstico →
          </button>
        </div>

        {/* Prova social */}
        <div
          className={`transition-all duration-500 ${visivel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
          style={{ transitionDelay: '460ms' }}
        >
          <div className="mt-4 bg-white border border-gray-100 rounded-xl px-5 py-4 text-left shadow-sm max-w-md">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Case real</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              "Testamos 6 ferramentas de IA ao longo de um ano. Nenhuma funcionou como esperado —
              porque estávamos resolvendo o problema errado com a ferramenta certa."
            </p>
            <p className="text-xs text-gray-400 mt-2">— PME do setor de serviços, SP</p>
          </div>
        </div>

      </div>
    </div>
  );
}
