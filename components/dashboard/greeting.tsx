"use client";

import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { TextRotate } from "@/components/text-rotate";
import { dashboardGreetingWords } from "@/constants";

export default function Greeting() {
  return (
    <LayoutGroup>
      <motion.p className="flex whitespace-pre border px-4 py-2 rounded-sm" layout>
        <motion.span
          className="pt-0.5 sm:pt-1 md:pt-0"
          layout
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
        >
          Make your expenses{" "}
        </motion.span>
        <TextRotate
          texts={dashboardGreetingWords}
          mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] dark:bg-[#ff4d94] overflow-hidden py-0.5 sm:py-1 md:py-0 justify-center rounded-sm"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </motion.p>
    </LayoutGroup>
  );
}
