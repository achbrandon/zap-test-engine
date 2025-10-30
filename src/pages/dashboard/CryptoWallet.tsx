import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Bitcoin, ArrowDownToLine, ArrowUpFromLine, Copy, Wallet } from "lucide-react";
import { OTPVerificationModal } from "@/components/dashboard/OTPVerificationModal";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CryptoWallet() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<any>(null);
  const [processingTransaction, setProcessingTransaction] = useState(false);
  const [transactionProgress, setTransactionProgress] = useState(0);

  const [depositData, setDepositData] = useState({
    currency: "USDT-TRC20",
    amount: ""
  });

  const [withdrawData, setWithdrawData] = useState({
    walletId: "",
    amount: "",
    destinationAddress: ""
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }
    
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    
    setUser(user);
    setProfile(profileData);
    fetchData(user.id);
  };

  const fetchData = async (userId: string) => {
    try {
      const [walletsRes, accountsRes] = await Promise.all([
        supabase.from("crypto_wallets").select("*").eq("user_id", userId),
        supabase.from("accounts").select("*").eq("user_id", userId).eq("status", "active")
      ]);

      if (walletsRes.data) setWallets(walletsRes.data);
      if (accountsRes.data) setAccounts(accountsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const generateWalletAddress = (currency: string) => {
    // Generate a realistic-looking wallet address based on currency type
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    
    let address = "";
    
    if (currency === "BTC") {
      address = "bc1";
      for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (currency === "ETH" || currency === "USDT-ERC20" || currency === "USDC-ERC20") {
      address = "0x";
      for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (currency === "USDT-TRC20") {
      address = "T";
      for (let i = 0; i < 33; i++) {
        address += upperChars[Math.floor(Math.random() * upperChars.length)];
      }
    } else if (currency === "BNB") {
      address = "bnb";
      for (let i = 0; i < 39; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (currency === "LTC") {
      address = "ltc1";
      for (let i = 0; i < 39; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (currency === "XRP") {
      address = "r";
      for (let i = 0; i < 33; i++) {
        address += upperChars[Math.floor(Math.random() * upperChars.length)];
      }
    } else if (currency === "ADA") {
      address = "addr1";
      for (let i = 0; i < 98; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    } else if (currency === "SOL") {
      for (let i = 0; i < 44; i++) {
        address += upperChars[Math.floor(Math.random() * upperChars.length)];
      }
    } else {
      address = "0x";
      for (let i = 0; i < 40; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    return address;
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setPendingTransaction({
      type: "deposit",
      currency: depositData.currency,
      amount: parseFloat(depositData.amount)
    });
    setShowOTP(true);
  };

  const processDeposit = async () => {
    if (!user || !pendingTransaction) return;

    setProcessingTransaction(true);
    setTransactionProgress(0);

    try {
      // Find or create wallet for this currency
      let wallet = wallets.find(w => w.currency === pendingTransaction.currency);
      
      if (!wallet) {
        const walletAddress = generateWalletAddress(pendingTransaction.currency);
        const { data: newWallet, error } = await supabase
          .from("crypto_wallets")
          .insert({
            user_id: user.id,
            wallet_address: walletAddress,
            wallet_type: pendingTransaction.currency,
            currency: pendingTransaction.currency,
            balance: 0
          })
          .select()
          .single();

        if (error) throw error;
        wallet = newWallet;
      }

      // Simulate processing with progress
      toast.info("Processing your crypto deposit...");
      
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setTransactionProgress(i);
      }

      // Create completed transaction
      if (accounts[0]) {
        await supabase.from("transactions").insert({
          user_id: user.id,
          account_id: accounts[0].id,
          transaction_type: "credit",
          amount: pendingTransaction.amount,
          description: `Crypto Deposit - ${pendingTransaction.currency}`,
          category: "Crypto",
          status: "completed"
        });
      }

      toast.success("Crypto deposit completed successfully!");
      setDepositData({ currency: "BTC", amount: "" });
      fetchData(user.id);
    } catch (error) {
      console.error("Error processing deposit:", error);
      toast.error("Failed to process deposit");
    } finally {
      setProcessingTransaction(false);
      setTransactionProgress(0);
      setPendingTransaction(null);
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const wallet = wallets.find(w => w.id === withdrawData.walletId);
    if (!wallet) {
      toast.error("Wallet not found");
      return;
    }

    const amount = parseFloat(withdrawData.amount);
    if (amount > parseFloat(wallet.balance)) {
      toast.error("Insufficient balance");
      return;
    }

    setPendingTransaction({
      type: "withdrawal",
      currency: wallet.currency,
      amount: amount,
      walletId: withdrawData.walletId,
      destinationAddress: withdrawData.destinationAddress
    });
    setShowOTP(true);
  };

  const processWithdrawal = async () => {
    if (!user || !pendingTransaction) return;

    setProcessingTransaction(true);
    setTransactionProgress(0);

    try {
      toast.info("Processing your crypto withdrawal...");
      
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setTransactionProgress(i);
      }

      // Create completed withdrawal transaction
      if (accounts[0]) {
        await supabase.from("transactions").insert({
          user_id: user.id,
          account_id: accounts[0].id,
          transaction_type: "debit",
          amount: pendingTransaction.amount,
          description: `Crypto Withdrawal - ${pendingTransaction.currency}`,
          category: "Crypto",
          status: "completed"
        });
      }

      toast.success("Withdrawal completed successfully!");
      setWithdrawData({ walletId: "", amount: "", destinationAddress: "" });
      fetchData(user.id);
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast.error("Failed to process withdrawal");
    } finally {
      setProcessingTransaction(false);
      setTransactionProgress(0);
      setPendingTransaction(null);
    }
  };

  const handleOTPVerified = () => {
    setShowOTP(false);
    if (pendingTransaction?.type === "deposit") {
      processDeposit();
    } else {
      processWithdrawal();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          Crypto Wallet
        </h1>
        <p className="text-muted-foreground mt-1">Manage your cryptocurrency deposits and withdrawals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <Card key={wallet.id} className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bitcoin className="h-5 w-5 text-orange-500" />
                  {wallet.currency} Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-2">${parseFloat(wallet.balance || 0).toFixed(2)}</p>
                <div className="text-xs space-y-1">
                  <p className="text-muted-foreground">Wallet Address:</p>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-background/50 p-2 rounded block truncate flex-1">
                      {wallet.wallet_address}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => copyToClipboard(wallet.wallet_address)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="md:col-span-3">
            <CardContent className="pt-6 text-center py-12">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">No crypto wallets yet</p>
              <p className="text-sm text-muted-foreground">Make a deposit to create your first wallet</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="border-2 border-primary/20">
        <CardContent className="pt-6">
          <Tabs defaultValue="deposit">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="deposit" className="flex items-center gap-2">
                <ArrowDownToLine className="h-4 w-4" />
                Deposit
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="flex items-center gap-2">
                <ArrowUpFromLine className="h-4 w-4" />
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabsContent value="deposit" className="space-y-4 mt-6">
              <form onSubmit={handleDeposit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Cryptocurrency</Label>
                  <Select value={depositData.currency} onValueChange={(value) => setDepositData({ ...depositData, currency: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                      <SelectItem value="USDT-TRC20">Tether USDT (TRC-20)</SelectItem>
                      <SelectItem value="USDT-ERC20">Tether USDT (ERC-20)</SelectItem>
                      <SelectItem value="USDC-ERC20">USD Coin (ERC-20)</SelectItem>
                      <SelectItem value="BNB">Binance Coin (BNB)</SelectItem>
                      <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                      <SelectItem value="XRP">Ripple (XRP)</SelectItem>
                      <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                      <SelectItem value="SOL">Solana (SOL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depositAmount">Amount (USD)</Label>
                  <Input
                    id="depositAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={depositData.amount}
                    onChange={(e) => setDepositData({ ...depositData, amount: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <ArrowDownToLine className="h-4 w-4 mr-2" />
                  Initiate Deposit
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="withdraw" className="space-y-4 mt-6">
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="walletId">From Wallet</Label>
                  <Select value={withdrawData.walletId} onValueChange={(value) => setWithdrawData({ ...withdrawData, walletId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select wallet" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallets.map((wallet) => (
                        <SelectItem key={wallet.id} value={wallet.id}>
                          {wallet.currency} - ${parseFloat(wallet.balance || 0).toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdrawAmount">Amount (USD)</Label>
                  <Input
                    id="withdrawAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={withdrawData.amount}
                    onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destinationAddress">Destination Wallet Address</Label>
                  <Input
                    id="destinationAddress"
                    placeholder="Enter wallet address"
                    value={withdrawData.destinationAddress}
                    onChange={(e) => setWithdrawData({ ...withdrawData, destinationAddress: e.target.value })}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                  disabled={wallets.length === 0}
                >
                  <ArrowUpFromLine className="h-4 w-4 mr-2" />
                  Initiate Withdrawal
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Bitcoin className="h-5 w-5 text-primary" />
            Important Information
          </h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• All crypto transactions require OTP verification</li>
            <li>• Deposits typically process within 1-3 business days</li>
            <li>• Network fees may apply for blockchain transactions</li>
            <li>• Always verify wallet addresses before withdrawal</li>
            <li>• OTP verification will be sent to your email for each transaction</li>
          </ul>
        </CardContent>
      </Card>

      <OTPVerificationModal
        open={showOTP}
        onClose={() => {
          setShowOTP(false);
          setPendingTransaction(null);
        }}
        onVerify={handleOTPVerified}
        email={profile?.email || ""}
      />

      {processingTransaction && (
        <Dialog open={true}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Processing Transaction</DialogTitle>
              <DialogDescription>
                Please wait while we process your {pendingTransaction?.type}...
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Progress value={transactionProgress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                {transactionProgress}% Complete
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}