"use client";

import { motion } from "framer-motion";
import {
  AArrowDown as BanknoteArrowDown,
  BanknoteIcon as BanknoteArrowUp,
  Wallet,
} from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ActivityItem({
  type,
  time,
  description,
  index = 0,
}: {
  type: "income" | "outcome" | "investment";
  time: string;
  description: string;
  index?: number;
}) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dotRef.current) {
      gsap.to(dotRef.current, {
        scale: 1.5,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const iconColor = {
    income: "text-blue-500",
    outcome: "text-amber-500",
    investment: "text-green-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="flex space-x-3 p-2 rounded-md bg-slate-800/50 border border-slate-700/50 cursor-pointer"
    >
      <motion.div
        whileHover={{ rotate: 10 }}
        className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-800/50 border border-slate-700/50 flex-shrink-0"
      >
        {type === "income" && (
          <BanknoteArrowUp className={`${iconColor.income}`} size={14} />
        )}
        {type === "outcome" && (
          <BanknoteArrowDown className={`${iconColor.outcome}`} size={14} />
        )}
        {type === "investment" && (
          <Wallet className={`${iconColor.investment}`} size={14} />
        )}
      </motion.div>
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
        <div ref={dotRef} className="h-2 w-2 rounded-full bg-cyan-500" />
      </div>
    </motion.div>
  );
}
