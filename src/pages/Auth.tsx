import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(210,100%,50%)] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-12 shadow-xl">
        <h1 className="text-5xl font-bold text-foreground mb-12">Welcome</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-lg font-normal text-muted-foreground">
              Username
            </Label>
            <Input 
              id="username" 
              type="text"
              className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-lg font-normal text-muted-foreground">
              Password
            </Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg h-12 pr-16"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[hsl(210,100%,50%)] font-semibold text-lg hover:underline"
              >
                Show
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-base text-foreground cursor-pointer">
                Remember me
              </label>
            </div>
            <Link 
              to="/token-signin" 
              className="text-[hsl(210,100%,50%)] font-semibold text-base hover:underline flex items-center gap-1"
            >
              Use token <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-start gap-4 pt-4">
            <Button 
              className="h-14 text-lg font-semibold flex-1 bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)]"
            >
              Sign in
            </Button>
            
            <div className="flex flex-col gap-2 justify-center">
              <Link 
                to="/open-account" 
                className="text-[hsl(210,100%,50%)] font-semibold text-base hover:underline flex items-center gap-1 whitespace-nowrap"
              >
                Forgot username/password <ChevronRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/open-account" 
                className="text-[hsl(210,100%,50%)] font-semibold text-base hover:underline flex items-center gap-1 whitespace-nowrap"
              >
                Not Enrolled? Sign Up Now. <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
