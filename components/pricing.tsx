"use client";

import { motion } from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import Link from "next/link";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => {},
});

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you. All plans include our core features and support.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        ref={containerRef}
        className="relative w-full bg-background py-20 sm:py-24"
      >
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <h2 className="text-4xl font-semibold tracking-wide sm:text-5xl">
              {title}
            </h2>
            <p className="text-slate-300 text-lg whitespace-pre-line">
              {description}
            </p>
          </div>
          <PricingToggle />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 items-start gap-8">
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit items-center rounded-full p-1">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary p-1"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            !isMonthly
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Annual
          <span
            className={cn(
              "hidden sm:inline",
              !isMonthly ? "text-primary-foreground/80" : ""
            )}
          >
            {" "}
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      className={cn(
        "rounded-2xl p-8 flex flex-col relative bg-background/70 backdrop-blur-sm",
        plan.isPopular
          ? "border border-cyan-500 shadow-xl"
          : "border border-slate-700/50"
      )}
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-cyan-500 py-1.5 px-4 rounded-full flex items-center gap-1.5">
            <LucideStar className="text-primary-foreground h-4 w-4 fill-current" />
            <span className="text-primary-foreground text-sm font-semibold">
              Most Popular
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          <span className="text-5xl font-bold tracking-tight text-foreground">
            <NumberFlow
              value={isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)}
              format={{
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
              }}
              className="font-variant-numeric: tabular-nums"
            />
          </span>
          <span className="text-sm font-semibold leading-6 tracking-wide text-muted-foreground">
            / {plan.period}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {isMonthly ? "Billed Monthly" : "Billed Annually"}
        </p>

        <ul
          role="list"
          className="mt-8 space-y-3 text-sm leading-6 text-left text-muted-foreground"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check
                className="h-6 w-5 flex-none text-primary"
                aria-hidden="true"
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            href={plan.href}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),

              "w-full",
              plan.isPopular && "!border-cyan-500"
            )}
          >
            {plan.buttonText}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
