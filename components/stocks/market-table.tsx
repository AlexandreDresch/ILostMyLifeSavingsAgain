"use client";

import { useEffect, useRef } from "react";
import { motion, Variants, useAnimation } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    transition: {
      delay: i * 0.035,
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
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
      { y: 20, opacity: 0.8 },
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
      className="bg-background border-slate-700/50 h-full overflow-hidden"
    >
      <CardHeader className="px-6 py-4 border-b border-white/5">
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-12 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <TableHead className="col-span-4">Name</TableHead>
              <TableHead className="col-span-1 text-right">Value</TableHead>
              <TableHead className="col-span-1 text-right">Change</TableHead>
              <TableHead className="col-span-1 text-right">Chg%</TableHead>
              <TableHead className="col-span-1 text-right">Open</TableHead>
              <TableHead className="col-span-1 text-right">High</TableHead>
              <TableHead className="col-span-1 text-right">Low</TableHead>
              <TableHead className="col-span-2 text-right">Prev</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </CardHeader>

      <CardContent className="p-0 overflow-y-auto max-h-[600px]">
        <Table className="w-full">
          <TableBody>
            {Object.entries(marketData).map(
              ([category, items], sectionIndex) => (
                <>
                  <TableRow key={category}>
                    <TableCell
                      colSpan={12}
                      className="px-6 py-2 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-white/5"
                    >
                      {category}
                    </TableCell>
                  </TableRow>

                  {items.map((item, i) => (
                    <motion.tr
                      key={item.name}
                      variants={rowVariants}
                      initial="initial"
                      animate={controls}
                      custom={i + sectionIndex * 10}
                      className="grid grid-cols-12 px-6 py-3 text-sm border-b border-white/5 hover:bg-white/5 transition-colors items-center group"
                    >
                      <TableCell className="col-span-4 flex items-center gap-3">
                        <span className="text-base opacity-70">
                          {item.icon}
                        </span>
                        <span className="font-medium text-gray-200 group-hover:text-white">
                          {item.name}
                        </span>
                      </TableCell>

                      <TableCell className="col-span-1 text-right font-mono text-gray-300">
                        {item.value}
                      </TableCell>

                      <TableCell
                        className={cn(
                          "col-span-1 text-right font-mono",
                          item.isPositive ? "text-cyan-500" : "text-red-500"
                        )}
                      >
                        {item.change}
                      </TableCell>

                      <TableCell
                        className={cn(
                          "col-span-1 text-right font-mono",
                          item.isPositive ? "text-cyan-500" : "text-red-500"
                        )}
                      >
                        {item.percent}
                      </TableCell>

                      <TableCell className="col-span-1 text-right font-mono text-gray-500">
                        {item.open}
                      </TableCell>
                      <TableCell className="col-span-1 text-right font-mono text-gray-500">
                        {item.high}
                      </TableCell>
                      <TableCell className="col-span-1 text-right font-mono text-gray-500">
                        {item.low}
                      </TableCell>
                      <TableCell className="col-span-2 text-right font-mono text-gray-500">
                        {item.prev}
                      </TableCell>
                    </motion.tr>
                  ))}
                </>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
