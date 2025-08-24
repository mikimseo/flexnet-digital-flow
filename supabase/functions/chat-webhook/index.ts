import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.56.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (req.method === 'POST') {
      // This endpoint receives responses from n8n webhook
      const { session_id, message_text } = await req.json();
      
      console.log('Received n8n response:', { session_id, message_text });

      // Insert bot message into database
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          session_id,
          message_text,
          is_user: false,
        });

      if (error) {
        console.error('Error inserting message:', error);
        throw error;
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (req.method === 'GET') {
      // Get unread messages for a session
      const url = new URL(req.url);
      const sessionId = url.searchParams.get('session_id');
      const lastCheckParam = url.searchParams.get('last_check');
      
      if (!sessionId) {
        throw new Error('session_id is required');
      }

      let query = supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .eq('is_user', false)
        .eq('is_read', false)
        .order('created_at', { ascending: true });

      if (lastCheckParam) {
        query = query.gt('created_at', lastCheckParam);
      }

      const { data: messages, error } = await query;

      if (error) {
        console.error('Error fetching messages:', error);
        throw error;
      }

      // Mark messages as read
      if (messages && messages.length > 0) {
        const messageIds = messages.map(m => m.id);
        await supabase
          .from('chat_messages')
          .update({ is_read: true })
          .in('id', messageIds);
      }

      return new Response(JSON.stringify({ messages: messages || [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response('Method not allowed', { status: 405 });

  } catch (error) {
    console.error('Error in chat-webhook function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});