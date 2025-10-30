import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Car, Home, DollarSign } from "lucide-react";

export const LoansDetails = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loans & Financing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Competitive rates and flexible terms for all your borrowing needs. Quick approval and personalized service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Personal Loans</h3>
              <p className="text-muted-foreground">Flexible funding for any purpose</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">6.99%</p>
                <span className="text-muted-foreground">APR*</span>
              </div>
              <p className="text-sm text-muted-foreground">Rates as low as | Fixed rate</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Borrow $5,000 to $100,000</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Terms from 12 to 84 months</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No origination fees</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Same-day funding available</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-primary border-2">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                POPULAR
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Auto Loans</h3>
              <p className="text-muted-foreground">Finance your dream vehicle</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">4.49%</p>
                <span className="text-muted-foreground">APR*</span>
              </div>
              <p className="text-sm text-muted-foreground">Rates as low as | 60-month term</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">New and used vehicles</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">100% financing available</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">No prepayment penalties</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Gap insurance available</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Home Loans</h3>
              <p className="text-muted-foreground">Purchase or refinance your home</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">6.25%</p>
                <span className="text-muted-foreground">APR*</span>
              </div>
              <p className="text-sm text-muted-foreground">30-year fixed rate mortgage</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Purchase or refinance</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Down payments as low as 3%</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Fixed and adjustable rates</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Dedicated loan officer</p>
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
