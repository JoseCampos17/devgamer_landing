import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cthymsucsgmcmuqacrsp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aHltc3Vjc2dtY211cWFjcnNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQzNDMsImV4cCI6MjA5NDA5MDM0M30.51hhLmlZaleUORV_FGMXuTUK6EERCyl07lFB06TbYyU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
