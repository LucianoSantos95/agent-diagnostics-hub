-- Diagnóstico de Agente de IA
-- Tabelas: diagnostico_sessions, diagnostico_respostas, diagnostico_leads

CREATE TABLE IF NOT EXISTS diagnostico_sessions (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz,
  current_step        integer     NOT NULL DEFAULT 0,
  utm_source          text,
  categoria_resultado text
);

CREATE TABLE IF NOT EXISTS diagnostico_respostas (
  id               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       uuid    NOT NULL REFERENCES diagnostico_sessions(id) ON DELETE CASCADE,
  pergunta_numero  integer NOT NULL CHECK (pergunta_numero BETWEEN 1 AND 7),
  resposta_valor   text    NOT NULL,
  UNIQUE (session_id, pergunta_numero)
);

CREATE TABLE IF NOT EXISTS diagnostico_leads (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id        uuid        NOT NULL REFERENCES diagnostico_sessions(id) ON DELETE CASCADE,
  nome              text,
  email             text,
  quer_consultoria  boolean     NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);

-- RLS: INSERT público (anon), SELECT apenas autenticado/service_role
ALTER TABLE diagnostico_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostico_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostico_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon insert sessions"
  ON diagnostico_sessions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon update sessions"
  ON diagnostico_sessions FOR UPDATE TO anon
  USING (true) WITH CHECK (true);

CREATE POLICY "anon insert respostas"
  ON diagnostico_respostas FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon upsert respostas"
  ON diagnostico_respostas FOR UPDATE TO anon
  USING (true) WITH CHECK (true);

CREATE POLICY "anon insert leads"
  ON diagnostico_leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "anon upsert leads"
  ON diagnostico_leads FOR UPDATE TO anon
  USING (true) WITH CHECK (true);

-- Índices para análise de funil
CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_created
  ON diagnostico_sessions (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_step
  ON diagnostico_sessions (current_step);

CREATE INDEX IF NOT EXISTS idx_diagnostico_respostas_session
  ON diagnostico_respostas (session_id);
