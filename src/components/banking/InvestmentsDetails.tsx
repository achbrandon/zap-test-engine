import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, TrendingUp, PieChart, Target } from "lucide-react";

export const InvestmentsDetails = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Investment Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build wealth for the future with our comprehensive investment solutions. Professional guidance and powerful tools to help you reach your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Retirement Accounts (IRA)</h3>
              <p className="text-muted-foreground">Tax-advantaged retirement savings</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-4xl font-bold mb-2">Traditional & Roth</p>
              <p className="text-sm text-muted-foreground">Choose the IRA that fits your needs</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Tax deductions or tax-free growth</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Contribute up to $7,000/year</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Wide range of investment options</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Open IRA <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300 border-primary border-2">
            <div className="mb-6">
              <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                RECOMMENDED
              </div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <PieChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Managed Portfolio</h3>
              <p className="text-muted-foreground">Professional investment management</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <div className="flex items-baseline gap-2 mb-2">
                <p className="text-4xl font-bold">0.50%</p>
                <span className="text-muted-foreground">Annual fee</span>
              </div>
              <p className="text-sm text-muted-foreground">Transparent pricing</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Personalized portfolio strategy</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Automatic rebalancing</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Dedicated financial advisor</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>

          <Card className="p-8 hover:shadow-2xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Self-Directed Trading</h3>
              <p className="text-muted-foreground">Take control of your investments</p>
            </div>

            <div className="mb-6 pb-6 border-b border-border">
              <p className="text-4xl font-bold mb-2">$0</p>
              <p className="text-sm text-muted-foreground">Commission-free stock trades</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Trade stocks, ETFs, and options</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Advanced trading tools</p>
              </div>
              <div className="flex gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">Real-time market data</p>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Start Trading <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
