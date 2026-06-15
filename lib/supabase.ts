import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import 'expo-sqlite/localStorage/install';

const supabaseUrl = "https://xmyrzazlamjjcmzmkajv.supabase.co"
const supabasePublishableKey = "sb_publishable_CjCoZMWbJUXl2_gXTIaOZA_R81UYD6Z"

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})