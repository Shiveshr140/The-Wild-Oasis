import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fgaiufdkufonrcaudzlm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnYWl1ZmRrdWZvbnJjYXVkemxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0OTc4NzYsImV4cCI6MjA0NDA3Mzg3Nn0.769M5tsyEtBh-eH8wl7LDs5v-E7zenY7roY-6J_WEwc";
const supabase = createClient(supabaseUrl, supabaseKey);

// So here we have our supabase url. Then here we will need to place our supabase key. And finally we create a supabase client based on these two informations. And then we can export that from here.
// So let's say export default, supabase, and then in some other file we can import this supabase client and start querying.
// And so now let's actually grab our supabase key from here and place it into that file. So that's here in the project settings and under api. So here we have our URL again, and then here that anon key.
// And so as I said in the last lecture, also this key is safe to use in a browser if we enabled row level security. So let's copy this and let's replace it right here.
// So again, you might be wondering that if we are exposing our supabase key on the client, that then some malicious user might be able to hack our database.
// And the answer Would actually be true if we didn't activate row level security.

export default supabase;
