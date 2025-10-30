import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Loader2 } from "lucide-react";

interface OTPVerificationModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: () => void;
  email: string;
}

export function OTPVerificationModal({ open, onClose, onVerify, email }: OTPVerificationModalProps) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [correctOtp, setCorrectOtp] = useState("");

  useEffect(() => {
    if (open) {
      // Generate a random 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setCorrectOtp(generatedOtp);
      
      // In a real application, this would be sent via email
      console.log("OTP Code:", generatedOtp);
      toast.info(`OTP sent to ${email}. Check console for demo OTP: ${generatedOtp}`, {
        duration: 10000
      });
    }
  }, [open, email]);

  const handleVerify = () => {
    if (otp === correctOtp) {
      toast.success("OTP verified successfully!");
      onVerify();
    } else {
      toast.error("Invalid OTP code");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verify Transaction
          </DialogTitle>
          <DialogDescription>
            We've sent a verification code to {email}. Please enter it below to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter 6-digit OTP Code</Label>
            <Input
              id="otp"
              type="text"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="text-center text-2xl tracking-widest"
            />
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              For demo purposes, the OTP code is shown in the browser console and in a toast notification.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleVerify} 
            disabled={otp.length !== 6 || loading}
            className="flex-1"
          >
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Verify & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}