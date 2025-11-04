"use client";

import { motion } from "framer-motion";

import ShinyButton from "./shiny-button";

export default function Cta() {
  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-br from-black to-primary/80 text-primary-foreground relative overflow-hidden flex justify-center">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="container px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Are you convinced enough?
          </h2>
          <p className="mx-auto max-w-[700px] text-slate-300">
            Stop doomscrolling online and join the crew crushing their finances.
            Track every penny, dodge impulse buys, and outsmart market dips
            with a platform sharper than your best call — make the move.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <ShinyButton>Join The Movement</ShinyButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
