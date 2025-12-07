"use client";
import { useEffect, useRef } from "react";
import { motion, Variants, useAnimation } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { marketData } from "@/constants";
import { cn } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);
export interface MarketItem {
  name: string;
  value: string;
  change: string;
  percent: string;
  open: string;
  high: string;
  low: string;
  prev: string;
  isPositive: boolean;
  type?: "index" | "future" | "bond" | "commodity";
  icon?: string;
}
const rowVariants: Variants = {
  initial: { opacity: 0, y: 6 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.035, duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  }),
};
export function MarketTable() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  useEffect(() => {
    controls.start("animate");
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { y: 0, opacity: 0.8 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=50",
          scrub: 0.3,
        },
        ease: "power1.out",
        duration: 1,
      }
    );
  }, [controls]);
  return (
    <Card
      ref={containerRef}
      className="bg-background border-slate-700/50 h-full overflow-hidden flex flex-col"
    >
      <CardHeader className="px-6 overflow-x-auto py-4 border-b border-white/5 shrink-0 scrollbar-hidden">
        <div className="grid grid-cols-12 text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[800px]">
          <div className="col-span-4">Name</div>
          <div className="col-span-1 text-right">Value</div>
          <div className="col-span-1 text-right">Change</div>
          <div className="col-span-1 text-right">Chg%</div>
          <div className="col-span-1 text-right">Open</div>
          <div className="col-span-1 text-right">High</div>
          <div className="col-span-1 text-right">Low</div>
          <div className="col-span-2 text-right">Prev</div>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-auto flex-1 scrollbar-hidden">
        <div className="min-w-[800px]">
          {Object.entries(marketData).map(([category, items], sectionIndex) => (
            <div key={category}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: sectionIndex * 0.15,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="px-6 py-2 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-white/5"
              >
                {category}
              </motion.div>
              {items.map((item, i) => (
                <motion.div
                  key={item.name}
                  variants={rowVariants}
                  initial="initial"
                  animate={controls}
                  custom={i + sectionIndex * 10}
                  className="grid grid-cols-12 px-6 py-3 text-sm border-b border-white/5 hover:bg-white/5 transition-colors items-center group"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <span className="text-base opacity-70">{item.icon}</span>
                    <span className="font-medium text-gray-200 group-hover:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-1 text-right font-mono text-gray-300">
                    {item.value}
                  </div>
                  <div
                    className={cn(
                      "col-span-1 text-right font-mono",
                      item.isPositive ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {item.change}
                  </div>
                  <div
                    className={cn(
                      "col-span-1 text-right font-mono",
                      item.isPositive ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {item.percent}
                  </div>
                  <div className="col-span-1 text-right font-mono text-gray-500">
                    {item.open}
                  </div>
                  <div className="col-span-1 text-right font-mono text-gray-500">
                    {item.high}
                  </div>
                  <div className="col-span-1 text-right font-mono text-gray-500">
                    {item.low}
                  </div>
                  <div className="col-span-2 text-right font-mono text-gray-500">
                    {item.prev}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
