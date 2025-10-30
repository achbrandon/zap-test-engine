-- Create bill_payments table
CREATE TABLE public.bill_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  payee_name TEXT NOT NULL,
  payee_account TEXT,
  payee_address TEXT,
  amount NUMERIC NOT NULL,
  payment_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bill_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own bill payments"
  ON public.bill_payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bill payments"
  ON public.bill_payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bill payments"
  ON public.bill_payments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bill payments"
  ON public.bill_payments FOR DELETE
  USING (auth.uid() = user_id);

-- Create mobile_deposits table
CREATE TABLE public.mobile_deposits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  check_front_url TEXT,
  check_back_url TEXT,
  amount NUMERIC NOT NULL,
  check_number TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  deposit_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  cleared_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mobile_deposits ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own mobile deposits"
  ON public.mobile_deposits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own mobile deposits"
  ON public.mobile_deposits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create cards table
CREATE TABLE public.cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  card_number TEXT NOT NULL,
  card_type TEXT NOT NULL,
  card_status TEXT NOT NULL DEFAULT 'active',
  expiry_date TEXT NOT NULL,
  cvv TEXT NOT NULL,
  is_locked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own cards"
  ON public.cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own cards"
  ON public.cards FOR UPDATE
  USING (auth.uid() = user_id);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  alert_title TEXT NOT NULL,
  alert_message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own alerts"
  ON public.alerts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own alerts"
  ON public.alerts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own alerts"
  ON public.alerts FOR DELETE
  USING (auth.uid() = user_id);

-- Create credit_scores table
CREATE TABLE public.credit_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  score_date DATE NOT NULL DEFAULT CURRENT_DATE,
  provider TEXT NOT NULL DEFAULT 'Experian',
  factors JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.credit_scores ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own credit scores"
  ON public.credit_scores FOR SELECT
  USING (auth.uid() = user_id);

-- Create loans table
CREATE TABLE public.loans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  loan_type TEXT NOT NULL,
  loan_amount NUMERIC NOT NULL,
  outstanding_balance NUMERIC NOT NULL,
  interest_rate NUMERIC NOT NULL,
  monthly_payment NUMERIC NOT NULL,
  next_due_date DATE NOT NULL,
  loan_status TEXT NOT NULL DEFAULT 'active',
  origination_date DATE NOT NULL,
  maturity_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.loans ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own loans"
  ON public.loans FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own loans"
  ON public.loans FOR UPDATE
  USING (auth.uid() = user_id);

-- Create statements table
CREATE TABLE public.statements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  statement_date DATE NOT NULL,
  statement_period TEXT NOT NULL,
  statement_url TEXT,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.statements ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own statements"
  ON public.statements FOR SELECT
  USING (auth.uid() = user_id);

-- Create offers table
CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  offer_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  value TEXT,
  expiry_date DATE,
  is_claimed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own offers"
  ON public.offers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own offers"
  ON public.offers FOR UPDATE
  USING (auth.uid() = user_id);

-- Add trigger for updated_at columns
CREATE TRIGGER update_bill_payments_updated_at
  BEFORE UPDATE ON public.bill_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON public.cards
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loans_updated_at
  BEFORE UPDATE ON public.loans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();