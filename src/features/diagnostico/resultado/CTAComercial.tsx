interface Props { onRegistrarCTA: () => void; }

const BENEFICIOS = [
  'Qual ferramenta usar no seu caso específico',
  'Como configurar nos primeiros 3 dias',
  'O que medir para saber se funcionou',
];

export default function CTAComercial({ onRegistrarCTA }: Props) {
  function handleClick() {
    onRegistrarCTA();
    window.open(
      'https://wa.me/5511994921881?text=Ol%C3%A1%2C%20fiz%20o%20diagn%C3%B3stico%20de%20agente%20de%20IA%20e%20quero%20agendar%20minha%20sess%C3%A3o%20gratuita%20de%2030%20minutos.',
      '_blank'
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0f2244 0%, #1e3a5f 100%)',
        border: '1px solid rgba(59,130,246,0.3)',
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), transparent)' }}
      />

      <div className="px-6 pt-7 pb-5">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.25)' }}
          >
            🎁 Oferta exclusiva
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-white leading-snug mb-2">
          Sessão gratuita de 30 minutos
          <br />
          <span style={{ color: '#60a5fa' }}>com um especialista da Focus Custom</span>
        </h3>

        <p className="text-sm leading-relaxed mb-5" style={{ color: '#93c5fd' }}>
          Você sai da conversa com um <strong className="text-white">plano de ação concreto</strong> para
          implementar o seu primeiro agente de IA. Sem pressão de venda. Só clareza.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {BENEFICIOS.map((b) => (
            <div key={b} className="flex items-start gap-2.5">
              <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
              <span className="text-sm" style={{ color: '#cbd5e1' }}>{b}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleClick}
          className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
          }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar minha sessão gratuita
          </span>
        </button>

        <p className="text-xs text-center mt-3" style={{ color: 'rgba(147,197,253,0.4)' }}>
          Agenda em até 24h · Sem compromisso · 100% gratuito
        </p>
      </div>
    </div>
  );
}
