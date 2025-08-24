-- Create table for chat messages exchange
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  message_text TEXT NOT NULL,
  is_user BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_read BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is for external webhook)
CREATE POLICY "Allow all access to chat messages" 
ON public.chat_messages 
FOR ALL 
USING (true)
WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id, created_at);
CREATE INDEX idx_chat_messages_unread ON public.chat_messages(session_id, is_read, created_at) WHERE NOT is_read;