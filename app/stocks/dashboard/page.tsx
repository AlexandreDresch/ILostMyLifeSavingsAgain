import { MarketChart } from "@/components/stocks/market-chart";

export default function Dashboard() {
  return (
    <section className="p-4 md:p-6 space-y-6 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 flex flex-col gap-6">
          <MarketChart />
        </div>
      </div>
    </section>
  );
}
