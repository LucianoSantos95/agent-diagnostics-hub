-- Instrumentação do funil do Diagnóstico de Agente de IA
-- Adiciona: rastreio de "resultado visto" e captura de orçamento no lead.
-- Rode este arquivo DEPOIS de 20260630_diagnostico_agente_ia.sql

-- Quando o usuário chegou a ver a tela de resultado (mede quem completou de fato)
ALTER TABLE diagnostico_sessions
  ADD COLUMN IF NOT EXISTS resultado_visto_at timestamptz;

-- Orçamento agora é capturado no fim do fluxo (depois do resultado), não no meio do quiz
ALTER TABLE diagnostico_leads
  ADD COLUMN IF NOT EXISTS orcamento text;

-- Índice para relatório de conversão por categoria
CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_categoria
  ON diagnostico_sessions (categoria_resultado);

-- ---------------------------------------------------------------------------
-- VIEW opcional de funil — facilita análise no Supabase (SELECT via service_role)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE VIEW diagnostico_funil AS
SELECT
  s.id,
  s.created_at,
  s.current_step,
  s.categoria_resultado,
  (s.completed_at IS NOT NULL)      AS completou,
  (s.resultado_visto_at IS NOT NULL) AS viu_resultado,
  l.email,
  l.orcamento,
  l.quer_consultoria,
  s.utm_source
FROM diagnostico_sessions s
LEFT JOIN diagnostico_leads l ON l.session_id = s.id;
