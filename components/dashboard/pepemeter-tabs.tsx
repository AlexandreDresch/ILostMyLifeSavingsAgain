"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Pepemeter from "./pepemeter";

interface PepemeterTabsProps {
  incomeData: { income: number; outcome: number; title: string };
  investmentData: { income: number; outcome: number; title: string };
}

export default function PepemeterTabs({
  incomeData,
  investmentData,
}: PepemeterTabsProps) {
  const [activeTab, setActiveTab] = useState<"income" | "investment">("income");

  return (
    <motion.div
      className="size-full max-h-fit hidden bg-gray-900/80 rounded-lg border border-gray-800/50 lg:flex flex-col mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="flex border-b border-gray-700/50">
        <button
          className={`flex-1 py-2 text-xs font-medium text-center transition-colors duration-200 ${
            activeTab === "income"
              ? "text-gray-200 bg-gray-800/50"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </button>
        <button
          className={`flex-1 py-2 text-xs font-medium text-center transition-colors duration-200 ${
            activeTab === "investment"
              ? "text-gray-200 bg-gray-800/50"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("investment")}
        >
          Investment
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "income" ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: activeTab === "income" ? 10 : -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4"
        >
          {activeTab === "income" ? (
            <Pepemeter
              income={incomeData.income}
              outcome={incomeData.outcome}
              variant="income"
              title={incomeData.title}
            />
          ) : (
            <Pepemeter
              income={investmentData.income}
              outcome={investmentData.outcome}
              variant="investment"
              title={investmentData.title}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
