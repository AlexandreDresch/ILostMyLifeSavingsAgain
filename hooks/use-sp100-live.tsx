/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export type Quote = {
  symbol: string;
  price?: number;
  change?: number;
  marketCap?: number;
  name?: string;
};

export function useSp100Live(refreshMs = 20000) {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    let mounted = true;

    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/stocks");
        if (!res.ok) return;

        const json = await res.json();
        if (!mounted) return;

        const map: Record<string, Quote> = {};
        Object.entries(json).forEach(([symbol, s]: any) => {
          map[symbol] = {
            symbol,
            price: s.quote?.c ?? s.c ?? 0,
            change: s.quote?.dp ?? s.dp ?? 0,
            marketCap: s.marketCap ?? 1,
            name: s.name ?? symbol,
          };
        });

        setQuotes(map);
      } catch (err) {
        console.error("Stock fetch error:", err);
      }
    };

    fetchQuotes();
    const id = setInterval(fetchQuotes, refreshMs);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [refreshMs]);

  return quotes;
}
