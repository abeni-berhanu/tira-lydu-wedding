import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Guarded so the app doesn't crash before Supabase env vars are set —
// callers should check `if (!supabase)` before using it.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
