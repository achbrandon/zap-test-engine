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
import { useNavigate } from "react-router-dom";
import { TransferModal } from "./TransferModal";
import { AutoTransferModal } from "./AutoTransferModal";

interface QuickActionsProps {
  onAction: () => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const navigate = useNavigate();
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAutoTransferModal, setShowAutoTransferModal] = useState(false);

  const actions = [
    {
      icon: <Send className="h-5 w-5" />,
      label: "Transfer Money",
      onClick: () => setShowTransferModal(true)
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      label: "Pay Bills",
      onClick: () => navigate("/dashboard/bill-pay")
    },
    {
      icon: <Download className="h-5 w-5" />,
      label: "Mobile Deposit",
      onClick: () => navigate("/dashboard/mobile-deposit")
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      label: "Apply for Card",
      onClick: () => navigate("/dashboard/card-application")
    },
    {
      icon: <Bitcoin className="h-5 w-5" />,
      label: "Crypto",
      onClick: () => navigate("/dashboard/crypto")
    },
    {
      icon: <LinkIcon className="h-5 w-5" />,
      label: "Link Account (ACH)",
      onClick: () => navigate("/dashboard/ach-accounts")
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Statements",
      onClick: () => navigate("/dashboard/statements")
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      label: "Auto-Transfer",
      onClick: () => setShowAutoTransferModal(true)
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

      {showAutoTransferModal && (
        <AutoTransferModal
          onClose={() => setShowAutoTransferModal(false)}
          onSuccess={() => {
            setShowAutoTransferModal(false);
            onAction();
          }}
        />
      )}
    </>
  );
}
