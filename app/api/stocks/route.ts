/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

const SP100_SYMBOLS = [
  "AAPL","MSFT","NVDA","AMZN","META","GOOGL","TSLA","BRK-B","JPM",
  "JNJ","V","MA","AVGO","HD","PG","LLY","XOM","UNH","NFLX","COST",
  "ADBE","CRM","PFE","ORCL","INTC","AMD","CVX","ABT","MRK","TMO",
  "MCD","WMT","BAC","DIS","NKE","IBM","CMCSA","TXN","MDT"
];

const API_KEY = process.env.FINNHUB_API_KEY;
const CACHE_MS = 20_000;

let cache: any = null;
let lastFetch = 0;

export async function GET() {
  const now = Date.now();

  if (cache && now - lastFetch < CACHE_MS) {
    return NextResponse.json(cache);
  }

  const results: Record<string, any> = {};

  const quotePromises = SP100_SYMBOLS.map(async (symbol) => {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;
    try {
      const res = await fetch(url);
      results[symbol] = { symbol, quote: await res.json() };
    } catch {
      results[symbol] = { symbol, quote: null };
    }
  });

  await Promise.all(quotePromises);

  const profilePromises = Object.keys(results).map(async (symbol) => {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`;
    try {
      const res = await fetch(url);
      const json = await res.json();

      if (json.marketCapitalization) {
        results[symbol].marketCap = json.marketCapitalization * 1_000_000;
      }
      if (json.name) {
        results[symbol].name = json.name;
      }
    } catch {
    }
  });

  await Promise.all(profilePromises);

  cache = results;
  lastFetch = now;

  return NextResponse.json(results);
}
