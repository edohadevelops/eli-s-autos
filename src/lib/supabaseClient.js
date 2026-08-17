import { createClient } from "@supabase/supabase-js";

// Phase 1 note: this app currently runs on fake data (see src/data/fakeData.js).
// This client is wired up so that swapping fake data for real Supabase tables
// later is a matter of writing queries here, not restructuring the app.
//
// Once you have a real Supabase project:
// 1. Copy .env.example to .env.local
// 2. Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from your project settings
// 3. Never expose the service_role key in frontend code. Use the anon key + row level
//    security (RLS) policies is the correct pattern for a client-side app.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export const isSupabaseConfigured = Boolean(supabase);
