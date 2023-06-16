import { HistoricalComputingChart } from "@/components/charts/HistoricalComputing";
import HistoricalPriceChart from "@/components/charts/HistoricalPrice";
import { HistoricalSpecs } from "@/components/charts/HistoricalSpecs";
import { NetworkVersionAdoption } from "@/components/charts/NetworkVersions";
import { useState } from "react";
export default function Home() {
  const [showAnnotations, setShowAnnotations] = useState(false);
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-12 -mb-4 -mt-4 col-span-12">
        <h1 className="text-2xl font-medium dark:text-gray-300">
          Historical Statistics
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 col-span-12 gap-4">
        <HistoricalSpecs
          endpoint="v1/network/historical/stats"
          title="Providers Online"
          colors={["#3F51B5"]}
          yaxisLabel="Providers"
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
        />
        <HistoricalSpecs
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
          endpoint="v1/network/historical/stats"
          title="Amount of Cores"
          colors={["#3F51B5"]}
          yaxisLabel="Cores"
        />
        <HistoricalSpecs
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
          endpoint="v1/network/historical/stats"
          title="TB of Memory"
          colors={["#3F51B5"]}
          yaxisLabel="Memory"
        />
        <HistoricalSpecs
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
          endpoint="v1/network/historical/stats"
          title="TB of Disk"
          colors={["#3F51B5"]}
          yaxisLabel="Disk"
        />
      </div>
      <div className="col-span-12 lg:col-span-6 md:col-span-6">
        <HistoricalPriceChart
          endpoint="v1/network/historical/pricing/median"
          title="Provider Median Pricing"
          palette={["#FFED29", "#FF5289", "#00096B"]}
          allDataPoints={true}
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
        />
      </div>
      <div className="col-span-12 lg:col-span-6 md:col-span-6">
        <HistoricalPriceChart
          endpoint="v1/network/historical/pricing/average"
          title="Provider Average Pricing"
          palette={["#FFED29", "#FF5289", "#00096B"]}
          allDataPoints={true}
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
        />
      </div>
      <div className="col-span-12 ">
        <HistoricalComputingChart
          endpoint="v1/network/historical/provider/computing"
          title="Providers computing simultaneously"
          colors="#0230FF"
          showAnnotations={showAnnotations}
          setShowAnnotations={setShowAnnotations}
        />
      </div>
      <div className="col-span-12">
        <NetworkVersionAdoption />
      </div>
    </div>
  );
}
