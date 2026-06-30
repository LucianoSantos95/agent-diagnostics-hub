
CREATE TABLE IF NOT EXISTS public.diagnostico_sessions (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at          timestamptz NOT NULL DEFAULT now(),
  completed_at        timestamptz,
  current_step        integer     NOT NULL DEFAULT 0,
  utm_source          text,
  categoria_resultado text
);

CREATE TABLE IF NOT EXISTS public.diagnostico_respostas (
  id               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       uuid    NOT NULL REFERENCES public.diagnostico_sessions(id) ON DELETE CASCADE,
  pergunta_numero  integer NOT NULL CHECK (pergunta_numero BETWEEN 1 AND 7),
  resposta_valor   text    NOT NULL,
  UNIQUE (session_id, pergunta_numero)
);

CREATE TABLE IF NOT EXISTS public.diagnostico_leads (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id        uuid        NOT NULL REFERENCES public.diagnostico_sessions(id) ON DELETE CASCADE,
  nome              text,
  email             text,
  quer_consultoria  boolean     NOT NULL DEFAULT false,
  created_at        timestamptz NOT NULL DEFAULT now(),
  UNIQUE (session_id)
);

GRANT INSERT, UPDATE ON public.diagnostico_sessions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostico_sessions TO authenticated;
GRANT ALL ON public.diagnostico_sessions TO service_role;

GRANT INSERT, UPDATE ON public.diagnostico_respostas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostico_respostas TO authenticated;
GRANT ALL ON public.diagnostico_respostas TO service_role;

GRANT INSERT, UPDATE ON public.diagnostico_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diagnostico_leads TO authenticated;
GRANT ALL ON public.diagnostico_leads TO service_role;

ALTER TABLE public.diagnostico_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostico_respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostico_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon insert sessions" ON public.diagnostico_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update sessions" ON public.diagnostico_sessions FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "authenticated read sessions" ON public.diagnostico_sessions FOR SELECT TO authenticated USING (true);

CREATE POLICY "anon insert respostas" ON public.diagnostico_respostas FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update respostas" ON public.diagnostico_respostas FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "authenticated read respostas" ON public.diagnostico_respostas FOR SELECT TO authenticated USING (true);

CREATE POLICY "anon insert leads" ON public.diagnostico_leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update leads" ON public.diagnostico_leads FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "authenticated read leads" ON public.diagnostico_leads FOR SELECT TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_created ON public.diagnostico_sessions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_diagnostico_sessions_step ON public.diagnostico_sessions (current_step);
CREATE INDEX IF NOT EXISTS idx_diagnostico_respostas_session ON public.diagnostico_respostas (session_id);
