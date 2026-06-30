CREATE TABLE public.feedbacks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL CHECK (char_length(nome) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  mensagem text NOT NULL CHECK (char_length(mensagem) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.feedbacks TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.feedbacks TO authenticated;
GRANT ALL ON public.feedbacks TO service_role;
ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon insert feedbacks" ON public.feedbacks FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "authenticated read feedbacks" ON public.feedbacks FOR SELECT TO authenticated USING (true);
CREATE INDEX idx_feedbacks_created ON public.feedbacks (created_at DESC);