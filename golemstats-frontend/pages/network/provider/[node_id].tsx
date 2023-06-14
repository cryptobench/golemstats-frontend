import NodeActivityChart from "@/components/charts/NodeActivityChart"
import { GolemIcon } from "@/components/svg/GolemIcon"
import { fetcher } from "@/fetcher"
import { RoundingFunction } from "@/lib/RoundingFunction"
import { CircleStackIcon, CpuChipIcon, Square3Stack3DIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/router"
import useSWR from "swr"

const useIncome = (node_id: string | undefined, initialIncome: object) => {
    const { data, error } = useSWR(node_id ? `provider/node/${node_id}/earnings` : null, fetcher, {
        initialData: initialIncome,
        refreshInterval: 10000,
    })

    const formattedIncome: { [key: string]: number } = {}

    if (data) {
        const keys = Object.keys(data)

        console.log(keys)

        keys.forEach((key) => {
            formattedIncome[key] = RoundingFunction(parseFloat(data[key]), 2)
        })
    }

    return { income: formattedIncome, error }
}

export const ProviderDetailed = ({ initialData, initialIncome }: { initialData: object; initialIncome: object }) => {
    const router = useRouter()
    let { node_id } = router.query

    // if node_id is an array, use the first value
    if (Array.isArray(node_id)) {
        node_id = node_id[0]
    }

    const { data: nodeData = initialData, error: nodeError } = useSWR(node_id ? `provider/node/${node_id}` : null, fetcher, {
        initialData: initialData,
        refreshInterval: 10000,
    })

    const { income: updatedIncome, error: incomeError } = useIncome(node_id, initialIncome)

    if (nodeError || incomeError) return <div>Failed to load</div>
    if (!nodeData || !updatedIncome) return <div>Loading...</div>

    return (
        <div className="min-h-full z-10 relative">
            <main className="py-10">
                <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <div className="bg-white dark:bg-gray-800 col-span-12 rounded-lg px-6 overflow-auto py-4 md:flex md:items-center md:justify-between md:space-x-5">
                        <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0">
                                <div className="flex flex-row items-center justify-between">
                                    <div className="bg-golemblue rounded-md p-3 relative">
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        {nodeData[0].online ? (
                                            <div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 animate-ping"></div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300"></div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-row items-center">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-300 pr-2">
                                        {nodeData[0].data["golem.node.id.name"]}
                                    </h1>
                                    {nodeData[0].data["golem.com.payment.platform.erc20-mainnet-glm.address"] ? (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue text-white">
                                            Mainnet
                                        </span>
                                    ) : (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500 text-white">
                                            Testnet
                                        </span>
                                    )}
                                    <span className="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue text-white">
                                        v{nodeData[0].version}
                                    </span>
                                </div>
                                <p className="text-sm font-medium truncate text-gray-500">{nodeData[0].node_id}</p>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                            <button
                                onClick={() => {
                                    router.push(`/network/providers/operator/${node_id}`)
                                }}
                                className="inline-flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            >
                                Node by Operator
                            </button>
                            <button
                                aria-label="Show Polygon Wallet"
                                onClick={() => {
                                    if (nodeData[0].data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
                                        window.open(
                                            `https://mumbai.polygonscan.com/address/${nodeData[0].data["wallet"]}#tokentxns`,
                                            "_blank"
                                        )
                                    } else {
                                        window.open(`https://polygonscan.com/address/${nodeData[0].data["wallet"]}#tokentxns`, "_blank")
                                    }
                                }}
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            >
                                Polygon
                            </button>

                            <button
                                aria-label="Show Etherscan Wallet"
                                onClick={() => {
                                    if (nodeData[0].data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
                                        window.open(`https://goerli.etherscan.io/address/${nodeData[0].data["wallet"]}`, "_blank")
                                    } else {
                                        window.open(`https://etherscan.io/address/${nodeData[0].data["wallet"]}`, "_blank")
                                    }
                                }}
                                type="button"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            >
                                Etherscan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <section aria-labelledby="timeline-title" className="lg:col-start-1 lg:col-span-4">
                        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                            Earnings
                        </h2>

                        <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                <dt>
                                    <div className="absolute bg-golemblue rounded-md p-3">
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (24h)</p>
                                </dt>
                                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{updatedIncome["24"]}</p>
                                    <p className="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">GLM</p>
                                </dd>
                            </div>
                            <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                <dt>
                                    <div className="absolute bg-golemblue rounded-md p-3">
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (7d)</p>
                                </dt>
                                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{updatedIncome["168"]}</p>
                                    <p className="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">GLM</p>
                                </dd>
                            </div>
                            <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                <dt>
                                    <div className="absolute bg-golemblue rounded-md p-3">
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (31d)</p>
                                </dt>
                                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{updatedIncome["720"]}</p>
                                    <p className="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">GLM</p>
                                </dd>
                            </div>
                            <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                <dt>
                                    <div className="absolute bg-golemblue rounded-md p-3">
                                        <GolemIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (90d)</p>
                                </dt>
                                <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">{updatedIncome["2160"]}</p>
                                    <p className="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">GLM</p>
                                </dd>
                            </div>
                        </dl>
                    </section>
                    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                        <NodeActivityChart nodeId={nodeData[0].node_id} />
                    </div>

                    <section aria-labelledby="Hardware" className="lg:col-start-3 lg:col-span-2">
                        <h2 id="Hardware" className="text-lg font-medium text-gray-900">
                            Hardware
                        </h2>

                        <section aria-labelledby="notes-title">
                            <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                    <dt>
                                        <div className="absolute bg-golemblue rounded-md p-3">
                                            <CpuChipIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">CPU</p>
                                    </dt>
                                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                                            {nodeData[0].data["golem.inf.cpu.threads"]}
                                        </p>
                                        <p className="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
                                            Cores
                                        </p>
                                    </dd>
                                </div>
                                <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                    <dt>
                                        <div className="absolute bg-golemblue rounded-md p-3">
                                            <Square3Stack3DIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">RAM</p>
                                    </dt>
                                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                                            {RoundingFunction(nodeData[0].data["golem.inf.mem.gib"], 2)} GB
                                        </p>
                                        <p className="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
                                            GB
                                        </p>
                                    </dd>
                                </div>
                                <div className="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                                    <dt>
                                        <div className="absolute bg-golemblue rounded-md p-3">
                                            <CircleStackIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Disk</p>
                                    </dt>
                                    <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                                        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                                            {RoundingFunction(nodeData[0].data["golem.inf.storage.gib"], 2)} GB
                                        </p>
                                        <p className="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
                                            GB
                                        </p>
                                    </dd>
                                </div>
                            </dl>
                        </section>
                    </section>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps({ params }: { params: { node_id: string } }) {
    const initialData = await fetcher(`provider/node/${params.node_id}`)

    const income = await fetcher(`provider/node/${params.node_id}/earnings`)

    return { props: { initialData, income }, revalidate: 2880 }
}

export async function getStaticPaths() {
    const nodes: any = await fetcher("network/online") // endpoint to get all node_ids
    const paths = nodes.map((node: any) => ({ params: { node_id: node.node_id.toString() } }))

    return { paths, fallback: "blocking" }
}

export default ProviderDetailed
