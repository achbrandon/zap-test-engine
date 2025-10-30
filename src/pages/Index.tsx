import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CreditCard, TrendingUp, Wallet, Building2, Bitcoin, MapPin, Menu } from "lucide-react";
import bankingHero from "@/assets/banking-hero.jpg";
import vaultBankLogo from "@/assets/vaultbank-logo.png";
import promoCheckingBonus from "@/assets/promo-checking-bonus.jpg";
import promoCreditCard from "@/assets/promo-credit-card.jpg";
import promoAdvisor from "@/assets/promo-advisor.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CheckingDetails } from "@/components/banking/CheckingDetails";
import { SavingsDetails } from "@/components/banking/SavingsDetails";
import { CreditCardsDetails } from "@/components/banking/CreditCardsDetails";
import { LoansDetails } from "@/components/banking/LoansDetails";
import { InvestmentsDetails } from "@/components/banking/InvestmentsDetails";
import { useState, useRef } from "react";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    setTimeout(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-16 w-full">
            <div className="flex items-center gap-8 flex-1">
              <Link to="/" className="flex items-center">
                <img src={vaultBankLogo} alt="VaultBank" className="h-16" />
              </Link>
              <NavigationMenu className="hidden md:flex flex-1">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Checking</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('checking')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Choose a checking account
                        </button>
                        <button onClick={() => handleNavClick('checking')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Debit card for kids
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Savings & CDs</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('savings')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Choose a savings account
                        </button>
                        <button onClick={() => handleNavClick('cds')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          CDs
                        </button>
                        <button onClick={() => handleNavClick('money-market')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Money Market Account
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Credit cards</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('credit-cards')} className="block w-full text-left px-4 py-2 text-primary hover:bg-accent rounded-md font-medium">
                          Explore credit cards
                        </button>
                        <button onClick={() => handleNavClick('credit-cards')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          See if you're pre-approved
                        </button>
                        <div className="my-2 border-t border-border" />
                        <button onClick={() => handleNavClick('credit-cards')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Personal credit cards
                        </button>
                        <button onClick={() => handleNavClick('credit-cards')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Business credit cards
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Home loans</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Buy a home
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Refinance your mortgage
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Apply for a mortgage
                        </button>
                        <div className="my-2 border-t border-border" />
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Access calculators and tools
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          See current rates
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Manage account
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Homebuying 101
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Auto</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Explore car financing
                        </button>
                        <button onClick={() => handleNavClick('loans')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Refinance your car
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-sm font-medium">Investing by J.P. Morgan</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4">
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Explore investing
                        </button>
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Work with our advisors
                        </button>
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Invest on your own
                        </button>
                        <div className="my-2 border-t border-border" />
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Retirement and IRAs
                        </button>
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Education planning
                        </button>
                        <button onClick={() => handleNavClick('investments')} className="block w-full text-left px-4 py-2 hover:bg-accent rounded-md">
                          Investing insights
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link to="/crypto" className={navigationMenuTriggerStyle()}>
                        Crypto
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              
              {/* Mobile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden">
                  <Menu className="h-6 w-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background w-48">
                  <DropdownMenuItem onClick={() => handleNavClick('checking')}>
                    Checking
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('savings')}>
                    Savings & CDs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('credit-cards')}>
                    Credit cards
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('loans')}>
                    Home loans
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('loans')}>
                    Auto
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleNavClick('investments')}>
                    Investing by J.P. Morgan
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/crypto">Crypto</Link>
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

      {/* Promotional Banners - Similar to Chase */}
      <section className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img src={promoCheckingBonus} alt="$300 Checking Bonus" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">New VaultBank checking customers</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Open a VaultBank Total Checking account with qualifying activities.
                </p>
                <Button asChild className="w-full">
                  <Link to="/open-account">Open an account</Link>
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img src={promoCreditCard} alt="Credit Card Rewards" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Earn a $200 bonus</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Plus, earn unlimited 1.5% cash back on all purchases — all with no annual fee.
                </p>
                <Button asChild className="w-full">
                  <Link to="/credit-cards">Learn more</Link>
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-48">
                <img src={promoAdvisor} alt="Financial Advisor" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Partner with a VaultBank Advisor</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Get dedicated help reaching your individual investment goals.
                </p>
                <Button asChild className="w-full">
                  <Link to="/investments">Continue</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Tiles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Choose what's right for you</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Link to="/credit-cards" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <CreditCard className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Credit cards</span>
            </Link>
            <button onClick={() => handleNavClick('checking')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <Wallet className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Checking</span>
            </button>
            <button onClick={() => handleNavClick('savings')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <TrendingUp className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Savings</span>
            </button>
            <button onClick={() => handleNavClick('loans')} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <Building2 className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Home loans</span>
            </button>
            <Link to="/investments" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <TrendingUp className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Investments</span>
            </Link>
            <Link to="/crypto" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <Bitcoin className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Crypto</span>
            </Link>
            <Link to="/open-account" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <Wallet className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Free credit score</span>
            </Link>
            <Link to="/locations" className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-all group">
              <MapPin className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-center">Find locations</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Details Section - Shows when navigation item is clicked */}
      {activeSection && (
        <section ref={detailsRef} className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {activeSection === 'checking' && <CheckingDetails />}
            {activeSection === 'savings' && <SavingsDetails />}
            {activeSection === 'credit-cards' && <CreditCardsDetails />}
            {activeSection === 'loans' && <LoansDetails />}
            {activeSection === 'investments' && <InvestmentsDetails />}
            {activeSection === 'cds' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Certificates of Deposit (CDs)</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Lock in competitive rates with our flexible CD options
                  </p>
                </div>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">CD Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    Our CDs offer guaranteed returns with terms ranging from 3 months to 5 years. Choose the term that fits your financial goals.
                  </p>
                  <Button asChild>
                    <Link to="/cds">View Full CD Details →</Link>
                  </Button>
                </Card>
              </div>
            )}
            {activeSection === 'money-market' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">Money Market Account</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Earn competitive rates while maintaining easy access to your funds
                  </p>
                </div>
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Money Market Overview</h3>
                  <p className="text-muted-foreground mb-4">
                    Combine the benefits of checking and savings with our Money Market Account. Enjoy higher interest rates and limited check-writing privileges.
                  </p>
                  <Button asChild>
                    <Link to="/money-market">View Full Money Market Details →</Link>
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </section>
      )}

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

      {/* Additional Services & Resources */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Services & Resources</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-all">
              <Building2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Business Banking</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive banking solutions designed to help your business thrive and grow.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/business">Explore Business Services</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Travel Banking</h3>
              <p className="text-muted-foreground mb-4">
                Travel rewards, global ATM access, and protection for your adventures worldwide.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/travel">Learn About Travel Services</Link>
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Schedule a Meeting</h3>
              <p className="text-muted-foreground mb-4">
                Meet with our banking experts to discuss your financial goals and find the right solutions.
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/locations">Find a Branch & Schedule</Link>
              </Button>
            </Card>
          </div>
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
