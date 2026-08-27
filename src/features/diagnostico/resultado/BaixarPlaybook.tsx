import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ResultadoDiagnostico } from '../engine/recomendacao';
import { montarPlaybook, playbookToHTML, playbookToMarkdown } from '../playbooks';
import { pressable } from '@/lib/motion';

interface Props {
  resultado: ResultadoDiagnostico;
  /** Resposta P5 (texto livre) — afina o ponto de partida do playbook. */
  tarefa?: string;
  onBaixar?: (formato: 'md' | 'html') => void;
}

function baixarArquivo(nome: string, conteudo: string, mime: string) {
  const blob = new Blob([conteudo], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export default function BaixarPlaybook({ resultado, tarefa = '', onBaixar }: Props) {
  const prefersReduced = useReducedMotion();
  const playbook = useMemo(() => montarPlaybook(resultado, tarefa), [resultado, tarefa]);
  const slug = `playbook-${resultado.categoria}`;
  const [baixado, setBaixado] = useState<'md' | 'html' | null>(null);
  const resetRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetRef.current), []);

  function handle(formato: 'md' | 'html') {
    if (formato === 'md') {
      baixarArquivo(`${slug}.md`, playbookToMarkdown(playbook), 'text/markdown');
    } else {
      baixarArquivo(`${slug}.html`, playbookToHTML(playbook), 'text/html');
    }
    onBaixar?.(formato);
    setBaixado(formato);
    window.clearTimeout(resetRef.current);
    resetRef.current = window.setTimeout(() => setBaixado(null), 3500);
  }

  const nPassos = playbook.pontoDePartida.passos.length;
  const nIntegr = playbook.integracoes.length;

  return (
    <div
      className="rounded-2xl px-6 py-6 border relative overflow-hidden animate-fade-up"
      style={{
        background: 'var(--success-tint)',
        borderColor: 'var(--success-border)',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg"
          style={{ background: 'var(--success-tint)', border: '1px solid var(--success-border)' }}
        >
          📘
        </span>
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--success)' }}>
          Seu playbook para baixar
        </span>
      </div>

      <p className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Passo a passo pra montar isso sozinho — sem depender de ninguém
      </p>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Um guia feito pro seu perfil ({resultado.perfilLabel}): {nPassos} passos pra colocar a
        ferramenta de partida no ar
        {nIntegr > 0 && `, mais ${nIntegr} ${nIntegr === 1 ? 'integração' : 'integrações'} pra ligar no que você já usa (API, MCP, Make)`}
        , erros comuns e um checklist. Sem e-mail, sem cadastro.
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <motion.button
          {...(prefersReduced ? {} : pressable)}
          onClick={() => handle('html')}
          className="text-sm font-bold px-5 py-3 rounded-xl text-white"
          style={{
            background: baixado === 'html'
              ? 'linear-gradient(135deg, #34d399, #047857)'
              : 'linear-gradient(135deg, #059669, #047857)',
            boxShadow: '0 4px 20px rgba(5,150,105,0.3)',
          }}
        >
          {baixado === 'html' ? '✓ Playbook baixado' : '⬇ Baixar playbook (HTML)'}
        </motion.button>
        <motion.button
          {...(prefersReduced ? {} : pressable)}
          onClick={() => handle('md')}
          className="text-sm font-semibold px-5 py-3 rounded-xl"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--accent-chip-border)',
            color: 'var(--text-secondary)',
          }}
        >
          {baixado === 'md' ? '✓ Baixado' : '⬇ Versão Markdown'}
        </motion.button>
      </div>

      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
        HTML abre em qualquer navegador e dá pra salvar como PDF (Ctrl/Cmd + P). Markdown serve pra
        colar no Notion.
      </p>
    </div>
  );
}
