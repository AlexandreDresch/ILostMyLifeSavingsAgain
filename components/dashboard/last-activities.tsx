import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import ActivityItem from "./activity-item";

export default function LastActivities() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm mt-6">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-slate-100 flex items-center text-base">
          <AlertCircle className="mr-2 h-5 w-5 text-blue-500" />
          Last Activities
        </CardTitle>
        <Badge
          variant="outline"
          className="bg-slate-800/50 text-blue-400 border-blue-500/50"
        >
          4 New Updates
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <ActivityItem
            type="income"
            time="2 hours ago"
            description="Received payment of $500 from Client A"
          />
          <ActivityItem
            type="outcome"
            time="5 hours ago"
            description="Paid $200 for office supplies"
          />
          <ActivityItem
            type="investment"
            time="1 day ago"
            description="Invested $1000 in Stock XYZ"
          />
          <ActivityItem
            type="income"
            time="2 days ago"
            description="Received payment of $750 from Client B"
          />
        </div>
      </CardContent>
    </Card>
  );
}
