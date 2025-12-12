import { Database } from "@/types/supabase";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !serviceKey || !anonKey) {
  throw new Error("Missing Supabase credentials in .env file");
}

try {
  const part = serviceKey.split(".")[1];
  if (part) {
    const payload = JSON.parse(Buffer.from(part, "base64").toString());
    if (payload.role !== "service_role") {
      console.error(
        "\n[CRITICAL WARNING] ---------------------------------------------------"
      );
      console.error(
        "The SUPABASE_SERVICE_ROLE_KEY in .env is actually an 'anon' key!"
      );
      console.error("This is why you are getting RLS errors.");
      console.error(
        "Please go to Supabase Dashboard > Settings > API and copy the 'service_role' secret."
      );
      console.error(
        "----------------------------------------------------------------------\n"
      );
    } else {
      console.log("✅ SUPABASE_SERVICE_ROLE_KEY verified as 'service_role'.");
    }
  }
} catch (e) {
  console.warn("Could not validate Service Key format.");
}
// -------------------

export const supabaseAdmin = createClient(supabaseUrl, serviceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export const createUserClient = (accessToken: string) => {
  return createClient(supabaseUrl, anonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    auth: {
      persistSession: false,
    },
  });
};

export const db = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  {
    auth: { persistSession: false },
  }
)

