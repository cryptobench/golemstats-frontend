import MedianLive from "@/components/charts/MedianLive"
import HistoricalPriceChart from "@/components/charts/HistoricalPrice"
import { useState } from "react"
export default function Home() {
    const [showAnnotations, setShowAnnotations] = useState(false)
    return (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-12 -mb-4 -mt-4">
                <h1 className="text-2xl font-medium dark:text-gray-300">Pricing Analytics</h1>
            </div>
            <div className="lg:col-span-6">
                <HistoricalPriceChart
                    endpoint="v1/network/historical/pricing/median"
                    title="Median Pricing"
                    palette={["#FFED29", "#FF5289", "#00096B"]}
                    allDataPoints={false}
                    paragraph="The past week"
                    showAnnotations={showAnnotations}
                    setShowAnnotations={setShowAnnotations}
                />
            </div>
            <div className="lg:col-span-6">
                <MedianLive />
            </div>
        </div>
    )
}
