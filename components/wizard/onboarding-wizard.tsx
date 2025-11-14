"use client";

import { useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Edit2 } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { CurrencyComboBox } from "../currency-combo-box";
import type { Currency } from "@/types";
import {
  experienceLevels,
  financialGoals,
  investmentTypes,
  languages,
  spendingHabits,
} from "@/constants";

const transitionProps: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
};

function ChipButton({
  label,
  isSelected,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      layout
      initial={false}
      animate={{
        backgroundColor: isSelected ? "#06b6d4" : "rgba(39, 39, 42, 0.5)",
      }}
      whileHover={{
        backgroundColor: isSelected ? "#06b6d4" : "rgba(39, 39, 42, 0.8)",
      }}
      whileTap={{
        backgroundColor: isSelected ? "#0891b2" : "rgba(39, 39, 42, 0.9)",
      }}
      transition={{
        ...transitionProps,
        backgroundColor: { duration: 0.1 },
      }}
      className={`
        inline-flex items-center px-4 py-2 rounded-lg text-base font-medium
        whitespace-nowrap overflow-hidden ring-1 ring-inset
        ${
          isSelected
            ? "text-white ring-cyan-500/50"
            : "text-zinc-400 ring-[hsla(0,0%,100%,0.06)]"
        }
      `}
    >
      <motion.div
        className="relative flex items-center"
        animate={{
          width: isSelected ? "auto" : "100%",
          paddingRight: isSelected ? "1.5rem" : "0",
        }}
        transition={{
          ease: [0.175, 0.885, 0.32, 1.275],
          duration: 0.3,
        }}
      >
        <span>{label}</span>
        <AnimatePresence>
          {isSelected && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={transitionProps}
              className="absolute right-0"
            >
              <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                <Check className="w-3 h-3 text-black" strokeWidth={1.5} />
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [selectedInvestments, setSelectedInvestments] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  const totalSteps = 8;

  const toggleInvestment = (investment: string) => {
    setSelectedInvestments((prev) =>
      prev.includes(investment)
        ? prev.filter((i) => i !== investment)
        : [...prev, investment]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const toggleHabit = (habit: string) => {
    setSelectedHabits((prev) =>
      prev.includes(habit) ? prev.filter((h) => h !== habit) : [...prev, habit]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Preferences submitted:", {
      language: selectedLanguage,
      currency: selectedCurrency?.label,
      investments: selectedInvestments,
      experience: selectedExperience,
      goals: selectedGoals,
      habits: selectedHabits,
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return selectedLanguage !== "";
      case 3:
        return selectedCurrency !== null;
      case 4:
        return selectedInvestments.length > 0;
      case 5:
        return selectedExperience !== "";
      case 6:
        return selectedGoals.length > 0;
      case 7:
        return selectedHabits.length > 0;
      case 8:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-full w-full flex justify-center pt-48 pb-24 px-6">
      <div className="w-full max-w-7xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-zinc-400 text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="flex gap-4 justify-between">
                <div className="w-full max-w-3xl">
                  <h1 className="text-white text-xl font-semibold mb-4">
                    First of all, we need to know you.
                  </h1>
                  <p className="text-zinc-400 text-base mb-12">
                    We’re not here to creep on you, just to map out your
                    financial mess. Drop a few details to customize your hustle
                    and keep your wallet from vanishing. Quicker than your last
                    late-night scroll.
                  </p>
                </div>
                <div className="hidden md:flex flex-col justify-end items-end h-full">
                  <Image
                    src="/pepe/pepe-wizard.png"
                    alt="Onboarding Pepe Illustration"
                    width={300}
                    height={200}
                    priority
                    className=""
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  What’s your language vibe?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Pick a language so we don’t make you read hieroglyphs.
                </p>
                <motion.div
                  className="flex flex-wrap gap-3 overflow-visible"
                  layout
                  transition={transitionProps}
                >
                  {languages.map((language) => (
                    <ChipButton
                      key={language}
                      label={language}
                      isSelected={selectedLanguage === language}
                      onClick={() => setSelectedLanguage(language)}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  What’s your favorite currency?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Pick a currency so your numbers don’t look like monopoly
                  money.
                </p>
                <div className="max-w-xs">
                  <CurrencyComboBox onCurrencySelect={setSelectedCurrency} />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  What investments are you playing with?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Select all that apply — we’ll track ‘em manually or sync with
                  a broker if you’re fancy.
                </p>
                <motion.div
                  className="flex flex-wrap gap-3 overflow-visible"
                  layout
                  transition={transitionProps}
                >
                  {investmentTypes.map((investment) => (
                    <ChipButton
                      key={investment}
                      label={investment}
                      isSelected={selectedInvestments.includes(investment)}
                      onClick={() => toggleInvestment(investment)}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {currentStep === 5 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  How much of a money nerd are you?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Tell us your experience level so we don’t overwhelm you (or
                  bore you).
                </p>
                <motion.div
                  className="flex flex-wrap gap-3 overflow-visible"
                  layout
                  transition={transitionProps}
                >
                  {experienceLevels.map((level, index) => (
                    <ChipButton
                      key={level}
                      label={`${index + 1} - ${level}`}
                      isSelected={selectedExperience === level}
                      onClick={() => setSelectedExperience(level)}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {currentStep === 6 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  What’s your financial endgame?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Select all that apply to set your budgeting goals.
                </p>
                <motion.div
                  className="flex flex-wrap gap-3 overflow-visible"
                  layout
                  transition={transitionProps}
                >
                  {financialGoals.map((goal) => (
                    <ChipButton
                      key={goal}
                      label={goal}
                      isSelected={selectedGoals.includes(goal)}
                      onClick={() => toggleGoal(goal)}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {currentStep === 7 && (
              <div>
                <h1 className="text-white text-xl font-semibold mb-4">
                  What’s draining your wallet?
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Pick your spending vices so we can roast them later.
                </p>
                <motion.div
                  className="flex flex-wrap gap-3 overflow-visible"
                  layout
                  transition={transitionProps}
                >
                  {spendingHabits.map((habit) => (
                    <ChipButton
                      key={habit}
                      label={habit}
                      isSelected={selectedHabits.includes(habit)}
                      onClick={() => toggleHabit(habit)}
                    />
                  ))}
                </motion.div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="w-full max-w-full">
                <h1 className="text-white text-xl font-semibold mb-4">
                  Check Your Money Vibe
                </h1>
                <p className="text-zinc-400 text-base mb-12">
                  Review your picks before we lock in your financial glow-up.
                </p>
                <div className="space-y-6">
                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">Language</h3>
                      <Button
                        onClick={() => setCurrentStep(2)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <p className="text-zinc-400">
                      {selectedLanguage || "Not selected"}
                    </p>
                  </div>

                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">Currency</h3>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <p className="text-zinc-400">
                      {selectedCurrency?.label || "Not selected"}
                    </p>
                  </div>

                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">Investments</h3>
                      <Button
                        onClick={() => setCurrentStep(4)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedInvestments.length > 0 ? (
                        selectedInvestments.map((investment) => (
                          <span
                            key={investment}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-500 rounded-full text-sm"
                          >
                            {investment}
                          </span>
                        ))
                      ) : (
                        <p className="text-zinc-400">None selected</p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">
                        Experience Level
                      </h3>
                      <Button
                        onClick={() => setCurrentStep(5)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <p className="text-zinc-400">
                      {selectedExperience
                        ? `${
                            experienceLevels.indexOf(selectedExperience) + 1
                          } - ${selectedExperience}`
                        : "Not selected"}
                    </p>
                  </div>

                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">
                        Financial Goals
                      </h3>
                      <Button
                        onClick={() => setCurrentStep(6)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedGoals.length > 0 ? (
                        selectedGoals.map((goal) => (
                          <span
                            key={goal}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-500 rounded-full text-sm"
                          >
                            {goal}
                          </span>
                        ))
                      ) : (
                        <p className="text-zinc-400">None selected</p>
                      )}
                    </div>
                  </div>

                  <div className="p-6 border border-zinc-800 bg-[rgba(25,25,28,0)] rounded-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-medium">
                        Spending Habits
                      </h3>
                      <Button
                        onClick={() => setCurrentStep(7)}
                        className="cursor-pointer text-cyan-500 hover:text-cyan-600 transition-colors flex items-center gap-1 text-sm"
                      >
                        <Edit2 className="size-3" />
                        Edit
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedHabits.length > 0 ? (
                        selectedHabits.map((habit) => (
                          <span
                            key={habit}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-500 rounded-full text-sm"
                          >
                            {habit}
                          </span>
                        ))
                      ) : (
                        <p className="text-zinc-400">None selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-between items-center">
          <Button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-sm font-medium transition-all ${
              currentStep === 1 && "opacity-0 pointer-events-none"
            }`}
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 cursor-pointer px-6 py-3 rounded-sm font-medium transition-all ${
                canProceed()
                  ? "bg-cyan-500 text-white hover:bg-cyan-600"
                  : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
              }`}
            >
              {currentStep === 1 ? "Let’s Go" : "Next"}
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-sm cursor-pointer font-medium bg-cyan-500 text-white hover:bg-cyan-600 transition-all"
            >
              Submit
              <Check className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
