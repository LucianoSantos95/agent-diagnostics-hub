
-- 1. Remove permissive anon UPDATE policies. Updates now flow through the
--    diagnostico-progress edge function with service_role.
DROP POLICY IF EXISTS "anon update leads" ON public.diagnostico_leads;
DROP POLICY IF EXISTS "anon update respostas" ON public.diagnostico_respostas;
DROP POLICY IF EXISTS "anon update sessions" ON public.diagnostico_sessions;

-- 2. Explicit storage.objects policies for the private diagnosticos-pdf bucket
--    so the bucket has a documented, restrictive posture. service_role bypasses
--    RLS, so the edge function keeps working. anon/authenticated get nothing.
DROP POLICY IF EXISTS "diagnosticos_pdf service role only select" ON storage.objects;
DROP POLICY IF EXISTS "diagnosticos_pdf service role only insert" ON storage.objects;
DROP POLICY IF EXISTS "diagnosticos_pdf service role only update" ON storage.objects;
DROP POLICY IF EXISTS "diagnosticos_pdf service role only delete" ON storage.objects;

CREATE POLICY "diagnosticos_pdf service role only select"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "diagnosticos_pdf service role only insert"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

CREATE POLICY "diagnosticos_pdf service role only update"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "diagnosticos_pdf service role only delete"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (false);
