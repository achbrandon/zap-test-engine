import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CreditCard, TrendingUp, Wallet, Building2, Bitcoin, MapPin, ChevronRight, Menu } from "lucide-react";
import bankingHero from "@/assets/banking-hero.jpg";
import vaultBankLogo from "@/assets/vaultbank-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Checking <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-64 z-50">
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/checking" className="font-semibold text-primary">View All Checking Accounts</Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/checking" className="flex flex-col items-start py-2">
                          <span className="font-medium">Standard Checking</span>
                          <span className="text-xs text-muted-foreground">$0 monthly fee</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/checking" className="flex flex-col items-start py-2">
                          <span className="font-medium">Plus Checking</span>
                          <span className="text-xs text-muted-foreground">Enhanced features • $4.95/mo</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/checking" className="flex flex-col items-start py-2">
                          <span className="font-medium">Premier Checking</span>
                          <span className="text-xs text-muted-foreground">Premium benefits • $25/mo</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/open-account" className="text-primary">Open an Account →</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Savings <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-64 z-50">
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/savings" className="font-semibold text-primary">View All Savings Accounts</Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/savings" className="flex flex-col items-start py-2">
                          <span className="font-medium">Basic Savings</span>
                          <span className="text-xs text-muted-foreground">0.45% APY • $25 minimum</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/savings" className="flex flex-col items-start py-2">
                          <span className="font-medium">High-Yield Savings</span>
                          <span className="text-xs text-muted-foreground">4.50% APY • Best rate</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/savings" className="flex flex-col items-start py-2">
                          <span className="font-medium">Money Market</span>
                          <span className="text-xs text-muted-foreground">3.85% APY • Check writing</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/open-account" className="text-primary">Open an Account →</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Credit Cards <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-64 z-50">
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/credit-cards" className="font-semibold text-primary">View All Credit Cards</Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/credit-cards" className="flex flex-col items-start py-2">
                          <span className="font-medium">Cash Rewards Card</span>
                          <span className="text-xs text-muted-foreground">1.5% cash back • No annual fee</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/credit-cards" className="flex flex-col items-start py-2">
                          <span className="font-medium">Travel Rewards</span>
                          <span className="text-xs text-muted-foreground">3X points • 50,000 bonus</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/credit-cards" className="flex flex-col items-start py-2">
                          <span className="font-medium">Premium Card</span>
                          <span className="text-xs text-muted-foreground">5X points • Lounge access</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/credit-cards" className="text-primary">Compare Cards →</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Loans <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-64 z-50">
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/loans" className="font-semibold text-primary">View All Loans</Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/loans" className="flex flex-col items-start py-2">
                          <span className="font-medium">Personal Loans</span>
                          <span className="text-xs text-muted-foreground">From 6.99% APR • Up to $100K</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/loans" className="flex flex-col items-start py-2">
                          <span className="font-medium">Auto Loans</span>
                          <span className="text-xs text-muted-foreground">From 4.49% APR • New & used</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/loans" className="flex flex-col items-start py-2">
                          <span className="font-medium">Home Loans</span>
                          <span className="text-xs text-muted-foreground">6.25% APR • 30-year fixed</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/loans" className="text-primary">Apply Now →</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Investments <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-64 z-50">
                    <div className="p-2">
                      <DropdownMenuItem asChild>
                        <Link to="/investments" className="font-semibold text-primary">View All Investment Services</Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/investments" className="flex flex-col items-start py-2">
                          <span className="font-medium">Retirement Accounts (IRA)</span>
                          <span className="text-xs text-muted-foreground">Traditional & Roth options</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/investments" className="flex flex-col items-start py-2">
                          <span className="font-medium">Managed Portfolio</span>
                          <span className="text-xs text-muted-foreground">0.50% fee • Professional management</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/investments" className="flex flex-col items-start py-2">
                          <span className="font-medium">Self-Directed Trading</span>
                          <span className="text-xs text-muted-foreground">$0 commissions • Stocks & ETFs</span>
                        </Link>
                      </DropdownMenuItem>
                      <div className="my-2 border-t border-border" />
                      <DropdownMenuItem asChild>
                        <Link to="/investments" className="text-primary">Get Started →</Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Link to="/crypto" className="text-sm font-medium hover:text-primary">
                  Crypto
                </Link>

                <Link to="/transfers" className="text-sm font-medium hover:text-primary">
                  Transfers
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
              
              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden">
                  <Menu className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/checking">Checking</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/savings">Savings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/credit-cards">Credit Cards</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/loans">Loans</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/investments">Investments</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/crypto">Crypto</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/locations">Locations</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/open-account">Open Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
