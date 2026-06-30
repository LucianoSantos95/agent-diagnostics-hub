import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  sessionId: string;
  categoria: string;
  onSalvar: (email: string) => Promise<void>;
}

export default function CapturaEmail({ sessionId, categoria, onSalvar }: Props) {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await onSalvar(email.trim());
      // dispara envio do PDF por e-mail (fire and forget — não bloqueia UX)
      supabase.functions
        .invoke('enviar-diagnostico', {
          body: { session_id: sessionId, email: email.trim(), categoria },
        })
        .catch(() => null);
    } finally {
      setLoading(false);
      setEnviado(true);
    }
  }

  return (
    <div
      className="rounded-xl px-5 py-5 border"
      style={{ background: "var(--surface-soft)", borderColor: "var(--surface-border)" }}
    >
      <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Receba seu diagnóstico em PDF
      </p>
      <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
        Enviamos o resumo completo por e-mail. Sem spam, sem compromisso.
      </p>
      {enviado ? (
        <p className="text-sm font-medium" style={{ color: "#34d399" }}>
          ✓ Diagnóstico enviado para {email}
        </p>
      ) : (
        <form onSubmit={handleEnviar} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 text-sm rounded-lg px-3 py-2.5 focus:outline-none min-w-0"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-primary)",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="text-sm font-semibold px-4 py-2.5 rounded-lg text-white whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
          >
            {loading ? "..." : "Enviar PDF"}
          </button>
        </form>
      )}
    </div>
  );
}
