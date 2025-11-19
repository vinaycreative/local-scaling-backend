import { env } from "@/config/env";
import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
  {
    auth: { persistSession: false },
  }
);
