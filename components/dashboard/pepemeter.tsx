"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface PepemeterProps {
  income: number;
  outcome: number;
  variant?: "income" | "investment";
  title?: string;
}

type IncomePepeState = "sad" | "worried" | "neutral" | "happy" | "rich";
type InvestmentPepeState = "stonks" | "rekt";

const getIncomePepeState = (ratio: number): IncomePepeState => {
  if (ratio < 0.5) return "sad";
  if (ratio < 0.8) return "worried";
  if (ratio < 1.2) return "neutral";
  if (ratio < 1.5) return "happy";
  return "rich";
};

const getInvestmentPepeState = (ratio: number): InvestmentPepeState => {
  return ratio >= 1 ? "stonks" : "rekt";
};

const incomeDescriptions: Record<IncomePepeState, string> = {
  sad: "Your paycheck vanished faster than your dreams.",
  worried: "Ramen’s looking like a lifestyle choice.",
  neutral: "You’re scraping by, barely.",
  happy: "Bills paid, with change for coffee.",
  rich: "Taxman’s knocking, but you’re balling.",
};

const investmentDescriptions: Record<InvestmentPepeState, string> = {
  stonks: "Mooning like it’s 2021. Enjoy it while it lasts.",
  rekt: "Your portfolio’s a meme token in a bear market.",
};

const incomeImages: Record<IncomePepeState, string> = {
  sad: "/pepe/sad.png",
  worried: "/pepe/worried.png",
  neutral: "/pepe/neutral.png",
  happy: "/pepe/happy.png",
  rich: "/pepe/rich.gif",
};

const investmentImages: Record<InvestmentPepeState, string> = {
  stonks: "/pepe/stonks.png",
  rekt: "/pepe/rekt.png",
};

export default function Pepemeter({
  income,
  outcome,
  variant = "income",
  title = "Fiscal Judgment",
}: PepemeterProps) {
  const ratio = outcome > 0 ? income / outcome : 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const pepeRef = useRef<HTMLImageElement>(null);

  const { pepeState } =
    variant === "income"
      ? {
          pepeState: getIncomePepeState(ratio),
        }
      : {
          pepeState: getInvestmentPepeState(ratio),
        };

  const difference = income - outcome;
  const percentageRatio = ((ratio - 1) * 100).toFixed(1);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden size-full border border-gray-900/50 flex flex-col justify-between`}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="mb-4">
          <h3 className="text-gray-300 text-xs font-medium mb-1">{title}</h3>
          <p className="text-gray-400/60 text-[10px]">
            {variant === "investment"
              ? "Your Bet Against Fate"
              : "Your Daily Grind"}
          </p>
        </div>

        <motion.div
          className="text-center mb-4"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Image
            ref={pepeRef}
            src={
              variant === "income"
                ? incomeImages[pepeState as IncomePepeState]
                : investmentImages[pepeState as InvestmentPepeState]
            }
            alt={`Pepe ${pepeState}`}
            width={128}
            height={128}
            className="mx-auto object-contain"
            unoptimized={pepeState === "rich" && variant === "income"} // For GIFs
          />
        </motion.div>

        <motion.p
          key={pepeState}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-200 text-center text-xs font-medium mt-2"
        >
          {variant === "income"
            ? incomeDescriptions[pepeState as IncomePepeState]
            : investmentDescriptions[pepeState as InvestmentPepeState]}
        </motion.p>

        <div className="grid-cols-2 gap-2 mt-2 hidden xl:grid">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-black/30 backdrop-blur-sm rounded p-2 border border-gray-800/50"
          >
            <p className="text-gray-400/60 text-[10px]">
              {variant === "investment" ? "Gains" : "Earnings"}
            </p>
            <p className="text-gray-200 text-sm font-bold">
              ${income.toLocaleString()}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-black/30 backdrop-blur-sm rounded p-2 border border-gray-800/50"
          >
            <p className="text-gray-400/60 text-[10px]">
              {variant === "investment" ? "Losses" : "Spent"}
            </p>
            <p className="text-gray-200 text-sm font-bold">
              ${outcome.toLocaleString()}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mt-4"
        >
          <p
            className={`text-xs font-bold ${
              difference >= 0 ? "text-green-500" : "text-red-600"
            }`}
          >
            {difference >= 0 ? "+" : ""}${difference.toLocaleString()}
          </p>
          <p className="text-gray-400/60 text-[10px] mt-1">
            {percentageRatio}% {difference >= 0 ? "above water" : "in the red"}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
