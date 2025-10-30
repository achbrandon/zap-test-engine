import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const navigate = useNavigate();

  // Sign In form
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // Sign Up form
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpFullName, setSignUpFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, 'Session:', session);
        
        if (event === 'SIGNED_IN' && session?.user) {
          await handleAuthRedirect(session.user);
        }
      }
    );

    // Check current user
    checkUser();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthRedirect = async (user: any) => {
    try {
      // For testing: Skip verification checks and go straight to dashboard
      toast.success("Signed in successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Redirect error:", error);
      navigate("/dashboard");
    }
  };

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await handleAuthRedirect(user);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        toast.success("Signed in successfully!");
        // The auth state listener will handle the redirect
      }
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (signUpPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Generate QR secret
      const qrSecret = crypto.randomUUID();

      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: {
            full_name: signUpFullName,
          },
          emailRedirectTo: `${window.location.origin}/verify-qr`,
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Create account application
        const { error: appError } = await supabase
          .from("account_applications")
          .insert({
            user_id: data.user.id,
            email: signUpEmail,
            full_name: signUpFullName,
            account_type: "personal",
            qr_code_secret: qrSecret,
            verification_token: data.user.id,
          });

        if (appError) {
          console.error("Error creating application:", appError);
        }

        // Send verification email
        try {
          const { error: emailError } = await supabase.functions.invoke(
            "send-verification-email",
            {
              body: {
                email: signUpEmail,
                fullName: signUpFullName,
                verificationToken: data.user.id,
                qrSecret: qrSecret,
              },
            }
          );

          if (emailError) {
            console.error("Error sending email:", emailError);
            toast.warning("Account created but email sending failed. Please contact support.");
          }
        } catch (emailErr) {
          console.error("Email function error:", emailErr);
        }

        toast.success(
          "Account created! Please check your email for verification instructions including your QR code."
        );

        // Sign out user until they verify
        await supabase.auth.signOut();
        setMode("signin");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-card rounded-2xl p-8 sm:p-12 shadow-xl border">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-8">
          {mode === "signin" ? "Welcome Back" : "Create Account"}
        </h1>

        <Tabs value={mode} onValueChange={(v) => setMode(v as "signin" | "signup")} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-base">
                  Email
                </Label>
                <Input
                  id="signin-email"
                  type="email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-base">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="signin-password"
                    type={showPassword ? "text" : "password"}
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    required
                    className="h-12 text-base pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>

              <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <Link
                to="/token-sign-in"
                className="text-primary font-medium text-sm hover:underline flex items-center justify-center gap-1"
              >
                Use token instead <ChevronRight className="w-4 h-4" />
              </Link>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="signup-name" className="text-base">
                  Full Name
                </Label>
                <Input
                  id="signup-name"
                  type="text"
                  value={signUpFullName}
                  onChange={(e) => setSignUpFullName(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-base">
                  Email
                </Label>
                <Input
                  id="signup-email"
                  type="email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-base">
                  Password
                </Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-base">
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="h-12 text-base"
                />
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Test Account Notice:</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>No email verification required</li>
                  <li>No QR code authentication required</li>
                  <li>Instant access for testing</li>
                </ul>
              </div>

              <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
