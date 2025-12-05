/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  hierarchy,
  treemap as d3Treemap,
  HierarchyRectangularNode,
} from "d3-hierarchy";
import { Quote, useSp100Live } from "@/hooks/use-sp100-live";

gsap.registerPlugin(ScrollTrigger);

const SP100_SYMBOLS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "META",
  "GOOGL",
  "GOOG",
  "TSLA",
  "BRK-B",
  "JPM",
  "JNJ",
  "V",
  "MA",
  "AVGO",
  "HD",
  "PG",
  "LLY",
  "XOM",
  "UNH",
  "NFLX",
  "COST",
  "ADBE",
  "CRM",
  "PFE",
  "ORCL",
  "INTC",
  "AMD",
  "CVX",
  "ABT",
  "MRK",
  "TMO",
  "MCD",
  "WMT",
  "BAC",
  "DIS",
  "NKE",
  "IBM",
  "CMCSA",
  "TXN",
  "MDT",
];

type SPItem = {
  symbol: string;
  name: string;
  marketCap: number;
  price?: number;
  change: number;
};

type SPHierarchy = {
  children: SPItem[];
};

type TileNode = {
  id: string;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  symbol: string;
  name: string;
  change: number;
  price?: number;
  marketCap: number;
};

type TreemapNode = HierarchyRectangularNode<SPItem>;

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function changeToHsl(changePct: number) {
  const MAX = 5;
  const pct = clamp(changePct / MAX, -1, 1);

  const hue = pct < 0 ? 0 + pct * 10 : 120 - (1 - pct) * 15;

  const saturation = clamp(60 + Math.abs(pct) * 35, 65, 95);
  const lightness = clamp(35 + Math.abs(pct) * 20, 32, 60);

  return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
    lightness
  )}%)`;
}

export function MarketTreemap() {
  const quotes = useSp100Live(60000);
  const prevQuotesRef = useRef<Record<string, Quote>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ width: 1200, height: 600 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      setSize({
        width: Math.max(300, cr.width),
        height: Math.max(200, cr.height),
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodes: TileNode[] = useMemo(() => {
    const items: SPItem[] = SP100_SYMBOLS.map((s) => {
      const q = quotes[s] ?? prevQuotesRef.current[s] ?? {};
      const mcap = q.marketCap && q.marketCap > 0 ? q.marketCap : 1;
      return {
        symbol: s,
        name: q.name ?? s,
        price: q.price,
        change: q.change ?? 0,
        marketCap: mcap,
      };
    });

    const top20 = items.sort((a, b) => b.marketCap - a.marketCap).slice(0, 20);

    const root = hierarchy<SPHierarchy>({ children: top20 })
      .sum((d) =>
        typeof (d as any).marketCap === "number" ? (d as any).marketCap : 1
      )
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    const treemapLayout = d3Treemap<SPItem>()
      .size([size.width, size.height])
      .paddingInner(2)
      .round(true);

    treemapLayout(root as any);

    return root.leaves().map((leaf) => {
      const node = leaf as unknown as TreemapNode;
      const d = node.data;

      return {
        id: d.symbol,
        x0: node.x0,
        y0: node.y0,
        x1: node.x1,
        y1: node.y1,
        symbol: d.symbol,
        name: d.name,
        change: d.change,
        price: d.price,
        marketCap: d.marketCap,
      };
    });
  }, [quotes, size.width, size.height]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".treemap-tile", {
        opacity: 0,
        scale: 0.98,
        y: 8,
        stagger: 0.02,
        duration: 0.45,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prev = prevQuotesRef.current;
    const curr = quotes;

    Object.keys(curr).forEach((sym) => {
      const prevC = prev[sym]?.change ?? 0;
      const nextC = curr[sym]?.change ?? 0;
      if (prevC === nextC) return;

      const el = containerRef.current?.querySelector(
        `[data-symbol="${sym}"]`
      ) as HTMLElement | null;
      if (!el) return;

      gsap.fromTo(
        el,
        { backgroundColor: changeToHsl(prevC) },
        { backgroundColor: changeToHsl(nextC), duration: 0.8 }
      );
    });

    prevQuotesRef.current = { ...prevQuotesRef.current, ...curr };
  }, [quotes]);

  return (
    <Card className="bg-background border-slate-700/50 h-full p-2 relative overflow-hidden">
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="text-sm font-semibold">S&P 20 — Stocks</div>
      </div>

      <div
        ref={containerRef}
        className="mt-2 w-full rounded-md bg-[#0a0a0a] relative"
        style={{ minHeight: 420, height: 520 }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {nodes.map((n) => {
            const w = Math.max(1, n.x1 - n.x0);
            const h = Math.max(1, n.y1 - n.y0);
            return (
              <motion.div
                key={n.id}
                data-symbol={n.symbol}
                className="treemap-tile absolute rounded-sm overflow-hidden text-white shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                style={{
                  left: n.x0,
                  top: n.y0,
                  width: w,
                  height: h,
                  background: changeToHsl(n.change),
                  padding: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="text-xs font-bold truncate">{n.symbol}</div>
                <div className="text-[10px] truncate">{n.name}</div>
                <div className="text-[10px] font-mono text-right">
                  {n.change >= 0 ? "+" : ""}
                  {n.change.toFixed(2)}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
