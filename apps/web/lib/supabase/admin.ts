import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

import { env, serverEnv } from '@/lib/env'
import type { Database } from '@/lib/supabase/types'

export function getSupabaseServiceRoleClient(): SupabaseClient<Database> {
  return createClient<Database>(env.supabaseUrl(), serverEnv.supabaseServiceRoleKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
