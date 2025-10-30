import {
  Home,
  CreditCard,
  ArrowLeftRight,
  FileText,
  Smartphone,
  Settings,
  TrendingUp,
  Bell,
  Award,
  DollarSign,
  FileBarChart,
  Briefcase,
  Gift,
  LifeBuoy,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Overview", url: "/dashboard", icon: Home },
  { title: "Accounts", url: "/dashboard/accounts", icon: CreditCard },
  { title: "Transfers", url: "/dashboard/transfers", icon: ArrowLeftRight },
  { title: "Bill Pay", url: "/dashboard/bill-pay", icon: FileText },
  { title: "Mobile Deposit", url: "/dashboard/mobile-deposit", icon: Smartphone },
  { title: "Cards", url: "/dashboard/cards", icon: CreditCard },
  { title: "Credit Score", url: "/dashboard/credit-score", icon: TrendingUp },
  { title: "Loans", url: "/dashboard/loans", icon: DollarSign },
  { title: "Statements", url: "/dashboard/statements", icon: FileBarChart },
  { title: "Offers & Rewards", url: "/dashboard/offers", icon: Gift },
  { title: "Alerts", url: "/dashboard/alerts", icon: Bell },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
  { title: "Support", url: "/dashboard/support", icon: LifeBuoy },
];

export function DashboardSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Banking</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
