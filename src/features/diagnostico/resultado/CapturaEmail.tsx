import { useState } from 'react';

interface Props {
  onSalvar: (email: string) => Promise<void>;
}

export default function CapturaEmail({ onSalvar }: Props) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await onSalvar(email.trim());
    setLoading(false);
    setEnviado(true);
  }

  return (
    <div className="border border-gray-200 rounded-xl px-5 py-5 bg-white">
      <p className="text-sm font-semibold text-gray-800 mb-1">Quer salvar esse diagnóstico?</p>
      <p className="text-xs text-gray-500 mb-4">
        Enviamos um resumo por e-mail. Sem spam, sem compromisso.
      </p>

      {enviado ? (
        <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
          <span>✓</span> Diagnóstico enviado para {email}
        </div>
      ) : (
        <form onSubmit={handleEnviar} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2.5
              focus:outline-none focus:border-[#1B3A5C] transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1B3A5C] text-white text-sm font-medium px-4 py-2.5 rounded-lg
              hover:bg-[#152e4a] transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? '...' : 'Enviar'}
          </button>
        </form>
      )}
    </div>
  );
}
