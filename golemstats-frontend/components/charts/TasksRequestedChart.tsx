import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import useSWR from "swr"
import { RoundingFunction } from "@/lib/RoundingFunction"
import { fetcher } from "@/fetcher"

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export const TasksRequestedChart = () => {
    const [displayCount, setDisplayCount] = useState(15)
    const [height, setHeight] = useState(450)
    const { data: apiResponse } = useSWR("requestors", fetcher)

    const series = [
        {
            data: apiResponse?.slice(0, displayCount).map((obj, i) => ({
                x: `Requestor ${i + 1}`,
                y: RoundingFunction(obj.tasks_requested, 0),
            })),
            name: "Tasks Requested",
        },
    ]

    const chartOptions = {
        chart: { id: "bar", type: "bar", foreColor: "#373d3f", zoom: { autoScaleYaxis: true } },
        tooltip: { theme: "light", enabled: true, x: { show: true, format: "HH:mm:ss", formatter: undefined } },
        plotOptions: { bar: { borderRadius: 5, horizontal: true } },
        colors: ["#0c3be8"],
        dataLabels: { enabled: true },
        xaxis: { categories: [] },
    }

    return (
        <div className="bg-white dark:bg-gray-800 pt-5 mb-2 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
            <div className="relative">
                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
                <h1 className="text-2xl mb-2 font-medium dark:text-gray-300">Amount of tasks requested by requestors</h1>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    Requestors to display
                </label>
                <input
                    value={displayCount}
                    onChange={(e) => setDisplayCount(e.target.value)}
                    onKeyUp={(e) => e.key === "Enter" && fetcher("requestors")}
                    name="name"
                    id="name"
                    className="shadow-sm mb-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full block sm:text-sm border-2 border-gray-100 rounded-md"
                />
                <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                    Chart Height <span className="text-sm font-medium text-gray-400">px</span>
                </label>
                <input
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    name="height"
                    id="height"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full block sm:text-sm border-2 border-gray-100 rounded-md"
                />
                <ApexChart width="100%" height={height} options={chartOptions} series={series} type="bar" />
            </div>
        </div>
    )
}
