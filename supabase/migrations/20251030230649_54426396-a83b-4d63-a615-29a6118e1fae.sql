-- Enable realtime for transactions table
ALTER PUBLICATION supabase_realtime ADD TABLE public.transactions;

-- Add support ticket ratings table
CREATE TABLE IF NOT EXISTS public.support_ratings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for support_ratings
ALTER TABLE public.support_ratings ENABLE ROW LEVEL SECURITY;

-- Policy for users to create ratings for their tickets
CREATE POLICY "Users can create ratings for their tickets"
ON public.support_ratings
FOR INSERT
WITH CHECK (
  auth.uid() = user_id AND 
  EXISTS (
    SELECT 1 FROM support_tickets 
    WHERE id = ticket_id AND user_id = auth.uid()
  )
);

-- Policy for users to view their ratings
CREATE POLICY "Users can view their own ratings"
ON public.support_ratings
FOR SELECT
USING (auth.uid() = user_id);

-- Add chat_mode and agent_online columns to support_tickets if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name='support_tickets' AND column_name='agent_online') 
  THEN
    ALTER TABLE public.support_tickets ADD COLUMN agent_online BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name='support_tickets' AND column_name='user_online') 
  THEN
    ALTER TABLE public.support_tickets ADD COLUMN user_online BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS public.loan_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  loan_amount NUMERIC NOT NULL,
  loan_purpose TEXT NOT NULL,
  interest_rate NUMERIC NOT NULL DEFAULT 5.5,
  loan_term_months INTEGER NOT NULL DEFAULT 60,
  monthly_payment NUMERIC NOT NULL,
  total_interest NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for loan_applications
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;

-- Policies for loan_applications
CREATE POLICY "Users can create their own loan applications"
ON public.loan_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own loan applications"
ON public.loan_applications
FOR SELECT
USING (auth.uid() = user_id);

-- Add file_url column to support_messages for file attachments
ALTER TABLE public.support_messages ADD COLUMN IF NOT EXISTS file_url TEXT;
ALTER TABLE public.support_messages ADD COLUMN IF NOT EXISTS file_name TEXT;

-- Enable realtime for support tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.support_tickets;