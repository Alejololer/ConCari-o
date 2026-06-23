export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// When false, the app runs on the bundled seed catalogue (no DB, no auth).
// Set both env vars (see .env.example) to switch to Supabase.
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
