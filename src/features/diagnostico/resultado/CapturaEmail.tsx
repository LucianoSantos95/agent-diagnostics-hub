import { useState } from "react";

interface Props { onSalvar: (email: string) => Promise<void>; }

export default function CapturaEmail({ onSalvar }: Props) {
  const [email, setEmail] = useState("");
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
    <div className="rounded-xl px-5 py-5 border"
      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
      <p className="text-sm font-semibold text-white mb-1">Quer salvar esse diagnostico?</p>
      <p className="text-xs mb-4" style={{ color: "rgba(147,197,253,0.6)" }}>
        Enviamos um resumo por e-mail. Sem spam, sem compromisso.
      </p>
      {enviado ? (
        <p className="text-sm font-medium" style={{ color: "#34d399" }}>Diagnostico enviado para {email}</p>
      ) : (
        <form onSubmit={handleEnviar} className="flex gap-2">
          <input type="email" required placeholder="seu@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 text-sm rounded-lg px-3 py-2.5 focus:outline-none min-w-0"
            style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "#f1f5f9" }} />
          <button type="submit" disabled={loading}
            className="text-sm font-semibold px-4 py-2.5 rounded-lg text-white whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
            {loading ? "..." : "Enviar"}
          </button>
        </form>
      )}
    </div>
  );
}
