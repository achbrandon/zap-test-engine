import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, ShoppingCart, Coffee, Car, Home } from "lucide-react";

interface SpendingInsightsProps {
  userId?: string;
}

export function SpendingInsights({ userId }: SpendingInsightsProps) {
  // Mock data - in production, this would come from the database
  const categories = [
    {
      name: "Food & Dining",
      spent: 450,
      budget: 600,
      icon: <Coffee className="h-4 w-4" />,
      color: "bg-orange-500"
    },
    {
      name: "Shopping",
      spent: 320,
      budget: 500,
      icon: <ShoppingCart className="h-4 w-4" />,
      color: "bg-purple-500"
    },
    {
      name: "Transportation",
      spent: 180,
      budget: 300,
      icon: <Car className="h-4 w-4" />,
      color: "bg-blue-500"
    },
    {
      name: "Housing",
      spent: 1200,
      budget: 1200,
      icon: <Home className="h-4 w-4" />,
      color: "bg-green-500"
    }
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Spending Insights</h3>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">This Month</span>
          <span className="text-sm font-medium">
            ${totalSpent.toFixed(2)} / ${totalBudget.toFixed(2)}
          </span>
        </div>
        <Progress value={(totalSpent / totalBudget) * 100} className="h-2" />
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = percentage > 100;

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full ${category.color} bg-opacity-10 flex items-center justify-center`}>
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-muted-foreground'}`}>
                  ${category.spent} / ${category.budget}
                </span>
              </div>
              <Progress 
                value={Math.min(percentage, 100)} 
                className="h-1.5"
              />
              {isOverBudget && (
                <p className="text-xs text-red-600 mt-1">
                  ${(category.spent - category.budget).toFixed(2)} over budget
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
