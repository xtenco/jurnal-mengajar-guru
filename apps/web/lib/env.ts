const warnCache = new Set<string>()

type Options = {
  required?: boolean
  fallback?: string
}

function getEnv(name: string, options: Options = {}) {
  const value = process.env[name] ?? options.fallback ?? ''

  if (!value) {
    if (options.required === false) {
      return value
    }

    if (process.env.NODE_ENV === 'production') {
      throw new Error(`[env] Missing environment variable: ${name}`)
    }

    if (!warnCache.has(name)) {
      console.warn(`[env] Missing environment variable: ${name}`)
      warnCache.add(name)
    }
  }

  return value
}

export const env = {
  supabaseUrl: () => getEnv('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: () => getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  appUrl: () =>
    getEnv('NEXT_PUBLIC_APP_URL', { required: false, fallback: 'http://localhost:3000' }),
  clerkPublishableKey: () => getEnv('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY', { required: false }),
}

export const serverEnv = {
  supabaseServiceRoleKey: () => getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  supabaseJwtSecret: () => getEnv('SUPABASE_JWT_SECRET'),
  clerkSecretKey: () => getEnv('CLERK_SECRET_KEY'),
  clerkWebhookSecret: () => getEnv('CLERK_WEBHOOK_SECRET', { required: false }),
}
