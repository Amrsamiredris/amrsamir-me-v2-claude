import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
  }

  try {
    const { email, role } = await req.json()
    
    // Create a Supabase client with the SERVICE_ROLE_KEY to bypass RLS and invite users
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Invite the user via email
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)

    if (error) throw error

    // Log the user's role in the custom user_roles table
    if (data && data.user) {
      await supabaseAdmin.from('user_roles').insert([
        { user_id: data.user.id, email: email, role: role }
      ])
    }

    return new Response(
      JSON.stringify({ message: 'User invited successfully!', user: data.user }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, status: 200 }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, status: 400 }
    )
  }
})
