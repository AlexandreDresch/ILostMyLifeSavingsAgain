"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Card, CardContent } from "../ui/card";
import { formatDate, formatTime } from "@/lib/utils";

export default function Timer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <motion.div
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div
              ref={glowRef}
              className="absolute inset-0 bg-cyan-500/10 opacity-0"
              style={{ filter: "blur(20px)" }}
            />
            <div className="text-center relative z-10">
              <motion.div
                className="text-xs text-slate-500 mb-1 font-mono"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                SYSTEM TIME
              </motion.div>
              <motion.div
                className="text-3xl font-mono text-cyan-400 mb-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {formatTime(currentTime)}
              </motion.div>
              <motion.div
                className="text-sm text-slate-400"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                {formatDate(currentTime)}
              </motion.div>
            </div>
          </motion.div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <motion.div
                className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "oklch(78.9% 0.154 211.53)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="text-xs text-slate-500 mb-1">Uptime</div>
                <div className="text-sm font-mono text-slate-200">
                  14d 06:42:18
                </div>
              </motion.div>
              <motion.div
                className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                whileHover={{
                  scale: 1.05,
                  borderColor: "oklch(78.9% 0.154 211.53)",
                  transition: { duration: 0.2 },
                }}
              >
                <div className="text-xs text-slate-500 mb-1">Time Zone</div>
                <div className="text-sm font-mono text-slate-200">
                  UTC-08:00
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
