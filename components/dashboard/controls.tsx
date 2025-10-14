import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Wallet } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function Controls() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">
          Environment Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wallet className="text-cyan-500 mr-2 h-4 w-4" />
              <Label className="text-sm text-slate-400">Show Investments</Label>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
