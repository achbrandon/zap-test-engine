import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import vaultBankLogo from "@/assets/vaultbank-logo.png";
import { AuthDialog } from "@/components/AuthDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ScheduleMeeting = () => {
  const [isCustomer, setIsCustomer] = useState<string>("");
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (isCustomer === "yes") {
      setShowAuthPrompt(true);
      setTimeout(() => {
        setAuthDialogOpen(true);
      }, 2000);
    } else if (isCustomer === "no") {
      setShowAuthPrompt(true);
    }
  };

  if (showAuthPrompt && isCustomer === "yes") {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl">
          <img src={vaultBankLogo} alt="VaultBank" className="h-24 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-light text-white">
            Sign in now to schedule or update a meeting
          </h1>
        </div>
        <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
      </div>
    );
  }

  if (showAuthPrompt && isCustomer === "no") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-xl w-full space-y-6">
          <div className="flex justify-center mb-8">
            <img src={vaultBankLogo} alt="VaultBank" className="h-16" />
          </div>
          
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Account Required</AlertTitle>
            <AlertDescription>
              You need to have an account with VaultBank to schedule a meeting. Please create an account first.
            </AlertDescription>
          </Alert>

          <div className="flex gap-4">
            <Button 
              onClick={() => navigate("/")} 
              className="flex-1"
            >
              Create Account
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="flex-1"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Exit</span>
          </button>
          <img src={vaultBankLogo} alt="VaultBank" className="h-12" />
          <div className="w-20"></div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute left-0 right-0 h-1 bg-muted rounded-full">
                <div className="h-full bg-primary rounded-full w-1/3"></div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-semibold mb-8">Schedule a meeting</h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl mb-4">Are you a VaultBank customer?</h2>
              <p className="text-muted-foreground mb-6">
                If you are, you'll be redirected to the sign-in screen.
              </p>

              <RadioGroup value={isCustomer} onValueChange={setIsCustomer}>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="text-lg cursor-pointer">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="text-lg cursor-pointer">No</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <Button 
              size="lg" 
              className="w-full max-w-xs"
              onClick={handleNext}
              disabled={!isCustomer}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeeting;
