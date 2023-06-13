import useSWR, { SWRResponse } from "swr"
import { fetcher } from "@/fetcher"
import { RoundingFunction } from "@/lib/RoundingFunction"
import { GolemIcon } from "./svg/GolemIcon"
import { useState } from "react"
import { CpuChipIcon, CircleStackIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid"
const ITEMS_PER_PAGE = 30
import { useRouter } from "next/router"

type Data = {
    "golem.com.pricing.model.linear.coeffs": number[]
    "golem.com.usage.vector": string[]
}

const computePricing = (data: Data, usage: string) => {
    const pricingMap: { [key: string]: number } = {}

    data["golem.com.usage.vector"].forEach((vector, index) => {
        if (index < data["golem.com.pricing.model.linear.coeffs"].length - 1) {
            pricingMap[vector] = data["golem.com.pricing.model.linear.coeffs"][index] * 3600
        } else {
            pricingMap[vector] = data["golem.com.pricing.model.linear.coeffs"][index]
        }
    })
    return RoundingFunction(pricingMap[usage], 2)
}

const useProviderPagination = (data: any[]) => {
    const [page, setPage] = useState(1)
    const sortedData = data?.sort((a, b) => b.earnings_total - a.earnings_total)
    const paginatedData = sortedData?.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
    const lastPage = sortedData ? Math.ceil(sortedData.length / ITEMS_PER_PAGE) : 0

    return { page, data: paginatedData, lastPage, setPage }
}

const displayPages = (currentPage: number, lastPage: number) => {
    const pages = []
    if (currentPage <= 3 || lastPage <= 5) {
        for (let i = 1; i <= Math.min(5, lastPage); i++) {
            pages.push(i)
        }
    } else if (currentPage >= lastPage - 2) {
        for (let i = lastPage - 4; i <= lastPage; i++) {
            pages.push(i)
        }
    } else {
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2)
    }
    return pages
}

export const ProviderList = () => {
    const { data, error } = useSWR(`network/online`, fetcher)
    const { page, data: paginatedData, lastPage, setPage } = useProviderPagination(data)
    const router = useRouter()
    const handleNext = () => setPage((page) => (page < lastPage ? page + 1 : lastPage))
    const handlePrevious = () => setPage((page) => (page > 1 ? page - 1 : 1))
    const visiblePages = displayPages(page, lastPage)
    return (
        <div className="flex flex-col">
            <table className="divide-y-12 divide-gray-900 border-separate rowspacing w-full inline-block lg:table md:table xl:table col-span-12">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-lg"
                        >
                            Provider
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Cores
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Memory
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Disk
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Total Earnings
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            CPU/h
                        </th>
                        <th scope="col" className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">
                            Env/h
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-lg whitespace-nowrap"
                        >
                            Start price
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-gray-50 dark:bg-gray-800 divide-y-12 divide-gray-900">
                    {paginatedData?.map((provider) => (
                        <tr
                            onClick={() => {
                                router.push(`/network/provider/${provider.node_id}`)
                            }}
                            key={provider.node_id}
                            className="hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer my-12 golemtr"
                        >
                            <td className="px-6 py-4 rounded-l-lg">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12 bg-golemblue rounded-md p-3 relative">
                                        {provider.computing_now ? (
                                            <div v-if="provider.Computing">
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500"></div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping animate-ping"></div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping"></div>
                                            </div>
                                        )}
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 golemtext dark:text-gray-300">
                                            {provider.data["golem.node.id.name"]}
                                        </div>
                                        <div className="text-sm text-gray-500 golemtext">{provider.data["golem.node.debug.subnet"]}</div>
                                        {provider.data["golem.com.payment.platform.erc20-mainnet-glm.address"] ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue golembadge text-white golemtext">
                                                Mainnet
                                            </span>
                                        ) : (
                                            <span
                                                v-else
                                                className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full golembadge bg-yellow-500 text-white golemtext"
                                            >
                                                Testnet
                                            </span>
                                        )}

                                        <span
                                            v-if="provider.Version"
                                            className="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full golembadge bg-golemblue text-white golemtext"
                                        >
                                            v{provider.version}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="bg-golemblue rounded-md p-3">
                                        <CpuChipIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 golemtext dark:text-gray-300">
                                            {provider.data["golem.inf.cpu.threads"]}
                                        </div>
                                        <div className="text-sm text-gray-500 golemtext">Cores</div>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                                <dt className="flex flex-row items-center">
                                    <div className="bg-golemblue rounded-md p-3">
                                        <Square3Stack3DIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-2 text-sm font-medium text-gray-900 golemtext dark:text-gray-300">
                                        {RoundingFunction(provider.data["golem.inf.mem.gib"], 2)} GB
                                    </p>
                                </dt>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <dt className="flex flex-row items-center">
                                    <div className="bg-golemblue rounded-md p-3">
                                        <CircleStackIcon className="h-4 w-4 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-2 text-sm font-medium text-gray-900 golemtext dark:text-gray-300">
                                        {RoundingFunction(provider.data["golem.inf.storage.gib"], 2)} GB
                                    </p>
                                </dt>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a className="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300">
                                    {RoundingFunction(provider.earnings_total, 2)}{" "}
                                    <span className="text-golemblue golemgradient dark:text-gray-400">GLM</span>
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a className="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300">
                                    {computePricing(provider.data, "golem.usage.cpu_sec")}{" "}
                                    <span className="text-golemblue golemgradient dark:text-gray-400">GLM</span>
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <a className="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300">
                                    {computePricing(provider.data, "golem.usage.duration_sec")}{" "}
                                    <span className="text-golemblue golemgradient dark:text-gray-400">GLM</span>
                                </a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium rounded-r-lg">
                                <a className="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300">
                                    {
                                        provider.data["golem.com.pricing.model.linear.coeffs"][
                                            provider.data["golem.com.pricing.model.linear.coeffs"].length - 1
                                        ]
                                    }{" "}
                                    <span className="text-golemblue golemgradient dark:text-gray-400">GLM</span>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4 gap-2">
                <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-5 py-2 rounded-md ${
                        page === 1 ? "text-gray-400 bg-golemblue/20 cursor-not-allowed" : "text-white bg-golemblue"
                    }`}
                >
                    Previous
                </button>
                {visiblePages.map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`px-5 py-2 rounded-md ${
                            page === pageNumber ? "text-white bg-golemblue" : "text-white bg-golemblue/60 hover:bg-golemblue"
                        }`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={handleNext}
                    disabled={page === lastPage}
                    className={`px-5 py-2 rounded-md ${page === lastPage ? "text-gray-400 bg-gray-200" : "text-white bg-golemblue"}`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}
