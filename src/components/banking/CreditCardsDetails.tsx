import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, CreditCard as CreditCardIcon } from "lucide-react";

export const CreditCardsDetails = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Credit Cards</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn rewards, build credit, and enjoy fraud protection with our range of credit cards designed for every lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-full h-48 bg-gradient-to-br from-primary to-accent rounded-lg mb-4 p-6 text-primary-foreground">
                <div className="flex justify-between items-start mb-8">
                  <CreditCardIcon className="h-10 w-10" />
                  <div className="text-right text-sm">
                    <p className="font-semibold">VaultBank</p>
                    <p>Cash Rewards</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl tracking-wider">•••• •••• •••• 1234</p>
                  <div className="flex justify-between text-xs">
                    <span>CARDHOLDER NAME</span>
                    <span>EXP 12/28</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Cash Rewards Card</h3>
              <p className="text-muted-foreground">Earn cash back on every purchase</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-4xl font-bold">1.5%</p>
              <p className="text-sm text-muted-foreground">Cash back on all purchases</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No annual fee</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">0% intro APR for 15 months</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$200 bonus after spending $1,000</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-primary border-2">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                MOST POPULAR
              </div>
              <div className="w-full h-48 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg mb-4 p-6 text-white">
                <div className="flex justify-between items-start mb-8">
                  <CreditCardIcon className="h-10 w-10" />
                  <div className="text-right text-sm">
                    <p className="font-semibold">VaultBank</p>
                    <p>Travel Rewards</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl tracking-wider">•••• •••• •••• 5678</p>
                  <div className="flex justify-between text-xs">
                    <span>CARDHOLDER NAME</span>
                    <span>EXP 12/28</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Travel Rewards Card</h3>
              <p className="text-muted-foreground">Earn points on travel and dining</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-4xl font-bold">3X</p>
              <p className="text-sm text-muted-foreground">Points on travel & dining</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$95 annual fee</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">50,000 bonus points after $4,000 spend</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No foreign transaction fees</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg mb-4 p-6 text-white">
                <div className="flex justify-between items-start mb-8">
                  <CreditCardIcon className="h-10 w-10" />
                  <div className="text-right text-sm">
                    <p className="font-semibold">VaultBank</p>
                    <p>Premium</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl tracking-wider">•••• •••• •••• 9012</p>
                  <div className="flex justify-between text-xs">
                    <span>CARDHOLDER NAME</span>
                    <span>EXP 12/28</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium Card</h3>
              <p className="text-muted-foreground">Exclusive benefits and concierge</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-4xl font-bold">5X</p>
              <p className="text-sm text-muted-foreground">Points on select categories</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$550 annual fee</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">$300 annual travel credit</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Airport lounge access</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
