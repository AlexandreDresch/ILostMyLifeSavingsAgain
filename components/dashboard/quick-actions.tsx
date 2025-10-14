import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Download, RefreshCw, Settings, Shield } from "lucide-react";
import { Button } from "../ui/button";

export default function QuickActions() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-slate-100 text-base">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
          >
            <RefreshCw className="h-5 w-5 text-cyan-500" />
            <span className="text-xs">Sync Data</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
          >
            <Download className="h-5 w-5 text-cyan-500" />
            <span className="text-xs">Backup</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
          >
            <Settings className="h-5 w-5 text-cyan-500" />
            <span className="text-xs">Settings</span>
          </Button>

          <Button
            variant="outline"
            className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
          >
            <Shield className="h-5 w-5 text-cyan-500" />
            <span className="text-xs">Support</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
