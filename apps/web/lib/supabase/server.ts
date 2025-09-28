import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

import { env } from '@/lib/env'
import type { Database } from '@/lib/supabase/types'

let serverClient: SupabaseClient<Database> | undefined

export function getSupabaseServerClient() {
  if (!serverClient) {
    serverClient = createClient<Database>(env.supabaseUrl(), env.supabaseAnonKey(), {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }

  return serverClient
}
