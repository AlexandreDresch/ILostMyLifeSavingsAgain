import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function IncomeAllocation() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">
          Income Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Income</div>
              <div className="text-xs text-cyan-400">42% allocated</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                style={{ width: "42%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Outcome</div>
              <div className="text-xs text-purple-400">18% of total</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: "68%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-slate-400">Investment</div>
              <div className="text-xs text-blue-400">35% of total</div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                style={{ width: "35%" }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
