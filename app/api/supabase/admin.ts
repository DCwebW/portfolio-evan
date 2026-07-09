import { createClient } from '@supabase/supabase-js'

// Client Supabase avec la clé service_role : ne doit jamais être importé
// depuis un composant client, uniquement depuis des Route Handlers /
// Server Components. Il contourne la RLS, donc réservé au back office.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
