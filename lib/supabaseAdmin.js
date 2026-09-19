import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// SERVER-ONLY. The service role key bypasses Row Level Security entirely.
// Only ever import this file from Route Handlers (app/api/**/route.js),
// never from a Client Component or anything shipped to the browser.
export const supabaseAdmin =
  url && serviceKey
    ? createClient(url, serviceKey, { auth: { persistSession: false } })
    : null;
