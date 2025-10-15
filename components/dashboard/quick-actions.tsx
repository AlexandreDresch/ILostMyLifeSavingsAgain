"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, RefreshCw, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function QuickActions() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-slate-100 text-base">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={containerVariants}
          >
            <motion.div variants={buttonVariants}>
              <Button
                variant="outline"
                className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full transition-all"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="h-5 w-5 text-cyan-500" />

                  <span className="text-xs">Sync Data</span>
                </motion.button>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button
                variant="outline"
                className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full transition-all"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-5 w-5 text-cyan-500" />

                  <span className="text-xs">Backup</span>
                </motion.button>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button
                variant="outline"
                className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full transition-all"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-5 w-5 text-cyan-500" />

                  <span className="text-xs">Settings</span>
                </motion.button>
              </Button>
            </motion.div>

            <motion.div variants={buttonVariants}>
              <Button
                variant="outline"
                className="h-auto py-3 px-3 !border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full transition-all"
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="h-5 w-5 text-cyan-500" />

                  <span className="text-xs">Support</span>
                </motion.button>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
