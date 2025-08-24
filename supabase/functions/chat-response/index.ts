import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Простое in-memory хранилище сообщений
const messagesStore = new Map<string, Array<{id: string, text: string, timestamp: string}>>()

serve(async (req) => {
  const { method } = req
  const url = new URL(req.url)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  }

  if (method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (method === 'POST') {
      // n8n отправляет ответ сюда
      const body = await req.text()
      const sessionId = url.searchParams.get('session_id')
      
      if (!sessionId) {
        return new Response(JSON.stringify({ error: 'session_id required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // Сохраняем сообщение от n8n
      const message = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: body,
        timestamp: new Date().toISOString()
      }

      if (!messagesStore.has(sessionId)) {
        messagesStore.set(sessionId, [])
      }
      
      messagesStore.get(sessionId)!.push(message)
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (method === 'GET') {
      // Клиент получает новые сообщения
      const sessionId = url.searchParams.get('session_id')
      
      if (!sessionId) {
        return new Response(JSON.stringify({ messages: [] }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      const messages = messagesStore.get(sessionId) || []
      
      // Очищаем сообщения после отправки
      messagesStore.set(sessionId, [])
      
      return new Response(JSON.stringify({ messages }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})