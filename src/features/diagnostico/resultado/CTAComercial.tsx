import type { Forma } from '../playbooks';

interface Props { forma?: Forma; onRegistrarCTA: () => void; }

const COPY: Record<Forma, { badge: string; titulo: React.ReactNode; texto: string; beneficios: string[]; botao: string; msg: string }> = {
  agente: {
    badge: 'Próximo passo',
    titulo: <>As ferramentas resolvem 70%.<br /><span style={{ color: 'var(--text-accent)' }}>Os 30% que quebram é onde a gente entra.</span></>,
    texto: 'Integração, configuração pro seu processo e manutenção quando algo para de funcionar — é isso que derruba a maioria. Numa sessão gratuita de 30 minutos, um especialista da Focus te mostra como desenhar o agente pro seu caso.',
    beneficios: ['A configuração exata para o seu processo', 'A integração com o que você já usa', 'Manutenção e ajuste quando o fluxo quebrar'],
    botao: 'Agendar sessão gratuita',
    msg: 'Olá! Fiz o diagnóstico e o resultado apontou que meu caso pede um agente sob medida. Quero agendar a sessão gratuita de 30 minutos.',
  },
  validar: {
    badge: 'Antes de decidir',
    titulo: <>Suas respostas apontam pra <span style={{ color: 'var(--text-accent)' }}>dois lados.</span></>,
    texto: 'Antes de gastar tempo montando a ferramenta errada, vale uma conversa curta pra confirmar qual é a dor prioritária. Sessão gratuita de 30 minutos, sem compromisso de fechar nada.',
    beneficios: ['Confirmar qual gargalo ataca primeiro', 'Evitar 3 meses testando a coisa errada', 'Sair com um caminho claro'],
    botao: 'Agendar 30 min de validação',
    msg: 'Olá! Fiz o diagnóstico e o resultado sugeriu validar antes de escolher ferramenta. Quero agendar os 30 minutos.',
  },
  'uma-ferramenta': {
    badge: 'Se precisar',
    titulo: <>Travou no setup?<br /><span style={{ color: 'var(--text-accent)' }}>A gente destrava.</span></>,
    texto: 'O playbook te leva longe sozinho. Mas se empacar na configuração ou quiser que alguém revise antes de você ativar pra valer, uma call de 30 minutos resolve. Gratuita.',
    beneficios: ['Revisar seu fluxo antes de ativar', 'Destravar o passo que travou', 'Ajustar pro seu processo real'],
    botao: 'Agendar call de 30 min',
    msg: 'Olá! Fiz o diagnóstico, vou montar a ferramenta indicada e queria uma call de 30 minutos pra revisar/destravar.',
  },
  'ferramenta-mais-complemento': {
    badge: 'Se precisar',
    titulo: <>A integração é onde<br /><span style={{ color: 'var(--text-accent)' }}>a maioria trava.</span></>,
    texto: 'Montar cada ferramenta é tranquilo. Ligar uma na outra sem retrabalho e sem quebrar é a parte chata. Se quiser fazer isso com alguém do lado, a call de 30 minutos é gratuita.',
    beneficios: ['Fazer a integração funcionar de primeira', 'Tratar erro antes de virar problema', 'Deixar rodando sozinho de verdade'],
    botao: 'Agendar call de 30 min',
    msg: 'Olá! Fiz o diagnóstico, vou montar as duas ferramentas indicadas e queria ajuda com a integração numa call de 30 minutos.',
  },
};

export default function CTAComercial({ forma = 'uma-ferramenta', onRegistrarCTA }: Props) {
  const c = COPY[forma];
  function handleClick() {
    onRegistrarCTA();
    const url = `https://wa.me/5511916742443?text=${encodeURIComponent(c.msg)}`;
    window.open(url, '_blank');
  }

  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a0a1a 0%, #141432 50%, #1e1e5a 100%)',
        border: '1px solid rgba(79,70,229,0.35)',
        boxShadow: '0 30px 80px -30px rgba(79,70,229,0.55), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.8), transparent)' }}
      />
      {/* Ambient radial */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.35) 0%, transparent 70%)' }}
      />

      <div className="relative px-6 pt-7 pb-5">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-[10px] font-mono font-bold uppercase tracking-[0.24em] px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"
            style={{ background: 'rgba(79,70,229,0.18)', color: '#c4b5fd', border: '1px solid rgba(79,70,229,0.35)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
            {c.badge}
          </span>
        </div>

        <h3 className="font-display text-2xl md:text-[26px] font-extrabold text-white leading-[1.15] tracking-tight mb-3">
          {c.titulo}
        </h3>

        <p className="text-sm leading-relaxed mb-5" style={{ color: '#c7d2fe' }}>
          {c.texto}
        </p>

        <div className="flex flex-col gap-2 mb-6">
          {c.beneficios.map((b) => (
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
            {c.botao}
          </span>
        </button>

        <p className="text-xs text-center mt-3" style={{ color: 'rgba(199,210,254,0.45)' }}>
          Resposta em até 24h · Sem compromisso · Gratuito
        </p>
      </div>
    </div>
  );
}
