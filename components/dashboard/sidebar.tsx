import React from "react";
import { Card, CardContent } from "../ui/card";
import NavItem from "./nav-item";
import {
  CalendarSync,
  ChartBarIncreasing,
  Command,
  List,
  Minus,
  Plus,
  Settings,
  Wallet,
} from "lucide-react";
import StatusItem from "./status-item";

export default function Sidebar() {
  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
        <CardContent className="p-4">
          <nav className="space-y-2">
            <NavItem icon={Command} label="Dashboard" active />
            <NavItem icon={Plus} label="New Income" />
            <NavItem icon={Minus} label="New Outcome" />
            <NavItem icon={Wallet} label="New Investment" />
            <NavItem icon={ChartBarIncreasing} label="Graph View" />
            <NavItem icon={List} label="List View" />
            <NavItem icon={CalendarSync} label="Calendar" />
            <NavItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="text-xs text-slate-500 mb-2 font-mono">
              STATUS - OCTOBER
            </div>
            <div className="space-y-3">
              <StatusItem label="Income" value={80} color="cyan" />
              <StatusItem label="Outcome" value={20} color="green" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
