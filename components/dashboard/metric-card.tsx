"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { type LucideIcon, BarChart3, LineChart } from "lucide-react";

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: "up" | "down" | "stable";
  color: string;
  detail: string;
}) {
  const valueRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat("en-US").format(Math.floor(num));
  };

  useEffect(() => {
    gsap.to(
      { val: 0 },
      {
        val: value,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          setDisplayValue(this.targets()[0].val);
        },
      }
    );

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [value]);

  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30";
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30";
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30";
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30";
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />;
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />;
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <motion.div
          initial={{ rotate: 0, scale: 1 }}
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Icon className={`h-5 w-5 text-${color}-500`} />
        </motion.div>
      </div>
      <div
        ref={valueRef}
        className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300"
      >
        $ {formatMoney(displayValue)}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">
        {getTrendIcon()}
      </div>
      <div
        ref={glowRef}
        className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"
      />
    </motion.div>
  );
}
