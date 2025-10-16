"use client";

import {
  Activity,
  ArrowBigUpDash,
  BanknoteArrowDown,
  BanknoteArrowUp,
  List,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import MetricCard from "./metric-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PerformanceChart from "./performance-chart";
import InvestmentItem from "./investment-item";
import LastActivities from "./last-activities";

export default function Overview() {
  return (
    <div className="grid gap-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-slate-700/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-cyan-500" />
              Month Overview
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                LIVE
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Income"
              value={10000}
              icon={BanknoteArrowUp}
              trend="up"
              color="cyan"
              detail="3% increase from last month"
            />
            <MetricCard
              title="Outcome"
              value={2000}
              icon={BanknoteArrowDown}
              trend="stable"
              color="purple"
              detail="1.5% decrease from last month"
            />
            <MetricCard
              title="Investment"
              value={3000}
              icon={Wallet}
              trend="down"
              color="blue"
              detail="5% decrease from last month"
            />
          </div>

          <div className="mt-8">
            <Tabs defaultValue="chart" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-slate-800/50 p-1">
                  <TabsTrigger
                    value="chart"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Chart View
                  </TabsTrigger>
                  <TabsTrigger
                    value="list"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    value="investment"
                    className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                  >
                    Investments
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                    Income
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                    Outcome
                  </div>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                    Investment
                  </div>
                </div>
              </div>

              <TabsContent value="chart" className="mt-0">
                <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <PerformanceChart />
                  <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Summary</div>
                    <div className="text-lg font-mono text-cyan-400 flex">
                      <span className="ml-2">{10}%</span>
                      <ArrowBigUpDash size={20} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                  <List />
                </div>
              </TabsContent>

              <TabsContent value="investment" className="mt-0">
                <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InvestmentItem
                      name="Apple Inc."
                      initialPrice={150}
                      price={170}
                      type="Stock"
                    />
                    <InvestmentItem
                      name="Tesla, Inc."
                      initialPrice={600}
                      price={580}
                      type="Stock"
                    />
                    <InvestmentItem
                      name="Bitcoin"
                      initialPrice={30000}
                      price={32000}
                      type="Crypto"
                    />
                    <InvestmentItem
                      name="Ethereum"
                      initialPrice={2000}
                      price={2100}
                      type="Crypto"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <LastActivities />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
