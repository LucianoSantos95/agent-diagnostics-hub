interface Props { onRegistrarCTA: () => void; }

export default function CTAComercial({ onRegistrarCTA }: Props) {
  function handleClick() {
    onRegistrarCTA();
    window.open("https://wa.me/5511994921881?text=Ol%C3%A1%2C%20fiz%20o%20diagn%C3%B3stico%20de%20agente%20de%20IA%20e%20quero%20entender%20as%20op%C3%A7%C3%B5es%20sob%20medida.", "_blank");
  }
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #1B3A5C 100%)", border: "1px solid rgba(59,130,246,0.3)" }}>
      <div className="px-6 pt-6 pb-4">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>Focus Custom</span>
        <h3 className="text-xl font-extrabold text-white mt-2 leading-snug">
          Quer um agente sob medida,<br />nao uma ferramenta generica?
        </h3>
        <p className="text-sm mt-3 leading-relaxed" style={{ color: "#93c5fd" }}>
          A Focus Custom desenvolve agentes de IA personalizados para o seu processo especifico. Prototipo em 24h.
        </p>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
      <div className="px-6 py-4 flex flex-col items-center gap-2">
        <button onClick={handleClick}
          className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-95"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}>
          Falar com a equipe no WhatsApp
        </button>
        <p className="text-xs" style={{ color: "rgba(147,197,253,0.4)" }}>Sem compromisso · Resposta em ate 24h</p>
      </div>
    </div>
  );
}
