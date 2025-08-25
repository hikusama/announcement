
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xqqwrdmvqmjrrlckfimb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_8NBUW6PHpnA1skDH_gT8hQ_BET-amhH";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
