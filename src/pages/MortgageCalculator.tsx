import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Link } from "react-router-dom";
import vaultBankLogo from "@/assets/vaultbank-logo.png";
import { Calculator, Home, DollarSign, Percent, Calendar } from "lucide-react";

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);

  const downPaymentPercent = Math.round((downPayment / homePrice) * 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img src={vaultBankLogo} alt="VaultBank" className="h-16" />
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/loans">Back to Loans</Link>
              </Button>
              <Button variant="premium" asChild>
                <Link to="/open-account">Get Pre-Approved</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-6">
              <Calculator className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Mortgage Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estimate your monthly mortgage payment and see how changing variables affects your costs
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Input Section */}
            <Card className="p-8 animate-fade-in shadow-elegant">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Home className="h-6 w-6 text-primary" />
                Loan Details
              </h2>

              <div className="space-y-6">
                {/* Home Price */}
                <div>
                  <Label htmlFor="homePrice" className="text-base font-semibold mb-2 block">
                    Home Price
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="homePrice"
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="pl-10 text-lg"
                    />
                  </div>
                  <Slider
                    value={[homePrice]}
                    onValueChange={([value]) => setHomePrice(value)}
                    min={50000}
                    max={2000000}
                    step={10000}
                    className="mt-4"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <Label htmlFor="downPayment" className="text-base font-semibold mb-2 block">
                    Down Payment ({downPaymentPercent}%)
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-10 text-lg"
                    />
                  </div>
                  <Slider
                    value={[downPayment]}
                    onValueChange={([value]) => setDownPayment(value)}
                    min={0}
                    max={homePrice}
                    step={5000}
                    className="mt-4"
                  />
                </div>

                {/* Interest Rate */}
                <div>
                  <Label htmlFor="interestRate" className="text-base font-semibold mb-2 block">
                    Interest Rate
                  </Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="interestRate"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      step="0.1"
                      className="pl-10 text-lg"
                    />
                  </div>
                  <Slider
                    value={[interestRate]}
                    onValueChange={([value]) => setInterestRate(value)}
                    min={2}
                    max={12}
                    step={0.1}
                    className="mt-4"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <Label htmlFor="loanTerm" className="text-base font-semibold mb-2 block">
                    Loan Term (years)
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="pl-10 text-lg"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    {[15, 20, 30].map((term) => (
                      <Button
                        key={term}
                        variant={loanTerm === term ? "default" : "outline"}
                        onClick={() => setLoanTerm(term)}
                        className="flex-1"
                      >
                        {term} years
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            <div className="space-y-6">
              <Card className="p-8 bg-gradient-primary text-white animate-fade-in shadow-elegant">
                <h2 className="text-2xl font-bold mb-6">Monthly Payment</h2>
                <div className="text-6xl font-bold mb-2">
                  {formatCurrency(monthlyPayment)}
                </div>
                <p className="text-white/80 text-lg">Principal & Interest</p>
              </Card>

              <Card className="p-8 animate-fade-in shadow-elegant">
                <h3 className="text-xl font-bold mb-6">Loan Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="text-xl font-bold">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Down Payment</span>
                    <span className="text-xl font-bold">{formatCurrency(downPayment)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="text-xl font-bold">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="text-2xl font-bold text-primary">{formatCurrency(totalPayment)}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-secondary/50 animate-fade-in">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Ready to get started?
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get pre-approved and lock in your rate with VaultBank today.
                </p>
                <Button variant="premium" className="w-full" asChild>
                  <Link to="/open-account">Get Pre-Approved Now</Link>
                </Button>
              </Card>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="mt-12 p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Important Information</h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's Included</h3>
                <ul className="space-y-2">
                  <li>• Principal and interest payments</li>
                  <li>• Fixed rate for the life of the loan</li>
                  <li>• No prepayment penalties</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's Not Included</h3>
                <ul className="space-y-2">
                  <li>• Property taxes</li>
                  <li>• Homeowners insurance</li>
                  <li>• HOA fees</li>
                  <li>• Private mortgage insurance (PMI)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MortgageCalculator;
