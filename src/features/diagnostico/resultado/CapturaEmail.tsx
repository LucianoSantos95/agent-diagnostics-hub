import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  sessionId: string;
  categoria: string;
  onSalvar: (email: string) => Promise<void>;
  onDesbloquear: (email: string) => void;
}

export default function CapturaEmail({ sessionId, categoria, onSalvar, onDesbloquear }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    const emailTrim = email.trim();
    if (!emailTrim) return;
    setLoading(true);
    try {
      await onSalvar(emailTrim);
      // dispara envio do PDF por e-mail (fire and forget — não bloqueia UX)
      supabase.functions
        .invoke('enviar-diagnostico', {
          body: { session_id: sessionId, email: emailTrim, categoria },
        })
        .catch(() => null);
    } finally {
      setLoading(false);
      onDesbloquear(emailTrim);
    }
  }

  return (
    <div
      className="rounded-2xl px-6 py-6 border relative overflow-hidden"
      style={{
        background: "var(--accent-soft)",
        borderColor: "var(--accent-border)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg"
          style={{ background: "var(--accent-chip-bg)", border: "1px solid var(--accent-border)" }}
        >
          🔓
        </span>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-accent)" }}>
          Desbloqueie o guia completo
        </span>
      </div>

      <p className="text-base font-bold mb-1" style={{ color: "var(--text-primary)" }}>
        Veja o passo a passo e receba seu diagnóstico em PDF
      </p>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        Desbloqueie o guia de implementação aqui na tela e receba também o resumo completo em PDF
        no seu e-mail. Sem spam. Um e-mail só.
      </p>

      <form onSubmit={handleEnviar} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="seu@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 text-sm rounded-xl px-4 py-3 focus:outline-none min-w-0"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--surface-border)",
            color: "var(--text-primary)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="text-sm font-bold px-6 py-3 rounded-xl text-white whitespace-nowrap transition-all hover:scale-[1.02] active:scale-95"
          style={{
            background: "linear-gradient(135deg, var(--accent), #4338ca)",
            boxShadow: "0 4px 20px var(--accent-glow)",
          }}
        >
          {loading ? "..." : "Desbloquear guia →"}
        </button>
      </form>
    </div>
  );
}
