import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Receipt, 
  Download, 
  CreditCard, 
  Bitcoin,
  FileText,
  RefreshCw,
  Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import { TransferModal } from "./TransferModal";

interface QuickActionsProps {
  onAction: () => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const [showTransferModal, setShowTransferModal] = useState(false);

  const actions = [
    {
      icon: <Send className="h-5 w-5" />,
      label: "Transfer Money",
      onClick: () => setShowTransferModal(true)
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      label: "Pay Bills",
      onClick: () => {}
    },
    {
      icon: <Download className="h-5 w-5" />,
      label: "Mobile Deposit",
      onClick: () => {}
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Apply for Card",
      onClick: () => {}
    },
    {
      icon: <Bitcoin className="h-5 w-5" />,
      label: "Crypto",
      onClick: () => {}
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Link Account (ACH)",
      onClick: () => {}
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Statements",
      onClick: () => {}
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: "Auto-Transfer",
      onClick: () => {}
    }
  ];

  return (
    <>
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col gap-2 p-4 hover:bg-primary/5 hover:border-primary"
              onClick={action.onClick}
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {action.icon}
              </div>
              <span className="text-xs text-center leading-tight">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {showTransferModal && (
        <TransferModal
          onClose={() => setShowTransferModal(false)}
          onSuccess={() => {
            setShowTransferModal(false);
            onAction();
          }}
        />
      )}
    </>
  );
}
