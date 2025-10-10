import { BanknoteArrowDown, BanknoteArrowUp, Wallet } from "lucide-react";

export default function ActivityItem({
  type,
  time,
  description,
}: {
  type: "income" | "outcome" | "investment";
  time: string;
  description: string;
}) {
  return (
    <div
      className={`flex space-x-3 p-2 rounded-md bg-slate-800/50 border border-slate-700/50`}
    >
      <div className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-800/50 border border-slate-700/50">
        {type === "income" && (
          <BanknoteArrowUp
            className="text-blue-500 bg-blue-500/10 border-blue-500/30"
            size={14}
          />
        )}
        {type === "outcome" && (
          <BanknoteArrowDown
            className="text-amber-500 bg-amber-500/10 border-amber-500/30"
            size={14}
          />
        )}
        {type === "investment" && (
          <Wallet
            className="text-green-500 bg-green-500/10 border-green-500/30"
            size={14}
          />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-xs font-light text-slate-100">
            {type.toUpperCase()}
          </div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{description}</div>
      </div>

      <div className="flex-shrink-0 self-center">
        <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
      </div>
    </div>
  );
}
