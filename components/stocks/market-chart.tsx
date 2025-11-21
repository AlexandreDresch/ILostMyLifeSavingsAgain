"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

gsap.registerPlugin(ScrollTrigger);

const data = [
  { value: 5800 },
  { value: 5900 },
  { value: 5850 },
  { value: 6000 },
  { value: 5950 },
  { value: 6100 },
  { value: 6050 },
  { value: 6200 },
  { value: 6150 },
  { value: 6300 },
  { value: 6250 },
  { value: 6400 },
  { value: 6350 },
  { value: 6432 },
];

const indices = [
  {
    symbol: "SPXUSD",
    name: "S&P 500 Index",
    value: "6,432.0",
    change: "-11.60",
    percent: "-0.18%",
    isPositive: false,
    color: "bg-red-500",
  },
  {
    symbol: "NSXUSD",
    name: "US 100 Cash CFD",
    value: "23,390.4",
    change: "-44.20",
    percent: "-0.19%",
    isPositive: false,
    color: "bg-blue-500",
  },
  {
    symbol: "DJI",
    name: "Dow Jones Industrial Average Index",
    value: "45,222.4",
    change: "-99.30",
    percent: "-0.22%",
    isPositive: false,
    color: "bg-sky-500",
  },
];

export function MarketChart() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="bg-background border-slate-700/50 h-full flex flex-col">
        <CardHeader className="pb-2 space-y-4">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="indices" className="w-full">
              <TabsList className="bg-transparent p-0 h-auto gap-4 justify-start border-b border-transparent w-full">
                {["Indices", "Futures", "Bonds", "Forex"].map((tab) => (
                  <motion.div
                    key={tab}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TabsTrigger
                      value={tab.toLowerCase()}
                      className="bg-white/5 text-gray-400 data-[state=active]:bg-white/10 data-[state=active]:text-white rounded-md px-3 py-1.5 text-xs font-medium border border-transparent data-[state=active]:border-white/10"
                    >
                      {tab}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col min-h-[400px]">
          <motion.div
            className="h-[200px] w-full mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: "#10b981" }}
                />
                <YAxis domain={["dataMin - 100", "dataMax + 100"]} hide />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
            <span>Sep</span>
            <span>2025</span>
            <span>Apr</span>
            <span>Jul</span>
          </div>

          <motion.div
            className="flex gap-2 mt-4 mb-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.06 },
              },
            }}
          >
            {["1D", "1M", "3M", "1Y", "5Y", "All"].map((period) => (
              <motion.div
                key={period}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 text-xs rounded-full ${
                    period === "1Y"
                      ? "bg-white/10 text-white"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {period}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            <motion.div
              className="space-y-1 mt-auto"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {indices.map((index) => (
                <motion.div
                  key={index.symbol}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0, transition: { ease: "easeOut" } },
                  }}
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(255,255,255,0.05)",
                  }}
                  className="flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${index.color} flex items-center justify-center text-[10px] font-bold text-white`}
                    >
                      {index.symbol.substring(0, 3)}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{index.symbol}</div>
                      <div className="text-xs text-gray-500">{index.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-medium text-sm">
                      {index.value}
                    </div>
                    <div
                      className={`text-xs font-mono flex items-center justify-end gap-1 text-red-500`}
                    >
                      {index.change} {index.percent}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
