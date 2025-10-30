import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setFocusedField(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white p-8 sm:rounded-2xl animate-scale-in border-0 shadow-2xl">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-8 tracking-tight">Welcome</h1>
          
          <div className="space-y-5">
            <div className="space-y-1.5 group">
              <Label 
                htmlFor="username" 
                className={`text-sm font-normal transition-colors duration-300 ${
                  focusedField === 'username' || username ? 'text-[hsl(210,100%,50%)]' : 'text-muted-foreground'
                }`}
              >
                Username
              </Label>
              <Input 
                id="username" 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-[hsl(210,100%,50%)] text-base h-10 transition-all duration-300 bg-transparent"
              />
            </div>

            <div className="space-y-1.5 group">
              <Label 
                htmlFor="password" 
                className={`text-sm font-normal transition-colors duration-300 ${
                  focusedField === 'password' || password ? 'text-[hsl(210,100%,50%)]' : 'text-muted-foreground'
                }`}
              >
                Password
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  className="border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-[hsl(210,100%,50%)] text-base h-10 pr-14 transition-all duration-300 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[hsl(210,100%,50%)] font-semibold text-sm hover:scale-105 transition-transform duration-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center space-x-2 group">
                <Checkbox id="remember" className="transition-transform duration-200 hover:scale-110" />
                <label htmlFor="remember" className="text-sm text-foreground cursor-pointer hover:text-[hsl(210,100%,50%)] transition-colors duration-200">
                  Remember me
                </label>
              </div>
              <Link 
                to="/open-account" 
                className="text-[hsl(210,100%,50%)] font-semibold text-sm hover:underline flex items-center gap-1 hover-scale transition-all duration-200"
                onClick={() => onOpenChange(false)}
              >
                Use token <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex items-start gap-3 pt-3">
              <Button 
                className="h-12 text-base font-semibold flex-1 bg-[hsl(210,100%,50%)] hover:bg-[hsl(210,100%,45%)] hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95"
              >
                Sign in
              </Button>
              
              <div className="flex flex-col gap-1.5 justify-center">
                <Link 
                  to="/open-account" 
                  className="text-[hsl(210,100%,50%)] font-semibold text-xs hover:underline flex items-center gap-1 whitespace-nowrap group transition-all duration-200"
                  onClick={() => onOpenChange(false)}
                >
                  Forgot username/password <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link 
                  to="/open-account" 
                  className="text-[hsl(210,100%,50%)] font-semibold text-xs hover:underline flex items-center gap-1 whitespace-nowrap group transition-all duration-200"
                  onClick={() => onOpenChange(false)}
                >
                  Not Enrolled? Sign Up Now. <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
