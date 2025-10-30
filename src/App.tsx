import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checking from "./pages/Checking";
import Savings from "./pages/Savings";
import CreditCards from "./pages/CreditCards";
import Loans from "./pages/Loans";
import Investments from "./pages/Investments";
import Transfers from "./pages/Transfers";
import Locations from "./pages/Locations";
import Crypto from "./pages/Crypto";
import OpenAccount from "./pages/OpenAccount";
import Auth from "./pages/Auth";
import CDs from "./pages/CDs";
import MoneyMarket from "./pages/MoneyMarket";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checking" element={<Checking />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/cds" element={<CDs />} />
          <Route path="/money-market" element={<MoneyMarket />} />
          <Route path="/credit-cards" element={<CreditCards />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/open-account" element={<OpenAccount />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
