import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Transfers = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Transfers & Payments</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Move money easily between accounts.
        </p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default Transfers;
