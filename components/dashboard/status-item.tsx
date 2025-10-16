"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

interface StatusItemProps {
  label: string;
  value: number;
  color: "cyan" | "green" | "blue" | "purple";
}

export default function StatusItem({ label, value, color }: StatusItemProps) {
  const barRef = useRef<HTMLDivElement>(null);

  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500";
      case "green":
        return "from-green-500 to-emerald-500";
      case "blue":
        return "from-blue-500 to-indigo-500";
      case "purple":
        return "from-purple-500 to-pink-500";
      default:
        return "from-cyan-500 to-blue-500";
    }
  };

  const getGlowColor = () => {
    switch (color) {
      case "cyan":
        return "rgb(34, 211, 238)";
      case "green":
        return "rgb(34, 197, 94)";
      case "blue":
        return "rgb(59, 130, 246)";
      case "purple":
        return "rgb(168, 85, 247)";
      default:
        return "rgb(34, 211, 238)";
    }
  };

  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${value}%`, duration: 1.5, ease: "power2.out" }
      );
    }
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          ref={barRef}
          className={`h-full bg-gradient-to-r ${getColor()} rounded-full`}
          style={{
            boxShadow: `0 0 12px ${getGlowColor()}`,
          }}
        />
      </div>
    </motion.div>
  );
}
