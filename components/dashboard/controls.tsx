"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Wallet } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

export default function Controls() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="text-slate-100 text-base">
              Environment Controls
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center">
                <Wallet className="text-cyan-500 mr-2 h-4 w-4" />

                <Label className="text-sm text-slate-400">
                  Show Investments
                </Label>
              </div>

              <Switch />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
