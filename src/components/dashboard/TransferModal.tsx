import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TransferModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function TransferModal({ onClose, onSuccess }: TransferModalProps) {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (error) {
      console.error("Error fetching accounts:", error);
    } else {
      setAccounts(data || []);
    }
  };

  const handleTransfer = async () => {
    if (!fromAccount || !toAccount || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (fromAccount === toAccount) {
      toast.error("Cannot transfer to the same account");
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Create transfer record
      const { error: transferError } = await supabase
        .from("transfers")
        .insert({
          user_id: user.id,
          from_account_id: fromAccount,
          to_account_id: toAccount,
          amount: transferAmount,
          transfer_type: "internal",
          status: "completed",
          notes: notes || null,
          completed_date: new Date().toISOString()
        });

      if (transferError) throw transferError;

      toast.success("Transfer completed successfully!");
      onSuccess();
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error(error.message || "Failed to complete transfer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Money</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name} - ${parseFloat(account.available_balance).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-account">To Account</Label>
            <Select value={toAccount} onValueChange={setToAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Add a note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleTransfer} disabled={loading} className="flex-1">
            {loading ? "Processing..." : "Transfer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
