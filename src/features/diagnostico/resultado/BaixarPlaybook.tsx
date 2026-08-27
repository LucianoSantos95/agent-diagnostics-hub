import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Playbook } from '../playbooks';
import { playbookParaHtml } from '../playbooks';
import { pressable } from '@/lib/motion';

interface Props {
  playbook: Playbook;
  sessionId: string;
  onBaixar?: () => void;
  onSalvarEmail?: (email: string) => void;
}

type Estado = 'idle' | 'gerando' | 'pronto' | 'imprimir';

export default function BaixarPlaybook({ playbook, sessionId, onBaixar, onSalvarEmail }: Props) {
  const prefersReduced = useReducedMotion();
  const [estado, setEstado] = useState<Estado>('idle');
  const urlRef = useRef<string>('');
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'ok'>('idle');

  async function gerarPdf(comEmail?: string) {
    const { data, error } = await supabase.functions.invoke('gerar-playbook-pdf', {
      body: { session_id: sessionId, playbook, email: comEmail },
    });
    if (error || !data?.url) throw error ?? new Error('sem url');
    return data.url as string;
  }

  // Fallback: abre o playbook numa aba pra imprimir/salvar como PDF.
  function abrirParaImprimir() {
    const w = window.open('', '_blank', 'noopener');
    if (!w) return false;
    w.document.write(playbookParaHtml(playbook));
    w.document.close();
    return true;
  }

  async function baixar() {
    if (estado === 'gerando') return;
    setEstado('gerando');
    try {
      const url = urlRef.current || (await gerarPdf());
      urlRef.current = url;
      const a = document.createElement('a');
      a.href = url;
      a.rel = 'noopener';
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setEstado('pronto');
      onBaixar?.();
    } catch {
      // PDF do servidor indisponível → abre a versão pra imprimir
      const ok = abrirParaImprimir();
      setEstado(ok ? 'imprimir' : 'idle');
      if (ok) onBaixar?.();
    }
  }

  async function enviarEmail(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return;
    onSalvarEmail?.(v);
    setEmailStatus('ok');
    gerarPdf(v).catch(() => null); // fire-and-forget: gera + manda por e-mail
  }

  const nPassos = playbook.pontoDePartida.passos.length;

  return (
    <div
      className="rounded-2xl px-6 py-6 border relative overflow-hidden animate-fade-up"
      style={{ background: 'var(--accent-soft)', borderColor: 'var(--accent-border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg"
          style={{ background: 'var(--accent-chip-bg)', border: '1px solid var(--accent-border)' }}
        >
          📄
        </span>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-accent)' }}>
          Seu playbook em PDF
        </span>
      </div>

      <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        O passo a passo completo, pra ler com calma
      </p>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {playbook.forma === 'agente'
          ? 'O caminho pro agente sob medida: o que mapear, o que ele precisa acessar e como se preparar pra conversa.'
          : playbook.forma === 'validar'
          ? 'As perguntas pra responder antes de escolher ferramenta, com o próximo passo.'
          : `Setup passo a passo (${nPassos} passos)${playbook.integracoes.length ? ' + a integração' : ''}, erros comuns e checklist.`}{' '}
        Sem cadastro.
      </p>

      <motion.button
        {...(prefersReduced ? {} : pressable)}
        onClick={baixar}
        disabled={estado === 'gerando'}
        className="text-sm font-bold px-5 py-3 rounded-xl text-white"
        style={{
          background: estado === 'pronto'
            ? 'linear-gradient(135deg, #34d399, #047857)'
            : 'linear-gradient(135deg, #4f46e5, #4338ca)',
          boxShadow: '0 4px 20px var(--accent-glow)',
          opacity: estado === 'gerando' ? 0.7 : 1,
        }}
      >
        {estado === 'gerando'
          ? 'Gerando…'
          : estado === 'pronto'
          ? '✓ PDF baixado — baixar de novo'
          : estado === 'imprimir'
          ? '✓ Aberto — baixar de novo'
          : '⬇ Baixar playbook (PDF)'}
      </motion.button>
      {estado === 'imprimir' && (
        <p className="text-xs mt-2" style={{ color: 'var(--text-secondary)' }}>
          Abri numa aba nova. Pra salvar como PDF: Ctrl/Cmd + P → "Salvar como PDF".
        </p>
      )}

      <form onSubmit={enviarEmail} className="mt-4 flex flex-col sm:flex-row gap-2">
        {emailStatus === 'ok' ? (
          <p className="text-xs" style={{ color: 'var(--success)' }}>✓ Vai chegar no seu e-mail também.</p>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Quer receber por e-mail também? (opcional)"
              className="flex-1 text-sm rounded-xl px-4 py-2.5 focus:outline-none min-w-0"
              style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', color: 'var(--text-primary)' }}
            />
            <button
              type="submit"
              className="text-sm font-semibold px-4 py-2.5 rounded-xl"
              style={{ background: 'var(--card)', border: '1px solid var(--accent-chip-border)', color: 'var(--text-secondary)' }}
            >
              Enviar
            </button>
          </>
        )}
      </form>
    </div>
  );
}
