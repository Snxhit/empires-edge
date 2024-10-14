import { createClient } from "@supabase/supabase-js";

const dbUrl = import.meta.env.VITE_DATABASE_URL;
const dbKey = import.meta.env.VITE_DATABASE_KEY;

export const supabase = createClient(dbUrl, dbKey, {
    global: {
        headers: {
          Origin: 'https://snxhit.github.io'
        }
      }
})