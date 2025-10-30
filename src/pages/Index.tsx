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
                  <DropdownMenuContent className="bg-background w-96 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Checking Accounts</h3>
                        <p className="text-xs text-muted-foreground mb-3">Find the perfect account for your lifestyle</p>
                      </div>
                      
                      <div className="space-y-3">
                        <DropdownMenuItem asChild>
                          <Link to="/checking" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Standard Checking</span>
                            <span className="text-xs text-muted-foreground">$0 monthly fee • No minimum balance • Free debit card</span>
                            <span className="text-xs text-muted-foreground">Mobile banking • Online bill pay • 16,000+ ATMs</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/checking" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Plus Checking</span>
                            <span className="text-xs text-muted-foreground">$4.95/mo (waived with $1,500 balance)</span>
                            <span className="text-xs text-muted-foreground">No overdraft fees (first 3) • Cash back rewards • Identity theft protection</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/checking" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Premier Checking</span>
                            <span className="text-xs text-muted-foreground">$25/mo (waived with $15,000 balance)</span>
                            <span className="text-xs text-muted-foreground">No foreign fees • Dedicated service • Premium rewards • Free safe deposit box</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs font-semibold mb-2 text-muted-foreground">FEATURES & SERVICES</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/transfers" className="text-xs hover:text-primary py-1">Mobile Banking</Link>
                          <Link to="/transfers" className="text-xs hover:text-primary py-1">Bill Pay</Link>
                          <Link to="/transfers" className="text-xs hover:text-primary py-1">Zelle® Payments</Link>
                          <Link to="/locations" className="text-xs hover:text-primary py-1">Find ATMs</Link>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <DropdownMenuItem asChild>
                          <Link to="/open-account" className="text-primary font-semibold flex items-center justify-between w-full">
                            <span>Open Checking Account</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Savings <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-96 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Savings Accounts</h3>
                        <p className="text-xs text-muted-foreground mb-3">Grow your money with competitive rates</p>
                      </div>
                      
                      <div className="space-y-3">
                        <DropdownMenuItem asChild>
                          <Link to="/savings" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Basic Savings Account</span>
                            <span className="text-xs text-primary font-semibold">0.45% APY</span>
                            <span className="text-xs text-muted-foreground">$25 minimum • No monthly fees • FDIC insured</span>
                            <span className="text-xs text-muted-foreground">Link to checking • Automatic savings tools</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/savings" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary border-l-2 border-primary">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">High-Yield Savings</span>
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">BEST RATE</span>
                            </div>
                            <span className="text-xs text-primary font-semibold">4.50% APY on balances $10,000+</span>
                            <span className="text-xs text-muted-foreground">Tiered rates • No monthly fees with $5,000 balance</span>
                            <span className="text-xs text-muted-foreground">Automatic transfers • Mobile app • Online banking</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/savings" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Money Market Account</span>
                            <span className="text-xs text-primary font-semibold">3.85% APY with $25,000 minimum</span>
                            <span className="text-xs text-muted-foreground">Check writing • Debit card access • Competitive rates</span>
                            <span className="text-xs text-muted-foreground">Limited transactions • FDIC insured</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs font-semibold mb-2 text-muted-foreground">SAVINGS TOOLS</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/savings" className="text-xs hover:text-primary py-1">Savings Calculator</Link>
                          <Link to="/savings" className="text-xs hover:text-primary py-1">Auto-Save Features</Link>
                          <Link to="/savings" className="text-xs hover:text-primary py-1">Goal Tracking</Link>
                          <Link to="/savings" className="text-xs hover:text-primary py-1">Compare Rates</Link>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <DropdownMenuItem asChild>
                          <Link to="/open-account" className="text-primary font-semibold flex items-center justify-between w-full">
                            <span>Open Savings Account</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Credit Cards <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-96 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Credit Cards</h3>
                        <p className="text-xs text-muted-foreground mb-3">Earn rewards and build credit</p>
                      </div>
                      
                      <div className="space-y-3">
                        <DropdownMenuItem asChild>
                          <Link to="/credit-cards" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Cash Rewards Card</span>
                            <span className="text-xs text-primary font-semibold">1.5% cash back on all purchases</span>
                            <span className="text-xs text-muted-foreground">$0 annual fee • $200 bonus after $1,000 spend</span>
                            <span className="text-xs text-muted-foreground">0% intro APR for 15 months • Fraud protection</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/credit-cards" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary border-l-2 border-primary">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Travel Rewards Card</span>
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">POPULAR</span>
                            </div>
                            <span className="text-xs text-primary font-semibold">3X points on travel & dining</span>
                            <span className="text-xs text-muted-foreground">$95 annual fee • 50,000 bonus points after $4,000 spend</span>
                            <span className="text-xs text-muted-foreground">No foreign transaction fees • Travel insurance • Concierge</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/credit-cards" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Premium Card</span>
                            <span className="text-xs text-primary font-semibold">5X points on select categories</span>
                            <span className="text-xs text-muted-foreground">$550 annual fee • $300 annual travel credit</span>
                            <span className="text-xs text-muted-foreground">Airport lounge access • Premium concierge • Travel benefits</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs font-semibold mb-2 text-muted-foreground">CARD BENEFITS</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/credit-cards" className="text-xs hover:text-primary py-1">Compare Cards</Link>
                          <Link to="/credit-cards" className="text-xs hover:text-primary py-1">Credit Builder</Link>
                          <Link to="/credit-cards" className="text-xs hover:text-primary py-1">Rewards Calculator</Link>
                          <Link to="/credit-cards" className="text-xs hover:text-primary py-1">Security Features</Link>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <DropdownMenuItem asChild>
                          <Link to="/credit-cards" className="text-primary font-semibold flex items-center justify-between w-full">
                            <span>Apply for Credit Card</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Loans <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-96 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Loans & Financing</h3>
                        <p className="text-xs text-muted-foreground mb-3">Competitive rates and flexible terms</p>
                      </div>
                      
                      <div className="space-y-3">
                        <DropdownMenuItem asChild>
                          <Link to="/loans" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Personal Loans</span>
                            <span className="text-xs text-primary font-semibold">From 6.99% APR</span>
                            <span className="text-xs text-muted-foreground">$5,000 to $100,000 • 12 to 84 month terms</span>
                            <span className="text-xs text-muted-foreground">No origination fees • Same-day funding • Fixed rates</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/loans" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary border-l-2 border-primary">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Auto Loans</span>
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">BEST RATE</span>
                            </div>
                            <span className="text-xs text-primary font-semibold">From 4.49% APR</span>
                            <span className="text-xs text-muted-foreground">New & used vehicles • 100% financing available</span>
                            <span className="text-xs text-muted-foreground">No prepayment penalties • Gap insurance • Quick approval</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/loans" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Home Loans & Mortgages</span>
                            <span className="text-xs text-primary font-semibold">6.25% APR - 30-year fixed</span>
                            <span className="text-xs text-muted-foreground">Purchase or refinance • Down payments as low as 3%</span>
                            <span className="text-xs text-muted-foreground">Fixed & adjustable rates • Dedicated loan officer</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/loans" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Home Equity Lines of Credit</span>
                            <span className="text-xs text-primary font-semibold">From 7.25% APR</span>
                            <span className="text-xs text-muted-foreground">Borrow up to 85% of home equity • Flexible draw period</span>
                            <span className="text-xs text-muted-foreground">Low closing costs • Tax-deductible interest</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs font-semibold mb-2 text-muted-foreground">LOAN TOOLS</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/loans" className="text-xs hover:text-primary py-1">Payment Calculator</Link>
                          <Link to="/loans" className="text-xs hover:text-primary py-1">Rate Comparison</Link>
                          <Link to="/loans" className="text-xs hover:text-primary py-1">Pre-Qualification</Link>
                          <Link to="/loans" className="text-xs hover:text-primary py-1">Loan Guide</Link>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <DropdownMenuItem asChild>
                          <Link to="/loans" className="text-primary font-semibold flex items-center justify-between w-full">
                            <span>Apply for Loan</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-sm font-medium hover:text-primary flex items-center gap-1">
                    Investments <ChevronRight className="h-3 w-3 rotate-90" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background w-96 z-50">
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="font-bold text-lg mb-2">Investment Services</h3>
                        <p className="text-xs text-muted-foreground mb-3">Build wealth for your future</p>
                      </div>
                      
                      <div className="space-y-3">
                        <DropdownMenuItem asChild>
                          <Link to="/investments" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Retirement Accounts (IRA)</span>
                            <span className="text-xs text-muted-foreground">Traditional & Roth options • Contribute up to $7,000/year</span>
                            <span className="text-xs text-muted-foreground">Tax advantages • Wide range of investments • Rollover options</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/investments" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary border-l-2 border-primary">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">Managed Portfolio</span>
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">RECOMMENDED</span>
                            </div>
                            <span className="text-xs text-primary font-semibold">0.50% annual fee</span>
                            <span className="text-xs text-muted-foreground">Professional management • Personalized strategy</span>
                            <span className="text-xs text-muted-foreground">Auto rebalancing • Dedicated advisor • Tax optimization</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/investments" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">Self-Directed Trading</span>
                            <span className="text-xs text-primary font-semibold">$0 commission-free trades</span>
                            <span className="text-xs text-muted-foreground">Stocks, ETFs, options • Advanced tools • Real-time data</span>
                            <span className="text-xs text-muted-foreground">Mobile trading • Research & analysis • Educational resources</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                          <Link to="/investments" className="flex flex-col items-start py-2 px-3 rounded hover:bg-secondary">
                            <span className="font-semibold">529 College Savings</span>
                            <span className="text-xs text-muted-foreground">Tax-free growth for education • Flexible withdrawals</span>
                            <span className="text-xs text-muted-foreground">State tax benefits • Gift contributions • Investment options</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-xs font-semibold mb-2 text-muted-foreground">INVESTMENT TOOLS</div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/investments" className="text-xs hover:text-primary py-1">Portfolio Planner</Link>
                          <Link to="/investments" className="text-xs hover:text-primary py-1">Retirement Calculator</Link>
                          <Link to="/investments" className="text-xs hover:text-primary py-1">Market Research</Link>
                          <Link to="/investments" className="text-xs hover:text-primary py-1">Learning Center</Link>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <DropdownMenuItem asChild>
                          <Link to="/investments" className="text-primary font-semibold flex items-center justify-between w-full">
                            <span>Start Investing</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </DropdownMenuItem>
                      </div>
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
