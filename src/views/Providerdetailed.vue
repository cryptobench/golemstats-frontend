<template>
  <div class="min-h-full">
    <main class="py-10">
      <!-- Page header -->

      <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div
          class="bg-white dark:bg-gray-800 col-span-12 rounded-lg px-6 overflow-scroll  py-4 md:flex md:items-center md:justify-between md:space-x-5 "
        >
          <div class="flex items-center space-x-5 ">
            <div class="flex-shrink-0 ">
              <div class="flex flex-row  items-center justify-between ">
                <div class=" bg-golemblue rounded-md p-3 relative">
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                  <div v-if="online">
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 animate-ping"></div>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300"></div>
                  </div>
                  <div v-else>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex flex-row  items-center ">
                <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-300 pr-2">
                  {{this.name}}
                </h1>
                <span v-if="testnet" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500 text-white">
                  Testnet
                </span>
                <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue text-white">
                  Mainnet
                </span>
                <span v-if="version" class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue text-white">
                  v{{ version }}
                </span>
              </div>
              <p class="text-sm font-medium truncate text-gray-500">
                {{this.id}}
              </p>
            </div>
          </div>

          <div
            class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3"
          >
            <button
              aria-label="Show Node by opeator"
              @click="operator"
              type="button"
              class="inline-flex items-center justify-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Node by Operator
            </button>
            <button
              aria-label="Show Polygon Wallet"
              @click="polygon"
              type="button"
              class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Polygon
            </button>
            <button
              aria-label="Show zkSync Wallet"
              @click="zkscan"
              type="button"
              class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              zkScan
            </button>
            <button
              aria-label="Show Etherscan Wallet"
              @click="etherscan"
              type="button"
              class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
              Etherscan
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <section aria-labelledby="timeline-title" class="lg:col-start-1 lg:col-span-4">
          <h2 id="timeline-title" class="text-lg font-medium text-gray-900">Earnings</h2>

          <!-- Activity Feed -->
          <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-if="this.income['24']"
              class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div class="absolute bg-golemblue rounded-md p-3">
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (24h)</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  {{ this.income['24'] }}
                </p>
                <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
                  GLM
                </p>
              </dd>
            </div>
            <div
              v-if="this.income['168']"
              class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div class="absolute bg-golemblue rounded-md p-3">
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (7d)</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  {{ this.income['168'] }}
                </p>
                <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
                  GLM
                </p>
              </dd>
            </div>
            <div
              v-if="this.income['744']"
              class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
              <dt>
                <div class="absolute bg-golemblue rounded-md p-3">
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (31d)</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  {{ this.income['744'] }}
                </p>
                <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
                  GLM
                </p>
              </dd>
            </div>
            <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
              <dt>
                <div class="absolute bg-golemblue rounded-md p-3">
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Earnings (90d)</p>
              </dt>
              <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                  {{ this.income['8760'] }}
                </p>
                <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
                  GLM
                </p>
              </dd>
            </div>
          </dl>
        </section>
        <div class="space-y-6 lg:col-start-1 lg:col-span-2">
          <!-- Comments-->

          <!-- Description list-->
          <section aria-labelledby="applicant-information-title">
            <h2 id="Hardware" class="text-lg font-medium text-gray-900">Activities</h2>
            <div class="bg-white dark:bg-gray-800 mt-2 pt-5 px-4 sm:py-6 sm:px-6 shadow rounded-lg">
              <h1 class="text-xl font-medium dark:text-gray-300">Tasks being computed</h1>
              <p class="text-sm  text-gray-500 dark:text-gray-400">1 = Computing / 0 = Inactive</p>
              <apexchart v-if="loaded_graph" width="100%" height="250" type="area" :options="chartOptions" :series="series" />
            </div>
          </section>
        </div>

        <section aria-labelledby="Hardware" class="lg:col-start-3 lg:col-span-2">
          <h2 id="Hardware" class="text-lg font-medium text-gray-900">Hardware</h2>

          <!-- Activity Feed -->
          <section aria-labelledby="notes-title">
            <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-golemblue rounded-md p-3">
                    <component :is="chipicon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">CPU</p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                    {{ cores}}
                  </p>
                  <p class="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
                    Cores
                  </p>
                </dd>
              </div>
              <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-golemblue rounded-md p-3">
                    <component :is="layersicon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">RAM</p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                    {{memory}}
                  </p>
                  <p class="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
                    GB
                  </p>
                </dd>
              </div>
              <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-golemblue rounded-md p-3">
                    <component :is="databaseicon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p class="ml-16 text-sm font-medium text-gray-500 truncate dark:text-gray-400">Disk</p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
                    {{disk}}
                  </p>
                  <p class="text-golemblue ml-2 flex items-baseline text-sm font-semibold dark:text-gray-400">
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
</template>

<script>
import GolemIcon from "@/components/golem.vue"
import LayersIcon from "@/components/layers.vue"
import axios from "axios"
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
} from '@headlessui/vue'
import {
  ArrowNarrowLeftIcon,
  CheckIcon,
  HomeIcon,
  PaperClipIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/vue/solid'
import { ChipIcon, DatabaseIcon } from '@heroicons/vue/outline'



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
    DatabaseIcon
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
      axios
        .get(
          'https://api.stats.golem.network/v1/provider/node/' + this.$route.params.id + '/earnings' + '/' + hours
        )
        .then((response) => {
          let apiResponse = response.data
          Object.assign(this.income, {[hours]: this.floorFigure(apiResponse.earnings, 3)})
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
      axios.get("https://api.coingecko.com/api/v3/coins/golem").then((response) => {
        this.usdprice = response.data.market_data.current_price.usd.toString().slice(0, 7)
      })
    },
    activity() {
      axios.get(`https://api.stats.golem.network/v1/provider/node/${this.$route.params.id}/activity`).then((response) => {
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
      axios.get(`https://api.stats.golem.network/v1/provider/node/${this.$route.params.id}/total/computed`).then((response) => {
        const apiResponse = response.data
        this.computed_total = apiResponse.tasks_computed_total
      })
    },
    get_seconds_computed() {
      axios.get(`https://api.stats.golem.network/v1/provider/node/${this.$route.params.id}/total/computed/seconds`).then((response) => {
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
      axios.get(`https://api.stats.golem.network/v1/provider/node/${this.$route.params.id}`).then((response) => {
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
