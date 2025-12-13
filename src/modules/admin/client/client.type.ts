import { type Database } from "@/types/supabase"

export type ClientLeadInput = Database["public"]["Tables"]["client_leads"]["Insert"]
export type ClientLead = Database["public"]["Tables"]["client_leads"]["Row"]
