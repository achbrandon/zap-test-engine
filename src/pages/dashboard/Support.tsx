import { SupportChat } from "@/components/dashboard/SupportChat";
import { Card } from "@/components/ui/card";

export default function Support() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support & Help Center</h1>
        <p className="text-muted-foreground">We're here to help 24/7</p>
      </div>

      <Card className="p-6">
        <SupportChat onClose={() => {}} />
      </Card>
    </div>
  );
}
