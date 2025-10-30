import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Building2, Globe, CreditCard, Shield } from "lucide-react";

export default function AccountDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [accountDetails, setAccountDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  const generateIBAN = (country: string, accountNumber: string) => {
    // Generate realistic-looking IBAN
    const bankCode = "VAULT";
    const branchCode = accountNumber.slice(0, 6);
    const account = accountNumber.slice(-10).padStart(10, '0');
    return `${country}29${bankCode}${branchCode}${account}`;
  };

  const generateSWIFT = () => {
    return "VAULTUS33XXX";
  };

  const fetchData = async (userId: string) => {
    try {
      const [profileRes, accountsRes, detailsRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).single(),
        supabase.from("accounts").select("*").eq("user_id", userId).eq("status", "active"),
        supabase.from("account_details").select("*").eq("user_id", userId)
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (accountsRes.data) {
        setAccounts(accountsRes.data);
        
        // Generate details for accounts that don't have them
        const existingDetails = detailsRes.data || [];
        setAccountDetails(existingDetails);
        
        for (const account of accountsRes.data) {
          const hasDetails = existingDetails.some(d => d.account_id === account.id);
          if (!hasDetails) {
            // Create account details
            const iban = generateIBAN("US", account.account_number);
            const swift = generateSWIFT();
            
            await supabase.from("account_details").insert({
              account_id: account.id,
              user_id: userId,
              iban: iban,
              swift_code: swift,
              branch_code: account.routing_number.slice(0, 6),
              bank_address: "270 Park Avenue, New York, NY 10017, USA"
            });
          }
        }
        
        // Refetch details
        const { data: updatedDetails } = await supabase
          .from("account_details")
          .select("*")
          .eq("user_id", userId);
        
        if (updatedDetails) setAccountDetails(updatedDetails);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load account details");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Account Details & Banking Information
        </h1>
        <p className="text-muted-foreground mt-1">Complete banking details for all your accounts</p>
      </div>

      {accounts.map((account) => {
        const details = accountDetails.find(d => d.account_id === account.id);
        if (!details) return null;

        return (
          <Card key={account.id} className="border-2 border-primary/20 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">Account Name</p>
                  <h2 className="text-2xl font-bold">{account.account_name}</h2>
                  <p className="text-sm opacity-80 mt-2">{account.account_type}</p>
                </div>
                <Building2 className="h-12 w-12 opacity-30" />
              </div>
            </div>

            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-primary" />}
                  label="Account Holder Name"
                  value={profile?.full_name || ""}
                  onCopy={() => copyToClipboard(profile?.full_name || "", "Name")}
                />

                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-primary" />}
                  label="Account Number"
                  value={account.account_number.padStart(12, '0')}
                  onCopy={() => copyToClipboard(account.account_number.padStart(12, '0'), "Account Number")}
                />

                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-primary" />}
                  label="Routing Number (ABA)"
                  value={account.routing_number}
                  onCopy={() => copyToClipboard(account.routing_number, "Routing Number")}
                />

                <DetailItem
                  icon={<Building2 className="h-5 w-5 text-primary" />}
                  label="Bank Name"
                  value="VaultBank Financial, N.A."
                  onCopy={() => copyToClipboard("VaultBank Financial, N.A.", "Bank Name")}
                />

                <DetailItem
                  icon={<Globe className="h-5 w-5 text-primary" />}
                  label="Bank Address"
                  value={details.bank_address}
                  onCopy={() => copyToClipboard(details.bank_address, "Bank Address")}
                  fullWidth
                />

                <DetailItem
                  icon={<Globe className="h-5 w-5 text-primary" />}
                  label="SWIFT/BIC Code"
                  value={details.swift_code}
                  onCopy={() => copyToClipboard(details.swift_code, "SWIFT Code")}
                />

                <DetailItem
                  icon={<Building2 className="h-5 w-5 text-primary" />}
                  label="Branch Code"
                  value={details.branch_code || "N/A"}
                  onCopy={() => copyToClipboard(details.branch_code || "", "Branch Code")}
                />

                <DetailItem
                  icon={<CreditCard className="h-5 w-5 text-primary" />}
                  label="Currency Type"
                  value={account.currency}
                  onCopy={() => copyToClipboard(account.currency, "Currency")}
                />

                <DetailItem
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  label="Account Type"
                  value={account.account_type.replace('_', ' ').toUpperCase()}
                  onCopy={() => copyToClipboard(account.account_type, "Account Type")}
                />
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Important Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use these details for receiving domestic and international wire transfers</li>
                <li>• Your account number is 12 digits for all VaultBank accounts</li>
                <li>• SWIFT code is necessary for all international wire transfers</li>
                <li>• Keep your account details secure and never share them publicly</li>
                <li>• Contact support if you notice any unauthorized transactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({ 
  icon, 
  label, 
  value, 
  onCopy, 
  fullWidth = false 
}: { 
  icon: React.ReactNode;
  label: string;
  value: string;
  onCopy: () => void;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 p-3 bg-muted/50 rounded-lg font-mono text-sm break-all">
          {value}
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={onCopy}
          className="flex-shrink-0"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}