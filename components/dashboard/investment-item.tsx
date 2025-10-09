import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function InvestmentItem({
  name,
  initialPrice,
  price,
  type,
}: {
  name: string;
  initialPrice: number;
  price: number;
  type: string;
}) {
  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge
          variant="outline"
          className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs"
        >
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-500">{price}</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-500">Initial Price: {initialPrice}</div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100"
        >
          Details
        </Button>
      </div>
    </div>
  );
}
