import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, Wallet, TrendingUp, Lock, ArrowUpDown, Info } from "lucide-react";
import { useState, useEffect } from "react";

interface CryptoPrice {
  usd: number;
  usd_24h_change: number;
}

interface CryptoPrices {
  [key: string]: CryptoPrice;
}

const Crypto = () => {
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrices | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,polkadot,solana,ripple,dogecoin,litecoin&vs_currencies=usd&include_24hr_change=true'
        );
        const data = await response.json();
        setCryptoPrices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setLoading(false);
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const cryptoList = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'ripple', name: 'XRP', symbol: 'XRP' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/crypto-hero.jpg"
          alt="Cryptocurrency trading"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Cryptocurrency Banking</h1>
          <p className="text-xl mb-8">
            Buy, sell, and securely store your digital assets with VaultBank
          </p>
          <Button size="lg" asChild>
            <Link to="/open-account">Get Started</Link>
          </Button>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Live Crypto Prices */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Live Cryptocurrency Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cryptoList.map((crypto) => {
              const priceData = cryptoPrices?.[crypto.id];
              const isPositive = (priceData?.usd_24h_change || 0) >= 0;

              return (
                <Card key={crypto.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{crypto.symbol}</span>
                      <TrendingUp className={isPositive ? "text-green-500" : "text-red-500"} />
                    </CardTitle>
                    <CardDescription>{crypto.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="animate-pulse">
                        <div className="h-8 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-2/3"></div>
                      </div>
                    ) : priceData ? (
                      <>
                        <p className="text-2xl font-bold mb-1">
                          ${priceData.usd.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </p>
                        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? '+' : ''}{priceData.usd_24h_change.toFixed(2)}% (24h)
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Price unavailable</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose VaultBank for Crypto?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Bank-Grade Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your crypto assets are protected with the same security standards as traditional banking, including insurance coverage up to $250,000.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wallet className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  View all your crypto and traditional accounts in one place. Transfer between assets seamlessly with our intuitive platform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ArrowUpDown className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>Instant Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buy and sell cryptocurrency instantly with competitive rates. No waiting periods or complex processes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Open an Account</h3>
              <p className="text-muted-foreground">
                Sign up for a VaultBank account in minutes. No hidden fees or minimum deposits required.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Fund Your Account</h3>
              <p className="text-muted-foreground">
                Transfer funds from your bank account or existing crypto wallet. Supports ACH, wire transfers, and crypto deposits.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Start Trading</h3>
              <p className="text-muted-foreground">
                Buy your first cryptocurrency with just a few clicks. Monitor your portfolio and trade 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="mb-16 bg-muted/50 rounded-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <Lock className="h-8 w-8 text-primary flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Security is Our Priority</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Cold Storage:</strong> 98% of crypto assets are stored offline in secure vaults, protected from online threats.
                </p>
                <p>
                  <strong>Insurance Protection:</strong> All digital assets are insured against theft, hacking, and employee misconduct.
                </p>
                <p>
                  <strong>Two-Factor Authentication:</strong> Additional security layer requiring verification for all transactions.
                </p>
                <p>
                  <strong>Regulatory Compliance:</strong> Fully regulated and compliant with federal and state financial regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-crypto">
              <AccordionTrigger>What is cryptocurrency?</AccordionTrigger>
              <AccordionContent>
                Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional currencies issued by governments, cryptocurrencies operate on decentralized networks based on blockchain technology. Bitcoin, launched in 2009, was the first cryptocurrency, and thousands more have been created since then.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-to-buy">
              <AccordionTrigger>How do I buy cryptocurrency?</AccordionTrigger>
              <AccordionContent>
                With VaultBank, buying cryptocurrency is simple: (1) Open and verify your account, (2) Deposit funds via bank transfer or debit card, (3) Choose the cryptocurrency you want to buy, (4) Enter the amount and confirm your purchase. Your crypto will be available in your account immediately.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="is-it-safe">
              <AccordionTrigger>Is cryptocurrency safe?</AccordionTrigger>
              <AccordionContent>
                While cryptocurrency investments carry market risks, VaultBank implements multiple security measures to protect your assets: 98% of crypto is stored in offline cold storage, all accounts have insurance protection, two-factor authentication is required, and we comply with all regulatory requirements. However, cryptocurrency prices can be volatile, so only invest what you can afford to lose.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fees">
              <AccordionTrigger>What are the fees?</AccordionTrigger>
              <AccordionContent>
                VaultBank charges a transparent, competitive fee structure: 0.5% for cryptocurrency purchases and sales, no monthly account maintenance fees, no deposit fees for ACH transfers, and free transfers between your VaultBank accounts. Withdrawal fees vary by cryptocurrency based on network costs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="which-crypto">
              <AccordionTrigger>Which cryptocurrencies can I trade?</AccordionTrigger>
              <AccordionContent>
                VaultBank supports major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Cardano (ADA), Solana (SOL), XRP, Polkadot (DOT), Dogecoin (DOGE), and Litecoin (LTC). We regularly evaluate and add new cryptocurrencies based on market demand, security, and regulatory compliance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="taxes">
              <AccordionTrigger>Do I need to pay taxes on cryptocurrency?</AccordionTrigger>
              <AccordionContent>
                Yes, cryptocurrency is treated as property by the IRS, and you must report capital gains or losses when you sell, trade, or use crypto. VaultBank provides detailed transaction history and tax documents to help you file your taxes accurately. We recommend consulting with a tax professional for specific guidance.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="wallet">
              <AccordionTrigger>What is a crypto wallet?</AccordionTrigger>
              <AccordionContent>
                A crypto wallet stores the private keys that allow you to access and manage your cryptocurrency. VaultBank provides a custodial wallet, meaning we securely store your crypto for you with bank-grade security. You can also transfer your crypto to external wallets if you prefer to manage your own private keys.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="start-amount">
              <AccordionTrigger>How much money do I need to start?</AccordionTrigger>
              <AccordionContent>
                You can start investing in cryptocurrency with as little as $1 at VaultBank. We support fractional purchases, meaning you don't need to buy a whole Bitcoin or Ethereum. This makes cryptocurrency accessible to investors of all levels.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* CTA */}
        <section className="text-center bg-primary text-primary-foreground rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Open your VaultBank account today and get access to cryptocurrency trading with bank-grade security.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/open-account">Open Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Crypto;
