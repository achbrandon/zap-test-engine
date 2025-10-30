import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";

const TokenSignIn = () => {
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Token validation logic will go here
    console.log("Token submitted:", token);
  };

  return (
    <div className="min-h-screen bg-[hsl(210,100%,50%)] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-12 shadow-xl">
        <h1 className="text-5xl font-bold text-foreground mb-4">Use Token</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Please enter your verification token to access your account
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Input 
              id="token" 
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your token"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12"
            />
          </div>

          <Button 
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)]"
          >
            Submit
          </Button>

          <Link 
            to="/auth" 
            className="text-[hsl(210,100%,50%)] font-semibold text-base hover:underline flex items-center gap-1 justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default TokenSignIn;
