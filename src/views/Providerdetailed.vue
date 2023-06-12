<template>
    <div>
        <main>
            <!-- Page header -->

            <div>
                <div>
                    <div>
                        <div>
                            <div>
                                <div>
                                    <component :is="icon" aria-hidden="true" />
                                    <div v-if="online">
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div v-else>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1>
                                    {{ this.name }}
                                </h1>
                                <span v-if="testnet"> Testnet </span>
                                <span v-else> Mainnet </span>
                                <span v-if="version"> v{{ version }} </span>
                            </div>
                            <p>
                                {{ this.id }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button aria-label="Show Node by opeator" @click="operator" type="button">Node by Operator</button>
                        <button aria-label="Show Polygon Wallet" @click="polygon" type="button">Polygon</button>
                        <button aria-label="Show zkSync Wallet" @click="zkscan" type="button">zkScan</button>
                        <button aria-label="Show Etherscan Wallet" @click="etherscan" type="button">Etherscan</button>
                    </div>
                </div>
            </div>

            <div>
                <section aria-labelledby="timeline-title">
                    <h2 id="timeline-title">Earnings</h2>

                    <!-- Activity Feed -->
                    <dl>
                        <div v-if="this.income['24']">
                            <dt>
                                <div>
                                    <component :is="icon" aria-hidden="true" />
                                </div>
                                <p>Earnings (24h)</p>
                            </dt>
                            <dd>
                                <p>
                                    {{ this.income["24"] }}
                                </p>
                                <p>GLM</p>
                            </dd>
                        </div>
                        <div v-if="this.income['168']">
                            <dt>
                                <div>
                                    <component :is="icon" aria-hidden="true" />
                                </div>
                                <p>Earnings (7d)</p>
                            </dt>
                            <dd>
                                <p>
                                    {{ this.income["168"] }}
                                </p>
                                <p>GLM</p>
                            </dd>
                        </div>
                        <div v-if="this.income['744']">
                            <dt>
                                <div>
                                    <component :is="icon" aria-hidden="true" />
                                </div>
                                <p>Earnings (31d)</p>
                            </dt>
                            <dd>
                                <p>
                                    {{ this.income["744"] }}
                                </p>
                                <p>GLM</p>
                            </dd>
                        </div>
                        <div>
                            <dt>
                                <div>
                                    <component :is="icon" aria-hidden="true" />
                                </div>
                                <p>Earnings (90d)</p>
                            </dt>
                            <dd>
                                <p>
                                    {{ this.income["8760"] }}
                                </p>
                                <p>GLM</p>
                            </dd>
                        </div>
                    </dl>
                </section>
                <div>
                    <!-- Comments-->

                    <!-- Description list-->
                    <section aria-labelledby="applicant-information-title">
                        <h2 id="Hardware">Activities</h2>
                        <div>
                            <h1>Tasks being computed</h1>
                            <p>1 = Computing / 0 = Inactive</p>
                            <apexchart v-if="loaded_graph" width="100%" height="250" type="area" :options="chartOptions" :series="series" />
                        </div>
                    </section>
                </div>

                <section aria-labelledby="Hardware">
                    <h2 id="Hardware">Hardware</h2>

                    <!-- Activity Feed -->
                    <section aria-labelledby="notes-title">
                        <dl>
                            <div>
                                <dt>
                                    <div>
                                        <component :is="chipicon" aria-hidden="true" />
                                    </div>
                                    <p>CPU</p>
                                </dt>
                                <dd>
                                    <p>
                                        {{ cores }}
                                    </p>
                                    <p>Cores</p>
                                </dd>
                            </div>
                            <div>
                                <dt>
                                    <div>
                                        <component :is="layersicon" aria-hidden="true" />
                                    </div>
                                    <p>RAM</p>
                                </dt>
                                <dd>
                                    <p>
                                        {{ memory }}
                                    </p>
                                    <p>GB</p>
                                </dd>
                            </div>
                            <div>
                                <dt>
                                    <div>
                                        <component :is="databaseicon" aria-hidden="true" />
                                    </div>
                                    <p>Disk</p>
                                </dt>
                                <dd>
                                    <p>
                                        {{ disk }}
                                    </p>
                                    <p>GB</p>
                                </dd>
                            </div>
                        </dl>
                    </section>
                </section>
            </div>
        </main>
    </div>
</template>

<script>
import GolemIcon from "@/components/golem.vue"
import LayersIcon from "@/components/layers.vue"

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverOverlay,
    PopoverPanel,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue"
import {
    ArrowNarrowLeftIcon,
    CheckIcon,
    HomeIcon,
    PaperClipIcon,
    QuestionMarkCircleIcon,
    SearchIcon,
    ThumbUpIcon,
    UserIcon,
} from "@heroicons/vue/solid"
import { ChipIcon, DatabaseIcon } from "@heroicons/vue/outline"

const stats = [
    { id: 1, name: "Earnings (24h)", stat: "0.0338", icon: GolemIcon, change: "GLM", changeType: "increase" },
    { id: 2, name: "Earnings (7d)", stat: "58.16", icon: GolemIcon, change: "GLM", changeType: "increase" },
    { id: 3, name: "Earnings (31d)", stat: "243.4", icon: GolemIcon, change: "GLM", changeType: "increase" },
    { id: 4, name: "Earnings (90d)", stat: "60238.2", icon: GolemIcon, change: "GLM", changeType: "increase" },
]

export default {
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        Popover,
        PopoverButton,
        PopoverOverlay,
        PopoverPanel,
        TransitionChild,
        TransitionRoot,
        GolemIcon,
        ChipIcon,
        LayersIcon,
        DatabaseIcon,
    },
    data() {
        return {
            icon: "GolemIcon",
            chipicon: "ChipIcon",
            databaseicon: "DatabaseIcon",
            layersicon: "LayersIcon",
            loaded: false,
            failure: false,
            loaded_graph: false,
            income: {},
            id: "",
            computed_total: "",
            seconds_computed: "",
            usdprice: "",
            scheme: "",
            memory: "",
            name: "",
            runtime_name: "",
            cores: "",
            model: "",
            cpu_vendor: "",
            threads: "",
            version: "",
            disk: "",
            runtime_version: "",
            pricing_model: "",
            subnet: "",
            architecture: "",
            multi_activity: "",
            interval_sec: "",
            accept_timeout: "",
            wallet: "",
            online: "",
            cpu_hour: "",
            per_hour: "",
            start_price: "",
            transfer_protocol: [],
            cpu_capabilities: [],
            usage_vector: [],
            testnet: "",
            series: [
                {
                    name: "Providers Computing a task",
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    id: "area-datetime",
                    type: "area",
                    zoom: {
                        autoScaleYaxis: true,
                    },
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: true,
                        format: "HH:mm:ss",
                        formatter: undefined,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                colors: ["#0000ff"],
                markers: {
                    size: 0,
                },

                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 0.1,
                        inverseColors: false,
                        opacityFrom: 0,
                        opacityTo: 0,
                        stops: [0, 99],
                    },
                },
                yaxis: {
                    title: {
                        text: "1 = Node is computing a task",
                        rotate: -90,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: "12px",
                            fontWeight: 600,
                            cssClass: "apexcharts-yaxis-title",
                        },
                    },
                    min: 0,
                    max: 1,
                    tickAmount: 1,
                },
                xaxis: {
                    type: "datetime",
                    title: {
                        text: "UTC Time",
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: "12px",
                            fontWeight: 600,
                            cssClass: "apexcharts-yaxis-title",
                        },
                    },
                    labels: {
                        datetimeFormatter: {
                            year: "yyyy",
                            month: "MMM 'yy",
                            day: "dd MMM",
                            hour: "HH:mm:ss",
                        },
                    },
                },
            },
        }
    },
    setup() {
        return {
            stats,
        }
    },
    created() {
        this.activity()
        this.tasks_computed()
        this.get_seconds_computed()
        this.fetchData()
        this.earnings(24)
        this.earnings(168)
        this.earnings(744)
        this.earnings(8760)
    },
    mounted: function () {
        this.timer = setInterval(() => {
            if (document.visibilityState === "hidden") {
                return
            }
            this.activity()
            this.tasks_computed()
            this.get_seconds_computed()
            this.fetchData()
            this.earnings(24)
            this.earnings(168)
            this.earnings(744)
            this.earnings(8760)
        }, 15000)
    },
    methods: {
        operator() {
            this.$router.push({
                name: "operatordetailed",
                params: {
                    id: this.wallet,
                },
            })
        },
        zkscan() {
            if (this.testnet) {
                window.open(`https://rinkeby.zkscan.io/explorer/accounts/${this.wallet}`, "_blank")
            } else {
                window.open(`https://zkscan.io/explorer/accounts/${this.wallet}`, "_blank")
            }
        },
        etherscan() {
            if (this.testnet) {
                window.open(`https://rinkeby.etherscan.io/address/${this.wallet}`, "_blank")
            } else {
                window.open(`https://etherscan.io/address/${this.wallet}`, "_blank")
            }
        },
        polygon() {
            if (this.testnet) {
                window.open(`https://mumbai.polygonscan.com/address/${this.wallet}#tokentxns`, "_blank")
            } else {
                window.open(`https://polygonscan.com/address/${this.wallet}#tokentxns`, "_blank")
            }
        },
        earnings(hours) {
            this.axios.get("provider/node/" + this.$route.params.id + "/earnings" + "/" + hours).then((response) => {
                let apiResponse = response.data
                Object.assign(this.income, { [hours]: this.floorFigure(apiResponse.earnings, 3) })
            })
        },
        secondsToString(seconds) {
            const numyears = Math.floor(seconds / 31536000)
            const numdays = Math.floor((seconds % 31536000) / 86400)
            const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600)
            const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60)
            const numseconds = this.floorFigure((((seconds % 31536000) % 86400) % 3600) % 60)
            return `${numyears} years ${numdays} days ${numhours} hours ${numminutes} minutes ${numseconds} seconds`
        },
        operator() {
            this.$router.push({
                name: "operatordetailed",
                params: {
                    id: this.wallet,
                },
            })
        },
        floorFigure: function floorFigure(figure, decimals) {
            if (!decimals) decimals = 2
            const d = Math.pow(10, decimals)
            return (parseInt(figure * d) / d).toFixed(decimals)
        },
        geckoapi() {
            this.axios.get("https://api.coingecko.com/api/v3/coins/golem").then((response) => {
                this.usdprice = response.data.market_data.current_price.usd.toString().slice(0, 7)
            })
        },
        activity() {
            this.axios.get(`provider/node/${this.$route.params.id}/activity`).then((response) => {
                const apiResponse = response.data
                try {
                    var data = apiResponse.data.result[0].values
                } catch (error) {
                    this.failure = true
                    // expected output: ReferenceError: nonExistentFunction is not defined
                    // Note - error messages will vary depending on browser
                }
                const computing = []
                for (const i in data) {
                    const time = data[i][0] * 1000
                    computing.push([time, data[i][1]])
                }
                this.series = [
                    {
                        data: computing,
                        name: "Computing = 1",
                    },
                ]
                this.loaded_graph = true
                // let success = data.map(({ values }) => values)
            })
        },
        tasks_computed() {
            this.axios.get(`provider/node/${this.$route.params.id}/total/computed`).then((response) => {
                const apiResponse = response.data
                this.computed_total = apiResponse.tasks_computed_total
            })
        },
        get_seconds_computed() {
            this.axios.get(`provider/node/${this.$route.params.id}/total/computed/seconds`).then((response) => {
                const apiResponse = response.data
                this.seconds_computed = this.floorFigure(apiResponse.seconds_computed)
                this.seconds_computed = this.secondsToString(this.seconds_computed)
            })
        },
        zkscan() {
            if (this.testnet) {
                window.open(`https://rinkeby.zkscan.io/explorer/accounts/${this.wallet}`, "_blank")
            } else {
                window.open(`https://zkscan.io/explorer/accounts/${this.wallet}`, "_blank")
            }
        },
        etherscan() {
            if (this.testnet) {
                window.open(`https://rinkeby.etherscan.io/address/${this.wallet}`, "_blank")
            } else {
                window.open(`https://etherscan.io/address/${this.wallet}`, "_blank")
            }
        },
        polygon() {
            if (this.testnet) {
                window.open(`https://mumbai.polygonscan.com/address/${this.wallet}#tokentxns`, "_blank")
            } else {
                window.open(`https://polygonscan.com/address/${this.wallet}#tokentxns`, "_blank")
            }
        },
        fetchData() {
            this.axios.get(`provider/node/${this.$route.params.id}`).then((response) => {
                const apiResponse = response.data
                this.id = apiResponse[0].data.id
                this.online = apiResponse[0].online
                this.version = apiResponse[0].version
                this.index_at = apiResponse[0].created_at
                this.scheme = apiResponse[0].data["golem.com.scheme"]
                this.memory = this.floorFigure(apiResponse[0].data["golem.inf.mem.gib"])
                this.name = apiResponse[0].data["golem.node.id.name"]
                this.runtime_name = apiResponse[0].data["golem.runtime.name"]
                this.cores = apiResponse[0].data["golem.inf.cpu.threads"]
                this.model = apiResponse[0].data["golem.inf.cpu.model"]
                let pricing_hashmap = new Map()
                pricing_hashmap.set(
                    apiResponse[0].data["golem.com.usage.vector"][0],
                    apiResponse[0].data["golem.com.pricing.model.linear.coeffs"][0]
                )
                pricing_hashmap.set(
                    apiResponse[0].data["golem.com.usage.vector"][1],
                    apiResponse[0].data["golem.com.pricing.model.linear.coeffs"][1]
                )
                if (apiResponse[0].data["golem.inf.cpu.vendor"] == "GenuineIntel") {
                    this.cpu_vendor = "Intel"
                } else if (apiResponse[0].data["golem.inf.cpu.vendor"] == "AuthenticAMD") {
                    this.cpu_vendor = "AMD"
                }
                this.threads = apiResponse[0].data["golem.inf.cpu.threads"]
                this.disk = this.floorFigure(apiResponse[0].data["golem.inf.storage.gib"])
                this.runtime_version = apiResponse[0].data["golem.runtime.version"]
                this.usage_vector = apiResponse[0].data["golem.com.usage.vector"]
                this.pricing_model = apiResponse[0].data["golem.com.pricing.model"]
                this.cpu_hour = this.floorFigure(pricing_hashmap.get("golem.usage.cpu_sec") * 3600, 3)
                this.per_hour = this.floorFigure(pricing_hashmap.get("golem.usage.duration_sec") * 3600, 3)
                this.start_price = this.floorFigure(apiResponse[0].data["golem.com.pricing.model.linear.coeffs"][2], 3)
                this.subnet = apiResponse[0].data["golem.node.debug.subnet"]
                this.architecture = apiResponse[0].data["golem.inf.cpu.architecture"]
                this.cpu_capabilities = apiResponse[0].data["golem.inf.cpu.capabilities"]
                this.multi_activity = apiResponse[0].data["golem.srv.caps.multi-activity"]
                this.interval_sec = apiResponse[0].data["golem.com.scheme.payu.interval_sec"]
                this.transfer_protocol = apiResponse[0].data["golem.activity.caps.transfer.protocol"]
                this.pricing = apiResponse[0].data["golem.com.pricing.model.linear.coeffs"]
                this.accept_timeout = apiResponse[0].data["golem.com.payment.debit-notes.accept-timeout?"]
                if (apiResponse[0].data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
                    this.testnet = false
                    this.wallet = apiResponse[0].data["golem.com.payment.platform.erc20-mainnet-glm.address"]
                    //  block of code to be executed if the condition is true
                } else {
                    this.testnet = true
                    this.wallet = apiResponse[0].data["golem.com.payment.platform.erc20-rinkeby-tglm.address"]
                    //  block of code to be executed if the condition is false
                }
            })

            this.loaded = true
        },
    },
}
</script>
