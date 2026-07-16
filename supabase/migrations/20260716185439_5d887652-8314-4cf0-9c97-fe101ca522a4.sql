-- Add explicit RESTRICTIVE policies to guarantee that only service_role can
-- read/update/delete diagnostic data, even if a permissive policy is added later.

CREATE POLICY "restrict reads to service_role" ON public.diagnostico_leads
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "restrict updates to service_role" ON public.diagnostico_leads
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "restrict deletes to service_role" ON public.diagnostico_leads
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "restrict reads to service_role" ON public.diagnostico_sessions
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "restrict updates to service_role" ON public.diagnostico_sessions
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "restrict deletes to service_role" ON public.diagnostico_sessions
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);

CREATE POLICY "restrict reads to service_role" ON public.diagnostico_respostas
  AS RESTRICTIVE FOR SELECT TO anon, authenticated USING (false);
CREATE POLICY "restrict updates to service_role" ON public.diagnostico_respostas
  AS RESTRICTIVE FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "restrict deletes to service_role" ON public.diagnostico_respostas
  AS RESTRICTIVE FOR DELETE TO anon, authenticated USING (false);