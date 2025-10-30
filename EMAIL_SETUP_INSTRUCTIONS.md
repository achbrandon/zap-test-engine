# Email Verification Setup Instructions

## Overview
Your VaultBank application now has a complete email verification system with QR code authentication. Here's what has been set up:

## What's Implemented

### 1. Database Structure
- **account_applications** table: Stores user application details, verification tokens, and QR secrets
- **profiles** table: Stores user profile data including verification status
- Automatic triggers to create profiles when users sign up

### 2. Authentication Flow
- Users must verify their email before signing in
- QR code authentication is required before any transactions
- Account applications are reviewed within 2-3 business days

### 3. Edge Function
- `send-verification-email` function sends beautiful HTML emails with:
  - Email verification link
  - QR code for two-factor authentication
  - Security instructions
  - Professional VaultBank branding

## How to Add Your Email API Key

### Step 1: Get Your Resend API Key
1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (or log in)
3. Verify your email domain at [https://resend.com/domains](https://resend.com/domains)
4. Create an API key at [https://resend.com/api-keys](https://resend.com/api-keys)
5. Copy your API key

### Step 2: Add the Secret to Lovable Cloud
1. In your Lovable project, open the Backend dashboard:
   - Click the "Backend" button in your project
2. Navigate to "Secrets" or "Environment Variables"
3. Add a new secret:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Paste your Resend API key
4. Save the secret

### Step 3: Test the System
1. Try creating a new account at `/auth`
2. Check your email for the verification message
3. Click the verification link in the email
4. Save the QR code or secret key
5. Log in with your credentials
6. Complete QR verification at `/verify-qr`

## Security Features

### Email Verification
- Users cannot sign in until they verify their email
- Verification emails include a secure token
- Automatic profile creation on signup

### QR Code Authentication
- Unique QR code generated for each user
- Must be verified before any transactions
- Secret key stored securely in database
- Prevents unauthorized access even with stolen credentials

### Account Protection
- Users are automatically signed out after registration until verification
- Email and QR verification both required
- Profile flags prevent transactions until fully verified

## User Flow

1. **Sign Up** (`/auth`)
   - User enters full name, email, and password
   - System creates account and sends verification email
   - User is signed out automatically

2. **Email Verification**
   - User receives email with verification link and QR code
   - User clicks verification link
   - Email is marked as verified

3. **Sign In** (`/auth`)
   - User enters email and password
   - System checks email verification status
   - If email not verified, sign-in is blocked

4. **QR Verification** (`/verify-qr`)
   - User is redirected to QR verification page
   - User enters the secret key from email
   - System verifies the QR code
   - User profile is updated to allow transactions

5. **Access Granted**
   - User can now access all features
   - Transactions are enabled
   - Full account access

## Important Notes

### Without API Key
- The system is fully set up but emails won't send without the API key
- Users can still sign up but won't receive verification emails
- You'll see a friendly message: "Email service not configured"

### With API Key
- Emails send automatically on signup
- Professional HTML emails with QR codes
- Secure verification links

### Testing in Development
- For testing, you can manually verify users in the database:
  ```sql
  UPDATE profiles 
  SET email_verified = true, qr_verified = true, can_transact = true 
  WHERE email = 'test@example.com';
  ```

## Email Customization

The verification email includes:
- VaultBank branding with gradient headers
- Clear verification timeline (2-3 business days)
- QR code as embedded image
- Secret key as text backup
- Security warnings and instructions
- Professional footer

To customize the email design, edit:
`supabase/functions/send-verification-email/index.ts`

## Support

If you encounter any issues:
1. Check that your Resend domain is verified
2. Verify the API key is correct
3. Check the edge function logs for errors
4. Ensure database tables were created correctly

## Next Steps

1. Add your Resend API key (see Step 2 above)
2. Test the complete flow with a real email
3. Customize the email template if desired
4. Set up custom domain for professional emails (optional)
5. Configure email sending limits in Resend dashboard

---

**Your VaultBank application now has bank-grade security with email and QR verification! 🔐**
