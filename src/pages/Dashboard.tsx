import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Wallet, 
  Send, 
  Receipt, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  TrendingUp,
  Plus,
  Eye,
  EyeOff
} from "lucide-react";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { TransactionsList } from "@/components/dashboard/TransactionsList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { SpendingInsights } from "@/components/dashboard/SpendingInsights";
import { SupportChat } from "@/components/dashboard/SupportChat";
import logo from "@/assets/vaultbank-logo.png";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBalances, setShowBalances] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to access your dashboard");
      navigate("/auth");
      return;
    }

    setUser(user);

    // Check verification status
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!profile?.email_verified) {
      toast.error("Please verify your email first");
      await supabase.auth.signOut();
      navigate("/auth");
      return;
    }

    if (!profile?.qr_verified) {
      toast.info("Please complete QR verification");
      navigate("/verify-qr");
      return;
    }

    setProfile(profile);
  };

  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("created_at", { ascending: true });

      if (accountsError) {
        console.error("Error fetching accounts:", accountsError);
      } else {
        setAccounts(accountsData || []);
      }

      // Fetch recent transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false })
        .limit(10);

      if (transactionsError) {
        console.error("Error fetching transactions:", transactionsError);
      } else {
        setTransactions(transactionsData || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNetWorth = () => {
    return accounts.reduce((sum, account) => {
      if (account.account_type === 'credit_card' || account.account_type === 'loan') {
        return sum - parseFloat(account.balance || 0);
      }
      return sum + parseFloat(account.balance || 0);
    }, 0);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <img src={logo} alt="VaultBank" className="h-8" />
              <nav className="hidden md:flex items-center gap-6">
                <Button variant="ghost" className="text-sm">Accounts</Button>
                <Button variant="ghost" className="text-sm">Transfers</Button>
                <Button variant="ghost" className="text-sm">Pay Bills</Button>
                <Button variant="ghost" className="text-sm">Crypto</Button>
              </nav>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowChat(true)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/settings")}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {profile?.full_name}
              </h1>
              <p className="text-muted-foreground">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalances(!showBalances)}
            >
              {showBalances ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Net Worth */}
        <Card className="p-6 mb-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 mb-1">NET WORTH</p>
              <h2 className="text-4xl font-bold">
                {showBalances ? `$${calculateNetWorth().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
              </h2>
              <p className="text-sm opacity-80 mt-2">
                Based on {accounts.length} account{accounts.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Wallet className="h-16 w-16 opacity-20" />
          </div>
        </Card>

        {/* Quick Actions */}
        <QuickActions onAction={fetchData} />

        {/* Accounts Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Your Accounts</h2>
            <Button size="sm" onClick={() => navigate("/open-account")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Account
            </Button>
          </div>
          
          {accounts.length === 0 ? (
            <Card className="p-8 text-center">
              <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No accounts yet</h3>
              <p className="text-muted-foreground mb-4">Open your first account to get started</p>
              <Button onClick={() => navigate("/open-account")}>
                Open Account
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  showBalance={showBalances}
                  onRefresh={fetchData}
                />
              ))}
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transactions - 2/3 width */}
          <div className="lg:col-span-2">
            <TransactionsList 
              transactions={transactions}
              onRefresh={fetchData}
            />
          </div>

          {/* Insights - 1/3 width */}
          <div className="space-y-6">
            <SpendingInsights userId={user?.id} />
            
            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/crypto")}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Crypto Wallet
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Receipt className="h-4 w-4 mr-2" />
                  Statements
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Investments
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setShowChat(true)}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Support Chat Modal */}
      {showChat && (
        <SupportChat
          userId={user?.id}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
