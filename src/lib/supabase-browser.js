import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client for browser use
// Use process.env for Create React App environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 