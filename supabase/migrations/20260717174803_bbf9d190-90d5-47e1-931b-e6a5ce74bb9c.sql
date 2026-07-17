
-- Explicit default-deny read on feedbacks for anon/authenticated.
-- Insert-only remains allowed by the existing "anon insert feedbacks" policy.
CREATE POLICY "deny select feedbacks anon"
  ON public.feedbacks
  AS RESTRICTIVE
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Belt-and-braces: revoke SELECT privilege at the grant level too.
REVOKE SELECT ON public.feedbacks FROM anon, authenticated;
