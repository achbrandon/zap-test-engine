import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/vaultbank-logo.png";
import bgImage from "@/assets/banking-hero.jpg";

const TokenSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Show loading spinner for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        toast.error(error.message);
        setSubmitting(false);
        return;
      }

      if (data.user) {
        // Special case: bypass verification for test account
        if (data.user.email === 'ambaheu@gmail.com') {
          toast.success("Signed in successfully! (Test Account)");
          navigate("/dashboard");
          return;
        }

        // For all other users: enforce strict verification
        if (!data.user.email_confirmed_at) {
          toast.error("Please verify your email before signing in");
          await supabase.auth.signOut();
          setSubmitting(false);
          return;
        }

        // Check if QR is verified
        const { data: profile } = await supabase
          .from("profiles")
          .select("qr_verified")
          .eq("id", data.user.id)
          .single();

        if (!profile?.qr_verified) {
          toast.info("Please complete QR verification");
          navigate("/verify-qr");
        } else {
          toast.success("Signed in successfully!");
          navigate("/dashboard");
        }
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(210,100%,50%)] flex items-center justify-center">
        <div className="text-center">
          <img 
            src={logo} 
            alt="VaultBank" 
            className="w-32 h-32 mx-auto mb-8 animate-spin"
            style={{ animationDuration: '2s' }}
          />
          <p className="text-white text-xl font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-sm rounded-2xl p-12 shadow-xl relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <img src={logo} alt="VaultBank" className="w-16 h-16" />
          <h1 className="text-4xl font-bold text-foreground">VaultBank</h1>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-4">Token Sign In</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Please enter your credentials and verification token
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-base font-normal text-muted-foreground">
              Username
            </Label>
            <Input 
              id="username" 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-normal text-muted-foreground">
              Password
            </Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[hsl(210,100%,50%)] font-semibold text-base hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="token" className="text-base font-normal text-muted-foreground">
              Token
            </Label>
            <Input 
              id="token" 
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your verification token"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12"
            />
          </div>

          <Button 
            type="submit"
            disabled={submitting}
            className="w-full h-14 text-lg font-semibold bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)] mt-8"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>

          <Link 
            to="/auth" 
            className="text-[hsl(210,100%,50%)] font-semibold text-base hover:underline flex items-center gap-1 justify-center mt-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </form>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          © 2025 VaultBank. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TokenSignIn;
