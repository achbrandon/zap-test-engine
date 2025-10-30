-- Add columns for admin management and tracking
ALTER TABLE support_messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;

-- Create user activity tracking table
CREATE TABLE IF NOT EXISTS public.user_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    page_url TEXT NOT NULL,
    ip_address TEXT,
    location JSONB,
    user_agent TEXT,
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- Create global wallet addresses table for admin to manage
CREATE TABLE IF NOT EXISTS public.crypto_deposit_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    currency TEXT NOT NULL UNIQUE,
    wallet_address TEXT NOT NULL,
    network TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.crypto_deposit_addresses ENABLE ROW LEVEL SECURITY;

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    html_content TEXT NOT NULL,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Create email logs table
CREATE TABLE IF NOT EXISTS public.email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_id UUID REFERENCES public.email_templates(id),
    sent_to UUID[] NOT NULL,
    subject TEXT NOT NULL,
    sent_by UUID REFERENCES auth.users(id),
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'sent'
);

ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin access
CREATE POLICY "Admins can view all user activity"
ON public.user_activity FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert their own activity"
ON public.user_activity FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage deposit addresses"
ON public.crypto_deposit_addresses FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "All authenticated users can view deposit addresses"
ON public.crypto_deposit_addresses FOR SELECT
TO authenticated
USING (is_active = TRUE);

CREATE POLICY "Admins can manage email templates"
ON public.email_templates FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view email logs"
ON public.email_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default crypto deposit addresses
INSERT INTO public.crypto_deposit_addresses (currency, wallet_address, network) VALUES
('BTC', 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', 'Bitcoin'),
('ETH', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1', 'Ethereum'),
('USDT-TRC20', 'TXYZabcdefghijklmnopqrstuvwxyz1234', 'Tron TRC-20'),
('USDT-ERC20', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb2', 'Ethereum ERC-20'),
('USDC-ERC20', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb3', 'Ethereum ERC-20'),
('BNB', 'bnb1xy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0w', 'Binance Smart Chain')
ON CONFLICT (currency) DO NOTHING;