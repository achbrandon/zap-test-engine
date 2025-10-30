-- Create ACH linked accounts table
CREATE TABLE IF NOT EXISTS public.ach_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_name TEXT NOT NULL,
  bank_name TEXT NOT NULL,
  account_number TEXT NOT NULL,
  routing_number TEXT NOT NULL,
  account_type TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ach_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ACH accounts"
ON public.ach_accounts FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ACH accounts"
ON public.ach_accounts FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ACH accounts"
ON public.ach_accounts FOR UPDATE
USING (auth.uid() = user_id);

-- Create card applications table
CREATE TABLE IF NOT EXISTS public.card_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL,
  annual_income NUMERIC,
  employment_status TEXT,
  requested_credit_limit NUMERIC,
  application_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.card_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own card applications"
ON public.card_applications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own card applications"
ON public.card_applications FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Update crypto_wallets table to add wallet address for each user
ALTER TABLE public.crypto_wallets 
ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'BTC';

-- Create account details table for IBAN and banking info
CREATE TABLE IF NOT EXISTS public.account_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  iban TEXT NOT NULL,
  swift_code TEXT NOT NULL,
  branch_code TEXT,
  bank_address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(account_id)
);

-- Enable RLS
ALTER TABLE public.account_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own account details"
ON public.account_details FOR SELECT
USING (auth.uid() = user_id);

-- Create transfer recipients table for auto-transfer
CREATE TABLE IF NOT EXISTS public.transfer_recipients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name TEXT NOT NULL,
  recipient_account TEXT NOT NULL,
  recipient_bank TEXT NOT NULL,
  recipient_type TEXT NOT NULL,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, recipient_account)
);

-- Enable RLS
ALTER TABLE public.transfer_recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own recipients"
ON public.transfer_recipients FOR ALL
USING (auth.uid() = user_id);

-- Create OTP codes table
CREATE TABLE IF NOT EXISTS public.otp_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  transaction_id UUID,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own OTP codes"
ON public.otp_codes FOR SELECT
USING (auth.uid() = user_id);

-- Add support chat mode to support_tickets
ALTER TABLE public.support_tickets
ADD COLUMN IF NOT EXISTS chat_mode TEXT DEFAULT 'bot';

-- Add trigger for updated_at
CREATE TRIGGER update_ach_accounts_updated_at
BEFORE UPDATE ON public.ach_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_card_applications_updated_at
BEFORE UPDATE ON public.card_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();