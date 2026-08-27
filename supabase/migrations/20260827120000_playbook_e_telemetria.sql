-- Playbook v1 + conserto de telemetria
-- Rode DEPOIS de 20260701_funil_instrumentacao.sql (que já criou resultado_visto_at e orcamento).

-- 1. Atribuição completa na sessão
ALTER TABLE diagnostico_sessions
  ADD COLUMN IF NOT EXISTS utm_medium         text,
  ADD COLUMN IF NOT EXISTS utm_campaign        text,
  ADD COLUMN IF NOT EXISTS utm_content         text,
  ADD COLUMN IF NOT EXISTS referrer            text,
  ADD COLUMN IF NOT EXISTS landing_path        text,
  ADD COLUMN IF NOT EXISTS playbook_baixado_at timestamptz,
  ADD COLUMN IF NOT EXISTS playbook_formato    text;

-- 2. View de funil atualizada — agora enxerga "viu resultado" e "baixou playbook"
CREATE OR REPLACE VIEW diagnostico_funil AS
SELECT
  s.id,
  s.created_at,
  s.current_step,
  s.categoria_resultado,
  (s.completed_at IS NOT NULL)          AS completou,
  (s.resultado_visto_at IS NOT NULL)    AS viu_resultado,
  (s.playbook_baixado_at IS NOT NULL)   AS baixou_playbook,
  s.playbook_formato,
  l.email,
  l.orcamento,
  l.quer_consultoria,
  s.utm_source,
  s.utm_medium,
  s.utm_campaign,
  s.referrer,
  s.landing_path
FROM diagnostico_sessions s
LEFT JOIN diagnostico_leads l ON l.session_id = s.id;

-- 3. Índice pra medir taxa de download do playbook
CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_playbook
  ON diagnostico_sessions (playbook_baixado_at);
