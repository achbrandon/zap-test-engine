import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CreditCard, TrendingUp, Wallet, Building2, Bitcoin, MapPin } from "lucide-react";
import bankingHero from "@/assets/banking-hero.jpg";
import vaultBankLogo from "@/assets/vaultbank-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center">
                <img src={vaultBankLogo} alt="VaultBank" className="h-16" />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link to="/checking" className="text-sm font-medium hover:text-primary">
                  Checking
                </Link>
                <Link to="/savings" className="text-sm font-medium hover:text-primary">
                  Savings
                </Link>
                <Link to="/credit-cards" className="text-sm font-medium hover:text-primary">
                  Credit Cards
                </Link>
                <Link to="/loans" className="text-sm font-medium hover:text-primary">
                  Loans
                </Link>
                <Link to="/investments" className="text-sm font-medium hover:text-primary">
                  Investments
                </Link>
                <Link to="/crypto" className="text-sm font-medium hover:text-primary">
                  Crypto
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/locations">Find Locations</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={bankingHero} alt="Modern Banking" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Banking Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Experience modern banking with competitive rates, powerful tools, and exceptional service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/open-account">Open Account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/checking">Explore Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-all">
              <Wallet className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Checking Accounts</h3>
              <p className="text-muted-foreground mb-4">
                Flexible accounts for everyday banking needs
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/checking">Learn More →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Savings Accounts</h3>
              <p className="text-muted-foreground mb-4">
                Grow your money with competitive interest rates
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/savings">Learn More →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <CreditCard className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Credit Cards</h3>
              <p className="text-muted-foreground mb-4">
                Earn rewards and build your credit score
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/credit-cards">Learn More →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Loans</h3>
              <p className="text-muted-foreground mb-4">
                Competitive rates for personal and home loans
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/loans">Learn More →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Investments</h3>
              <p className="text-muted-foreground mb-4">
                Build wealth with expert investment guidance
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/investments">Learn More →</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <Bitcoin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Cryptocurrency</h3>
              <p className="text-muted-foreground mb-4">
                Buy, sell, and manage digital currencies
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/crypto">Learn More →</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-primary text-primary-foreground">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-6 opacity-90">
                Open your account today and experience banking that works for you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/open-account">Open Account</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent hover:bg-primary-foreground/10" asChild>
                  <Link to="/locations">
                    <MapPin className="mr-2 h-5 w-5" />
                    Find Locations
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <img src={vaultBankLogo} alt="VaultBank" className="h-12" />
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/checking" className="hover:text-foreground">Products</Link>
              <Link to="/locations" className="hover:text-foreground">Locations</Link>
              <Link to="/auth" className="hover:text-foreground">Sign In</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
