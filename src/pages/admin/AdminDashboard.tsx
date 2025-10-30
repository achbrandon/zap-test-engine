import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Users, CreditCard, FileText, TrendingUp, Activity } from "lucide-react";
import logo from "@/assets/vaultbank-logo.png";

const AdminDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    pendingApplications: 0,
    pendingLoans: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to access admin panel");
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/dashboard");
      return;
    }

    setUser(user);
    setIsAdmin(true);
    fetchStats();
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const [usersRes, accountsRes, transactionsRes, applicationsRes, loansRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("accounts").select("id", { count: "exact", head: true }),
        supabase.from("transactions").select("id", { count: "exact", head: true }),
        supabase.from("account_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("loan_applications").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);

      setStats({
        totalUsers: usersRes.count || 0,
        totalAccounts: accountsRes.count || 0,
        totalTransactions: transactionsRes.count || 0,
        pendingApplications: applicationsRes.count || 0,
        pendingLoans: loansRes.count || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const isAdminHome = location.pathname === '/admin';

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <AdminSidebar />
        <div className="flex-1 flex flex-col w-full">
          <header className="bg-slate-800/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-slate-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <img src={logo} alt="VaultBank" className="h-12" />
                <div className="border-l border-slate-600 pl-4">
                  <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {isAdminHome ? (
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Welcome back, Administrator
                  </h2>
                  <p className="text-slate-300">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Total Users
                      </CardTitle>
                      <Users className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
                      <p className="text-xs text-slate-400 mt-1">Registered users</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Accounts
                      </CardTitle>
                      <Activity className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.totalAccounts}</div>
                      <p className="text-xs text-slate-400 mt-1">Active accounts</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Transactions
                      </CardTitle>
                      <CreditCard className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.totalTransactions}</div>
                      <p className="text-xs text-slate-400 mt-1">Total processed</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Pending Apps
                      </CardTitle>
                      <FileText className="h-4 w-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.pendingApplications}</div>
                      <p className="text-xs text-slate-400 mt-1">Awaiting review</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        Loan Requests
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-orange-400" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.pendingLoans}</div>
                      <p className="text-xs text-slate-400 mt-1">Pending approval</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        className="h-24 text-lg" 
                        variant="outline"
                        onClick={() => navigate("/admin/applications")}
                      >
                        <FileText className="mr-2 h-5 w-5" />
                        Review Applications
                      </Button>
                      <Button 
                        className="h-24 text-lg" 
                        variant="outline"
                        onClick={() => navigate("/admin/support")}
                      >
                        <FileText className="mr-2 h-5 w-5" />
                        Support Tickets
                      </Button>
                      <Button 
                        className="h-24 text-lg" 
                        variant="outline"
                        onClick={() => navigate("/admin/users")}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        Manage Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
