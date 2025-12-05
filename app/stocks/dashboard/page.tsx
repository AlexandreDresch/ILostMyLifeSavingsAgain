import { MarketChart } from "@/components/stocks/market-chart";
import { MarketTable } from "@/components/stocks/market-table";
import { MarketTreemap } from "@/components/stocks/market-treemap";
import { NewsFeed } from "@/components/stocks/news-feed";

export default function Dashboard() {
  return (
    <section className="p-4 md:p-6 space-y-6 max-w-[1920px] mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-4 flex flex-col gap-6">
          <MarketChart />
        </div>

        <div className="xl:col-span-8">
          <MarketTreemap />
        </div>

        <div className="xl:col-span-4">
          <NewsFeed />
        </div>

        <div className="xl:col-span-8 min-h-0 overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            <MarketTable />
          </div>
        </div>
      </div>
    </section>
  );
}
