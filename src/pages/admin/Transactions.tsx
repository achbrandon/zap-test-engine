import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Clock, TrendingUp, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [transfers, setTransfers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Subscribe to realtime updates
    const transactionsChannel = supabase
      .channel('admin-transactions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'transactions' }, () => {
        fetchData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(transactionsChannel);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [transactionsRes, transfersRes] = await Promise.all([
        supabase
          .from("transactions")
          .select("*, accounts(account_name, account_number), profiles(full_name, email)")
          .eq("status", "pending")
          .order("created_at", { ascending: false }),
        supabase
          .from("transfers")
          .select("*")
          .eq("status", "pending")
          .order("created_at", { ascending: false }),
      ]);

      if (transactionsRes.data) setTransactions(transactionsRes.data);
      if (transfersRes.data) setTransfers(transfersRes.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveTransaction = async (transaction: any) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "completed" })
        .eq("id", transaction.id);

      if (error) throw error;

      toast.success("Transaction approved successfully");
      fetchData();
    } catch (error) {
      console.error("Error approving transaction:", error);
      toast.error("Failed to approve transaction");
    }
  };

  const handleRejectTransaction = async (transaction: any) => {
    try {
      const { error } = await supabase
        .from("transactions")
        .update({ status: "failed" })
        .eq("id", transaction.id);

      if (error) throw error;

      toast.success("Transaction rejected");
      fetchData();
    } catch (error) {
      console.error("Error rejecting transaction:", error);
      toast.error("Failed to reject transaction");
    }
  };

  const handleApproveTransfer = async (transfer: any) => {
    try {
      const { error } = await supabase
        .from("transfers")
        .update({ 
          status: "completed",
          completed_date: new Date().toISOString()
        })
        .eq("id", transfer.id);

      if (error) throw error;

      toast.success("Transfer approved successfully");
      fetchData();
    } catch (error) {
      console.error("Error approving transfer:", error);
      toast.error("Failed to approve transfer");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Transaction Management</h1>
        <p className="text-slate-300">Approve or reject pending transactions</p>
      </div>

      <Tabs defaultValue="crypto" className="w-full">
        <TabsList className="bg-slate-800/50">
          <TabsTrigger value="crypto">
            <TrendingUp className="h-4 w-4 mr-2" />
            Crypto Deposits ({transactions.filter(t => t.category === "Crypto").length})
          </TabsTrigger>
          <TabsTrigger value="transfers">
            <CreditCard className="h-4 w-4 mr-2" />
            Transfers ({transfers.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Pending ({transactions.length + transfers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-4 mt-6">
          {transactions.filter(t => t.category === "Crypto").length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center text-slate-400">
                No pending crypto deposits
              </CardContent>
            </Card>
          ) : (
            transactions.filter(t => t.category === "Crypto").map((transaction) => (
              <Card key={transaction.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      Crypto Deposit Pending
                    </CardTitle>
                    <Badge variant="secondary">
                      {new Date(transaction.created_at).toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">User</p>
                      <p className="text-white font-medium">{transaction.profiles?.full_name}</p>
                      <p className="text-slate-400 text-xs">{transaction.profiles?.email}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Amount</p>
                      <p className="text-white font-bold text-xl">${parseFloat(transaction.amount).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Account</p>
                      <p className="text-white">{transaction.accounts?.account_name}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Description</p>
                      <p className="text-white">{transaction.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={() => handleApproveTransaction(transaction)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Approve Deposit
                    </Button>
                    <Button
                      onClick={() => handleRejectTransaction(transaction)}
                      variant="destructive"
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="transfers" className="space-y-4 mt-6">
          {transfers.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center text-slate-400">
                No pending transfers
              </CardContent>
            </Card>
          ) : (
            transfers.map((transfer) => (
              <Card key={transfer.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-400" />
                      Transfer Pending
                    </CardTitle>
                    <Badge variant="secondary">
                      {new Date(transfer.created_at).toLocaleString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Amount</p>
                      <p className="text-white font-bold text-xl">${parseFloat(transfer.amount).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Type</p>
                      <p className="text-white capitalize">{transfer.transfer_type}</p>
                    </div>
                    {transfer.notes && (
                      <div className="col-span-2">
                        <p className="text-slate-400">Notes</p>
                        <p className="text-white">{transfer.notes}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    onClick={() => handleApproveTransfer(transfer)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve Transfer
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Combined view of all pending transactions */}
          {transactions.length === 0 && transfers.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="py-12 text-center text-slate-400">
                No pending transactions
              </CardContent>
            </Card>
          ) : (
            <>
              {transactions.map((transaction) => (
                <Card key={transaction.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{transaction.description}</p>
                        <p className="text-slate-400 text-sm">{transaction.profiles?.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${parseFloat(transaction.amount).toFixed(2)}</p>
                        <p className="text-slate-400 text-sm">{transaction.category}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
