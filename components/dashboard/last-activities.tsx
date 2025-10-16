"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ActivityItem from "./activity-item";
import { motion } from "framer-motion";

export default function LastActivities() {
  const activities = [
    {
      type: "income" as const,
      time: "2 hours ago",
      description: "Received payment of $500 from Client A",
    },
    {
      type: "outcome" as const,
      time: "5 hours ago",
      description: "Paid $200 for office supplies",
    },
    {
      type: "investment" as const,
      time: "1 day ago",
      description: "Invested $1000 in Stock XYZ",
    },
    {
      type: "income" as const,
      time: "2 days ago",
      description: "Received payment of $750 from Client B",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mt-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <motion.div className="flex items-center" whileHover={{ x: 4 }}>
            <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
            <CardTitle className="text-slate-100 text-base">
              Last Activities
            </CardTitle>
          </motion.div>
          <Badge
            variant="outline"
            className="bg-slate-800/50 text-blue-400 border-blue-500/50"
          >
            {activities.length} New Updates
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <ActivityItem
                key={index}
                type={activity.type}
                time={activity.time}
                description={activity.description}
                index={index}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
