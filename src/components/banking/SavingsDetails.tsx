import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, TrendingUp } from "lucide-react";

export const SavingsDetails = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Savings Accounts</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Grow your money with competitive rates and flexible access. Start saving for your future today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Basic Savings Account</h3>
              <p className="text-muted-foreground">Simple savings with great flexibility</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">0.45%</p>
                <span className="text-muted-foreground">APY*</span>
              </div>
              <p className="text-sm text-muted-foreground">On all balances</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$25 minimum to open</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No monthly maintenance fee</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">FDIC insured up to $250,000</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Link to checking for overdraft protection</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Open Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-primary border-2">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                BEST RATE
              </div>
              <h3 className="text-2xl font-bold mb-2">High-Yield Savings</h3>
              <p className="text-muted-foreground">Maximize your savings growth</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">4.50%</p>
                <span className="text-muted-foreground">APY*</span>
              </div>
              <p className="text-sm text-muted-foreground">On balances $10,000+</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$1,000 minimum to open</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Tiered interest rates</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No monthly fees with $5,000 balance</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Automatic savings tools</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Open Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Money Market Account</h3>
              <p className="text-muted-foreground">High rates with check writing</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">3.85%</p>
                <span className="text-muted-foreground">APY*</span>
              </div>
              <p className="text-sm text-muted-foreground">With $25,000 minimum balance</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Check writing privileges</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Debit card access</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Competitive tiered rates</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">FDIC insured</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Open Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>

        <div className="bg-secondary p-8 rounded-lg mb-12">
          <div className="flex items-start gap-4">
            <TrendingUp className="h-12 w-12 text-primary flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold mb-3">Why Save with VaultBank?</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Competitive Rates</h4>
                  <p className="text-sm text-muted-foreground">
                    Our rates are among the highest in the industry, helping your money grow faster.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">FDIC Insured</h4>
                  <p className="text-sm text-muted-foreground">
                    Your deposits are protected up to $250,000 per depositor by the FDIC.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Easy Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Transfer funds anytime through our mobile app or online banking platform.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Automatic Savings</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up automatic transfers to make saving effortless and consistent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
