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

export default function CryptoWallet() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [depositData, setDepositData] = useState({
    currency: "BTC",
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
    setUser(user);
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
    // Generate a realistic-looking wallet address
    const prefix = currency === "BTC" ? "bc1" : currency === "ETH" ? "0x" : "LTC";
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let address = prefix;
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Find or create wallet for this currency
      let wallet = wallets.find(w => w.currency === depositData.currency);
      
      if (!wallet) {
        const walletAddress = generateWalletAddress(depositData.currency);
        const { data: newWallet, error } = await supabase
          .from("crypto_wallets")
          .insert({
            user_id: user.id,
            wallet_address: walletAddress,
            wallet_type: depositData.currency,
            currency: depositData.currency,
            balance: 0
          })
          .select()
          .single();

        if (error) throw error;
        wallet = newWallet;
      }

      // Create pending transaction
      if (accounts[0]) {
        await supabase.from("transactions").insert({
          user_id: user.id,
          account_id: accounts[0].id,
          transaction_type: "credit",
          amount: parseFloat(depositData.amount),
          description: `Crypto Deposit - ${depositData.currency}`,
          category: "Crypto",
          status: "pending"
        });
      }

      toast.success("Crypto deposit initiated! Awaiting confirmation.");
      setDepositData({ currency: "BTC", amount: "" });
      fetchData(user.id);
    } catch (error) {
      console.error("Error initiating deposit:", error);
      toast.error("Failed to initiate deposit");
    }
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const wallet = wallets.find(w => w.id === withdrawData.walletId);
      if (!wallet) throw new Error("Wallet not found");

      const amount = parseFloat(withdrawData.amount);
      if (amount > parseFloat(wallet.balance)) {
        toast.error("Insufficient balance");
        return;
      }

      // Create pending withdrawal transaction
      if (accounts[0]) {
        await supabase.from("transactions").insert({
          user_id: user.id,
          account_id: accounts[0].id,
          transaction_type: "debit",
          amount: amount,
          description: `Crypto Withdrawal - ${wallet.currency}`,
          category: "Crypto",
          status: "pending"
        });
      }

      toast.success("Withdrawal initiated! Awaiting confirmation.");
      setWithdrawData({ walletId: "", amount: "", destinationAddress: "" });
    } catch (error) {
      console.error("Error initiating withdrawal:", error);
      toast.error("Failed to initiate withdrawal");
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
                      <SelectItem value="LTC">Litecoin (LTC)</SelectItem>
                      <SelectItem value="USDT">Tether (USDT)</SelectItem>
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
            <li>• All crypto transactions require admin approval</li>
            <li>• Deposits typically process within 1-3 business days</li>
            <li>• Network fees may apply for blockchain transactions</li>
            <li>• Always verify wallet addresses before withdrawal</li>
            <li>• OTP verification will be sent to your email for each transaction</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}