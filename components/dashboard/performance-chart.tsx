/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
} from "lucide-react";
import { format, parseISO, startOfWeek, endOfWeek } from "date-fns";

interface FinancialData {
  Date: string;
  "Transaction ID": string;
  Category: string;
  Amount: number;
  Type: string;
  Description: string;
  Month: string;
  Year: number;
  Day: string;
  Account: string;
  Status: string;
}

interface FinancialTrendChartProps {
  data: FinancialData[];
}

type VisibleLines = {
  income: boolean;
  outcome: boolean;
  investments: boolean;
};

export default function PerformanceChart({
  data,
}: FinancialTrendChartProps) {
  const [visibleLines] = useState<VisibleLines>({
    income: true,
    outcome: true,
    investments: true,
  });

  const chartData = useMemo(() => {
    const weeklyData = data.reduce((acc, item) => {
      if (!item.Date || !item.Amount || item.Amount <= 0) return acc;

      let dateStr: string;
      try {
        const dateValue = item.Date;
        if (typeof dateValue === "string") {
          if (dateValue.includes("T")) {
            dateStr = dateValue.split("T")[0];
          } else if (dateValue.includes(" ")) {
            dateStr = dateValue.split(" ")[0];
          } else {
            dateStr = dateValue;
          }
        } else {
          dateStr = new Date(dateValue).toISOString().split("T")[0];
        }

        if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          return acc;
        }
      } catch (error) {
        console.error("Date parsing error:", error, item.Date);
        return acc;
      }

      const date = parseISO(dateStr);
      const amount = Number(item.Amount) || 0;
      const type = String(item.Type || "")
        .trim()
        .toUpperCase();

      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(date, { weekStartsOn: 1 });

      const weekKey = format(weekStart, "yyyy-MM-dd");

      if (!acc[weekKey]) {
        acc[weekKey] = {
          date: weekKey,
          weekStart: weekStart,
          weekEnd: weekEnd,
          weekLabel: `${format(weekStart, "MMM d")} - ${format(
            weekEnd,
            "MMM d"
          )}`,
          income: 0,
          outcome: 0,
          investments: 0,
          netFlow: 0,
        };
      }

      if (type === "INCOME" || type === "REVENUE" || type === "I") {
        acc[weekKey].income += amount;
        acc[weekKey].netFlow += amount;
      } else if (
        type === "OUTCOME" ||
        type === "EXPENSE" ||
        type === "O" ||
        type === "E"
      ) {
        acc[weekKey].outcome += amount;
        acc[weekKey].netFlow -= amount;
      } else if (type === "INVESTMENT" || type === "INVEST" || type === "V") {
        acc[weekKey].investments += amount;
        acc[weekKey].netFlow -= amount;
      }

      return acc;
    }, {} as Record<string, any>);

    return Object.values(weeklyData)
      .sort((a: any, b: any) => a.date.localeCompare(b.date))
      .map((item: any) => ({
        ...item,
        income: Math.round(item.income),
        outcome: Math.round(item.outcome),
        investments: Math.round(item.investments),
        netFlow: Math.round(item.netFlow),
      }));
  }, [data]);

  return (
    <Card className="bg-card">
      <CardContent className="space-y-6">
        <div className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="weekLabel"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    const formattedValue = `$${value.toLocaleString()}`;
                    const labelMap: { [key: string]: string } = {
                      income: "Income",
                      outcome: "Expenses",
                      investments: "Investments",
                      netFlow: "Net Flow",
                    };
                    return [formattedValue, labelMap[name] || name];
                  }}
                  labelFormatter={(label) => `Week: ${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                {visibleLines.income && (
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="oklch(71.5% 0.143 215.221)"
                    strokeWidth={2}
                    dot={false}
                    name="Income"
                  />
                )}
                {visibleLines.outcome && (
                  <Line
                    type="monotone"
                    dataKey="outcome"
                    stroke="oklch(62.7% 0.265 303.9)"
                    strokeWidth={2}
                    dot={false}
                    name="Expenses"
                  />
                )}
                {visibleLines.investments && (
                  <Line
                    type="monotone"
                    dataKey="investments"
                    stroke="oklch(62.3% 0.214 259.815)"
                    strokeWidth={2}
                    dot={false}
                    name="Investments"
                    strokeDasharray="5 5"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">
                  No financial data available
                </p>
                <p className="text-muted-foreground text-sm">
                  Total records: {data.length} | With Amount:{" "}
                  {data.filter((r) => r.Amount && r.Amount > 0).length}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
