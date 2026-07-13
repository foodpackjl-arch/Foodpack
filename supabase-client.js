// Cliente compartido de Supabase para FoodPack J.L.
// Importante: aqui solo se usa la clave publica (publishable/anon).
// La clave secreta (service role) NUNCA debe usarse en el navegador.
const SUPABASE_URL = "https://vfspninncrmvsbjzygnm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_xfOz5c2O9YFezzUSZKbI3Q_nWT6EnLN";

var supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function usernameToEmailFP(username) {
return username.trim().toLowerCase().replace(/[^a-z0-9]/g, "") + "@panel.foodpackjl.com";
}
