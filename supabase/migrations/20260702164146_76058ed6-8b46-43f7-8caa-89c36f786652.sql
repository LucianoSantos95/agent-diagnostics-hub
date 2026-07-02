
-- 1) Tighten INSERT policies to remove WITH CHECK (true)

DROP POLICY IF EXISTS "anon insert sessions" ON public.diagnostico_sessions;
CREATE POLICY "anon insert sessions" ON public.diagnostico_sessions
  FOR INSERT TO anon
  WITH CHECK (
    id IS NOT NULL
    AND current_step BETWEEN 0 AND 50
    AND (utm_source IS NULL OR char_length(utm_source) <= 200)
    AND (categoria_resultado IS NULL OR char_length(categoria_resultado) <= 100)
    AND completed_at IS NULL
  );

DROP POLICY IF EXISTS "anon insert respostas" ON public.diagnostico_respostas;
CREATE POLICY "anon insert respostas" ON public.diagnostico_respostas
  FOR INSERT TO anon
  WITH CHECK (
    session_id IS NOT NULL
    AND pergunta_numero BETWEEN 1 AND 50
    AND char_length(resposta_valor) BETWEEN 1 AND 2000
  );

DROP POLICY IF EXISTS "anon insert leads" ON public.diagnostico_leads;
CREATE POLICY "anon insert leads" ON public.diagnostico_leads
  FOR INSERT TO anon
  WITH CHECK (
    session_id IS NOT NULL
    AND (nome IS NULL OR char_length(nome) <= 200)
    AND (email IS NULL OR (char_length(email) <= 200 AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
  );

DROP POLICY IF EXISTS "anon insert feedbacks" ON public.feedbacks;
CREATE POLICY "anon insert feedbacks" ON public.feedbacks
  FOR INSERT TO anon
  WITH CHECK (
    char_length(nome) BETWEEN 1 AND 200
    AND char_length(email) BETWEEN 3 AND 200
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(mensagem) BETWEEN 1 AND 5000
  );

-- 2) Lock down SECURITY DEFINER helpers: revoke from public/anon/authenticated, keep service_role.
--    Also pin search_path on the four functions that were missing it.

CREATE OR REPLACE FUNCTION public.move_to_dlq(source_queue text, dlq_name text, message_id bigint, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
DECLARE new_id BIGINT;
BEGIN
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  PERFORM pgmq.delete(source_queue, message_id);
  RETURN new_id;
EXCEPTION WHEN undefined_table THEN
  BEGIN
    PERFORM pgmq.create(dlq_name);
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;
  SELECT pgmq.send(dlq_name, payload) INTO new_id;
  BEGIN
    PERFORM pgmq.delete(source_queue, message_id);
  EXCEPTION WHEN undefined_table THEN
    NULL;
  END;
  RETURN new_id;
END;
$function$;

CREATE OR REPLACE FUNCTION public.delete_email(queue_name text, message_id bigint)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN pgmq.delete(queue_name, message_id);
EXCEPTION WHEN undefined_table THEN
  RETURN FALSE;
END;
$function$;

CREATE OR REPLACE FUNCTION public.read_email_batch(queue_name text, batch_size integer, vt integer)
 RETURNS TABLE(msg_id bigint, read_ct integer, message jsonb)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN QUERY SELECT r.msg_id, r.read_ct, r.message FROM pgmq.read(queue_name, vt, batch_size) r;
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN;
END;
$function$;

CREATE OR REPLACE FUNCTION public.enqueue_email(queue_name text, payload jsonb)
 RETURNS bigint
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  RETURN pgmq.send(queue_name, payload);
EXCEPTION WHEN undefined_table THEN
  PERFORM pgmq.create(queue_name);
  RETURN pgmq.send(queue_name, payload);
END;
$function$;

REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.email_queue_dispatch() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.email_queue_wake() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_dispatch() TO service_role;
GRANT EXECUTE ON FUNCTION public.email_queue_wake() TO service_role;
