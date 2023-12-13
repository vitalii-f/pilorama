import { createClient } from "@supabase/supabase-js";
import { Database } from "./interfaces/Supabase.interfaces";

export const supabase = createClient<Database>(import.meta.env.VITE_PROJECT_URL, import.meta.env.VITE_ANON_KEY)