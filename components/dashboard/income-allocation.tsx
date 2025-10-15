"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "spring" as const,
      stiffness: 100,
    },
  },
} as const;

interface AllocationItemProps {
  label: string;
  percentage: number;
  width: number;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
}

function AllocationItem({
  label,
  percentage,
  width,
  gradientFrom,
  gradientTo,
  textColor,
}: AllocationItemProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(progressRef, { once: true });

  useEffect(() => {
    if (isInView && progressRef.current && percentRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${width}%`,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        percentRef.current,
        { innerText: "0" },
        {
          innerText: percentage,
          duration: 1.5,
          ease: "power2.out",
          delay: 0.3,
          snap: { innerText: 1 },
          onUpdate: () => {
            if (percentRef.current) {
              percentRef.current.innerText =
                Math.round(Number.parseFloat(percentRef.current.innerText)) +
                "%";
            }
          },
        }
      );

      gsap.to(progressRef.current, {
        boxShadow: `0 0 20px ${gradientFrom}80`,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isInView, width, percentage, gradientFrom]);

  return (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-sm text-slate-400">{label}</div>
        <div ref={percentRef} className={`text-xs ${textColor}`}>
          0%
        </div>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-full`}
          style={{ width: "0%" }}
        />
      </div>
    </motion.div>
  );
}

export default function IncomeAllocation() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ type: "spring" as const, stiffness: 300 }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">
            Income Allocation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={containerVariants}>
            <AllocationItem
              label="Income"
              percentage={42}
              width={42}
              gradientFrom="from-cyan-500"
              gradientTo="to-blue-500"
              textColor="text-cyan-400"
            />
            <AllocationItem
              label="Outcome"
              percentage={18}
              width={68}
              gradientFrom="from-purple-500"
              gradientTo="to-pink-500"
              textColor="text-purple-400"
            />
            <AllocationItem
              label="Investment"
              percentage={35}
              width={35}
              gradientFrom="from-blue-500"
              gradientTo="to-indigo-500"
              textColor="text-blue-400"
            />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
