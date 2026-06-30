interface Props {
  onRegistrarCTA: () => void;
}

export default function CTAComercial({ onRegistrarCTA }: Props) {
  function handleClick() {
    onRegistrarCTA();
    window.open('https://wa.me/5511994921881?text=Ol%C3%A1%2C%20fiz%20o%20diagn%C3%B3stico%20de%20agente%20de%20IA%20e%20quero%20entender%20as%20op%C3%A7%C3%B5es%20sob%20medida.', '_blank');
  }

  return (
    <div className="bg-[#1B3A5C] rounded-2xl px-6 py-7 text-white text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-2">
        Focus Custom
      </p>
      <h3 className="text-xl font-bold mb-2 leading-snug">
        Quer um agente sob medida, não uma ferramenta genérica?
      </h3>
      <p className="text-blue-100 text-sm mb-5 leading-relaxed">
        A Focus Custom desenvolve agentes de IA personalizados para o seu processo específico —
        sem precisar adaptar seu negócio à ferramenta. Protótipo em 24h.
      </p>
      <button
        onClick={handleClick}
        className="bg-white text-[#1B3A5C] font-bold text-sm px-6 py-3 rounded-xl
          hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
      >
        Falar com a equipe no WhatsApp →
      </button>
      <p className="text-xs text-blue-300 mt-3 opacity-70">Sem compromisso. Resposta em até 24h.</p>
    </div>
  );
}
