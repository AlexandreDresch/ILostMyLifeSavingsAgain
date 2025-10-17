"use client";
import { Card, CardContent } from "@/components/ui/card";
import NavItem from "./nav-item";
import {
  CalendarSearch as CalendarSync,
  CarTaxiFront as ChartBarIncreasing,
  Command,
  List,
  Minus,
  Plus,
  Settings,
  Wallet,
} from "lucide-react";
import StatusItem from "./status-item";
import { motion } from "framer-motion";
import PepemeterTabs from "./pepemeter-tabs";

export default function Sidebar() {
  const navItems = [
    { icon: Command, label: "Dashboard", active: true },
    { icon: Plus, label: "New Income" },
    { icon: Minus, label: "New Outcome" },
    { icon: Wallet, label: "New Investment" },
    { icon: ChartBarIncreasing, label: "Graph View" },
    { icon: List, label: "List View" },
    { icon: CalendarSync, label: "Calendar" },
    { icon: Settings, label: "Settings" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    } as const,
  };

  return (
    <div className="col-span-12 md:col-span-3 lg:col-span-2">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
        <CardContent className="p-4">
          <motion.nav
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={item.active}
                />
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="mt-8 pt-6 border-t border-slate-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-xs text-slate-500 mb-2 font-mono">
              STATUS - OCTOBER
            </div>
            <div className="space-y-3">
              <StatusItem label="Income" value={80} color="cyan" />
              <StatusItem label="Outcome" value={20} color="green" />
            </div>
          </motion.div>

          <PepemeterTabs
            incomeData={{
              income: 80000,
              outcome: 8340,
              title: "Income Health",
            }}
            investmentData={{
              income: 5000,
              outcome: 1800,
              title: "Investment Performance",
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
