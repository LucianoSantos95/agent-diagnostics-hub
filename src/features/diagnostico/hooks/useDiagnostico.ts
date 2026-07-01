import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { calcularResultado, type ResultadoDiagnostico } from '../engine/recomendacao';

export type Tela = 'abertura' | 'perguntas' | 'analise' | 'resultado';

interface DiagnosticoState {
  sessionId: string;
  tela: Tela;
  perguntaAtual: number;
  respostas: Record<number, string>;
  resultado: ResultadoDiagnostico | null;
  isLoading: boolean;
}

function gerarSessionId() {
  return crypto.randomUUID();
}

async function criarSessao(sessionId: string) {
  const utmSource = new URLSearchParams(window.location.search).get('utm_source') ?? undefined;
  await supabase.from('diagnostico_sessions').insert({
    id: sessionId,
    utm_source: utmSource ?? null,
    current_step: 0,
  });
}

async function salvarResposta(sessionId: string, pergunta: number, valor: string) {
  await Promise.all([
    supabase.from('diagnostico_respostas').upsert(
      { session_id: sessionId, pergunta_numero: pergunta, resposta_valor: valor },
      { onConflict: 'session_id,pergunta_numero' }
    ),
    supabase.from('diagnostico_sessions').update({ current_step: pergunta }).eq('id', sessionId),
  ]);
}

async function finalizarSessao(sessionId: string, categoria: string) {
  await supabase
    .from('diagnostico_sessions')
    .update({
      completed_at: new Date().toISOString(),
      categoria_resultado: categoria,
      resultado_visto_at: new Date().toISOString(),
    })
    .eq('id', sessionId);
}

const TOTAL_PERGUNTAS = 6;

export function useDiagnostico() {
  const sessionIdRef = useRef<string>(gerarSessionId());
  const sessionCreatedRef = useRef(false);

  const [state, setState] = useState<DiagnosticoState>({
    sessionId: sessionIdRef.current,
    tela: 'abertura',
    perguntaAtual: 1,
    respostas: {},
    resultado: null,
    isLoading: false,
  });

  const iniciar = useCallback(async () => {
    if (!sessionCreatedRef.current) {
      sessionCreatedRef.current = true;
      await criarSessao(sessionIdRef.current);
    }
    setState(s => ({ ...s, tela: 'perguntas' }));
  }, []);

  const responder = useCallback((pergunta: number, valor: string) => {
    setState(s => ({ ...s, respostas: { ...s.respostas, [pergunta]: valor } }));
    // fire-and-forget â€” nÃ£o bloqueia UX
    salvarResposta(sessionIdRef.current, pergunta, valor).catch(() => null);
  }, []);

  const avancar = useCallback(async () => {
    setState(s => {
      if (s.perguntaAtual < TOTAL_PERGUNTAS) {
        return { ...s, perguntaAtual: s.perguntaAtual + 1 };
      }
      // Última pergunta → vai para análise
      return { ...s, tela: 'analise' };
    });
  }, []);

  const voltar = useCallback(() => {
    setState(s => {
      if (s.perguntaAtual > 1) return { ...s, perguntaAtual: s.perguntaAtual - 1 };
      return { ...s, tela: 'abertura' };
    });
  }, []);

  const concluirAnalise = useCallback(async (respostas: Record<number, string>) => {
    const resultado = calcularResultado(respostas);
    await finalizarSessao(sessionIdRef.current, resultado.categoria).catch(() => null);
    setState(s => ({ ...s, resultado, tela: 'resultado' }));
  }, []);

  const salvarEmail = useCallback(async (email: string) => {
    await supabase.from('diagnostico_leads').upsert(
      { session_id: sessionIdRef.current, email, quer_consultoria: false },
      { onConflict: 'session_id' }
    );
  }, []);

  const salvarOrcamento = useCallback(async (orcamento: string) => {
    await supabase.from('diagnostico_leads').upsert(
      { session_id: sessionIdRef.current, orcamento },
      { onConflict: 'session_id' }
    );
  }, []);

  const registrarCTA = useCallback(async () => {
    await supabase.from('diagnostico_leads').upsert(
      { session_id: sessionIdRef.current, quer_consultoria: true },
      { onConflict: 'session_id' }
    );
  }, []);

  const reiniciar = useCallback(() => {
    sessionIdRef.current = gerarSessionId();
    sessionCreatedRef.current = false;
    setState({
      sessionId: sessionIdRef.current,
      tela: 'abertura',
      perguntaAtual: 1,
      respostas: {},
      resultado: null,
      isLoading: false,
    });
  }, []);

  return {
    state,
    iniciar,
    responder,
    avancar,
    voltar,
    concluirAnalise,
    salvarEmail,
    salvarOrcamento,
    registrarCTA,
    reiniciar,
  };
}
