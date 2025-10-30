import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FileText, Plus, Calendar, DollarSign } from "lucide-react";

export default function BillPay() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    accountId: "",
    payeeName: "",
    payeeAccount: "",
    amount: "",
    paymentDate: "",
    isRecurring: false,
    recurringFrequency: "",
    notes: "",
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
      const [accountsRes, paymentsRes] = await Promise.all([
        supabase.from("accounts").select("*").eq("user_id", userId).eq("status", "active"),
        supabase.from("bill_payments").select("*").eq("user_id", userId).order("payment_date", { ascending: false }),
      ]);

      if (accountsRes.data) setAccounts(accountsRes.data);
      if (paymentsRes.data) setPayments(paymentsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    try {
      const { error } = await supabase.from("bill_payments").insert({
        user_id: user.id,
        account_id: formData.accountId,
        payee_name: formData.payeeName,
        payee_account: formData.payeeAccount,
        amount: parseFloat(formData.amount),
        payment_date: formData.paymentDate,
        is_recurring: formData.isRecurring,
        recurring_frequency: formData.recurringFrequency || null,
        notes: formData.notes || null,
      });

      if (error) throw error;

      toast.success("Bill payment scheduled successfully");
      setShowAddForm(false);
      setFormData({
        accountId: "",
        payeeName: "",
        payeeAccount: "",
        amount: "",
        paymentDate: "",
        isRecurring: false,
        recurringFrequency: "",
        notes: "",
      });
      fetchData(user.id);
    } catch (error) {
      console.error("Error scheduling payment:", error);
      toast.error("Failed to schedule payment");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bill Pay</h1>
          <p className="text-muted-foreground">Manage and schedule bill payments</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Payment
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account">From Account</Label>
                  <Select value={formData.accountId} onValueChange={(value) => setFormData({ ...formData, accountId: value })}>
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
                  <Label htmlFor="payeeName">Payee Name</Label>
                  <Input
                    id="payeeName"
                    value={formData.payeeName}
                    onChange={(e) => setFormData({ ...formData, payeeName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payeeAccount">Payee Account Number</Label>
                  <Input
                    id="payeeAccount"
                    value={formData.payeeAccount}
                    onChange={(e) => setFormData({ ...formData, payeeAccount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentDate">Payment Date</Label>
                  <Input
                    id="paymentDate"
                    type="date"
                    value={formData.paymentDate}
                    onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recurringFrequency">Recurring (Optional)</Label>
                  <Select 
                    value={formData.recurringFrequency} 
                    onValueChange={(value) => setFormData({ ...formData, recurringFrequency: value, isRecurring: value !== "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="One-time payment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">One-time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Schedule Payment</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No payments scheduled</p>
            ) : (
              payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{payment.payee_name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(payment.payment_date).toLocaleDateString()}
                        {payment.is_recurring && (
                          <Badge variant="secondary" className="ml-2">
                            {payment.recurring_frequency}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">${parseFloat(payment.amount).toFixed(2)}</p>
                    <Badge variant={payment.status === "completed" ? "default" : payment.status === "scheduled" ? "secondary" : "destructive"}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
