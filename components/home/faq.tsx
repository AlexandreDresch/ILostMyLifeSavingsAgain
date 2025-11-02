"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqCategories } from "@/constants";

export function FAQ() {
  const categories = faqCategories.reduce((acc, curr) => {
    acc[curr.category] = curr.category;
    return acc;
  }, {} as Record<string, string>);

  const faqData = faqCategories.reduce((acc, curr) => {
    acc[curr.category] = curr.faqs;
    return acc;
  }, {} as Record<string, { question: string; answer: string }[]>);
  const categoryKeys = Object.keys(categories);
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background px-4 py-12 text-foreground"
      )}
    >
      <FAQHeader
        title={"Frequently Asked Questions"}
        subtitle={"Let's answer some questions"}
      />
      <FAQTabs
        categories={categories}
        selected={selectedCategory}
        setSelected={setSelectedCategory}
      />
      <FAQList faqData={faqData} selected={selectedCategory} />
    </section>
  );
}

function FAQHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center">
      <span className="mb-8 bg-gradient-to-r from-slate-400 to-slate-400/60 bg-clip-text font-medium text-transparent">
        {subtitle}
      </span>
      <h2 className="mb-8 text-5xl font-bold">{title}</h2>
      <span className="absolute -top-[350px] left-[50%] z-0 h-[500px] w-[600px] -translate-x-[50%] rounded-full bg-gradient-to-r from-slate-500/10 to-slate-500/5 blur-3xl" />
    </div>
  );
}

function FAQTabs({
  categories,
  selected,
  setSelected,
}: {
  categories: { [key: string]: string };
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
      {Object.entries(categories).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setSelected(key)}
          className={cn(
            "relative overflow-hidden whitespace-nowrap rounded-sm border px-3 py-1.5 text-sm font-medium",
            selected === key
              ? "border-slate-200 text-cyan-500"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="relative z-10">{label}</span>

          <motion.span
            initial={false}
            animate={{
              clipPath:
                selected === key
                  ? "inset(0% 0% 0% 0%)"
                  : "inset(100% 0% 0% 0%)",
            }}
            transition={{ duration: 0.5, ease: "backInOut" }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-white to-white/80"
          />
        </button>
      ))}
    </div>
  );
}

function FAQList({
  faqData,
  selected,
}: {
  faqData: { [key: string]: { question: string; answer: string }[] };
  selected: string;
}) {
  return (
    <div className="mx-auto mt-12 max-w-4xl">
      <AnimatePresence mode="wait">
        {Object.entries(faqData).map(([category, questions]) => {
          if (selected === category) {
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "backIn" }}
                className="space-y-4"
              >
                {questions.map((faq, index) => (
                  <FAQItem key={index} {...faq} />
                ))}
              </motion.div>
            );
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "border-b border-t border-slate-300 transition-colors",
        isOpen ? "bg-muted/50" : "bg-card"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span
          className={cn(
            "text-lg font-medium transition-colors",
            isOpen ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {question}
        </span>
        <motion.span
          variants={{
            open: { rotate: "180deg" },
            closed: { rotate: "0deg" },
          }}
          transition={{ duration: 0.4 }}
        >
          <ChevronDown
            className={cn(
              "size-5 transition-colors",
              isOpen ? "text-cyan-300" : "text-cyan-500"
            )}
          />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : "0px",
          marginBottom: isOpen ? "16px" : "0px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-4"
      >
        <p className="text-muted-foreground">{answer}</p>
      </motion.div>
    </motion.div>
  );
}
