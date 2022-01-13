<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
    <div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300 mt-4">
        Node by Operator <span class="text-gray-400 text-sm">{{this.$route.params.id}}</span>
      </h1>
      <div class="mt-2 grid gap-5 grid-cols-12 bg-white dark:bg-gray-800 pt-5 px-4 py-6 shadow rounded-lg overflow-hidden">
        <div class="col-span-12">
          <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Search filter</h1>
        </div>
        <div class="col-span-12">
          <label for="name" class="block text-md font-medium text-gray-700 mb-1 dark:text-gray-400">Provider or wallet address</label>
          <input
            v-model="filters.name.value"
            name="name"
            id="name"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
          />
        </div>
        <div class="col-span-12">
          <p class="text-lg font-medium dark:text-gray-300">
            Hardware
          </p>
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min Cores</label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.cores.value.min"
            :min="1"
            :max="filters.cores.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6 ">
          <label for="coresmax" class="dark:text-gray-300">Max Cores</label>
          <input
            name="coresmax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.cores.value.max"
            :min="filters.cores.value.min"
            :max="256"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min Memory <span class="text-sm font-medium text-gray-400">GB</span></label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.memory.value.min"
            :min="1"
            :max="filters.memory.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label for="memorymax" class="dark:text-gray-300">Max Memory <span class="text-sm font-medium text-gray-400">GB</span></label>
          <input
            name="memorymax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.memory.value.max"
            :min="filters.memory.value.min"
            :max="2048"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min Disk <span class="text-sm font-medium text-gray-400">GB</span></label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.disk.value.min"
            :min="1"
            :max="filters.disk.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label for="diskmax" class="dark:text-gray-300">Max Disk <span class="text-sm font-medium text-gray-400">GB</span></label>
          <input
            name="diskmax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.disk.value.max"
            :min="filters.disk.value.min"
            :max="200000"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="col-span-12">
          <p class="text-lg font-medium dark:text-gray-300">
            Pricing
          </p>
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min CPU/h <span class="text-sm font-medium text-gray-400">GLM</span></label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.cpuh.value.min"
            :min="1"
            :max="filters.cpuh.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label for="cpuhmax" class="dark:text-gray-300">Max CPU/h <span class="text-sm font-medium text-gray-400">GLM</span></label>
          <input
            name="cpuhmax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.cpuh.value.max"
            :min="filters.cpuh.value.min"
            :max="200000"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min Env/h <span class="text-sm font-medium text-gray-400">GLM</span></label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.cpuh.value.min"
            :min="1"
            :max="filters.cpuh.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label for="envmax" class="dark:text-gray-300">Max Env/h <span class="text-sm font-medium text-gray-400">GLM</span></label>
          <input
            name="envmax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.env.value.max"
            :min="filters.env.value.min"
            :max="200000"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label class="form-label dark:text-gray-300">Min Start price <span class="text-sm font-medium text-gray-400">GLM</span></label>
          <input
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.start.value.min"
            :min="1"
            :max="filters.start.value.max"
            @onKeyDown.prevent="() => {}"
          />
        </div>
        <div class="lg:col-span-2 col-span-6">
          <label for="startmax" class="dark:text-gray-300"
            >Max Start price <span class="text-sm font-medium text-gray-400">GLM</span></label
          >
          <input
            name="startmax"
            class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
            type="number"
            v-model.number="filters.start.value.max"
            :min="filters.start.value.min"
            :max="200000"
            @onKeyDown.prevent="() => {}"
          />
        </div>
      </div>
      <div class="grid grid-cols-12 overflow-scroll ">
        <v-table
          :data="items"
          :filters="filters"
          class="divide-y-12 divide-gray-900 border-separate rowspacing w-full inline-block lg:table md:table xl:table  col-span-12"
        >
          <template :class="'edescription'" #head>
            <tr>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-lg">Provider</th>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Cores</th>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Memory</th>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Disk</th>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">CPU/h</th>
              <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Env/h</th>
              <th
                scope="col"
                class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-lg whitespace-nowrap"
              >
                Start price
              </th>
            </tr>
          </template>
          <template #body="{ rows }">
            <tr
              class="hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer my-12 golemtr"
              v-for="provider in rows"
              :key="provider.id"
              v-on:click="nodedetails(provider.id)"
            >
              <td class="px-6 py-4 rounded-l-lg">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12 bg-golemblue rounded-md p-3 relative">
                    <div v-if="provider.Computing">
                      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div v-else>
                      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping animate-ping"></div>
                      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping"></div>
                    </div>
                    <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 golemtext dark:text-gray-300 ">
                      {{ provider.Name }}
                    </div>
                    <div class="text-sm text-gray-500 golemtext">
                      {{ provider.Subnet }}
                    </div>

                    <span
                      v-if="provider.Mainnet"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-golemblue golembadge text-white golemtext"
                    >
                      Mainnet
                    </span>

                    <span
                      v-else
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full golembadge bg-yellow-500 text-white golemtext"
                    >
                      Testnet
                    </span>
                    <span
                      v-if="provider.Version"
                      class="px-2 ml-1 inline-flex text-xs leading-5 font-semibold rounded-full golembadge bg-golemblue text-white golemtext"
                    >
                      v{{ provider.Version }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="bg-golemblue rounded-md p-3">
                    <component :is="chipicon" class="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 golemtext dark:text-gray-300">
                      {{ provider.Cores }}
                    </div>
                    <div class="text-sm text-gray-500 golemtext ">AMD Ryzen 9 5900X 12-Core</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4">
                <dt class="flex flex-row items-center">
                  <div class="bg-golemblue rounded-md p-3">
                    <component :is="layersicon" class="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <p class="ml-2 text-sm font-medium text-gray-900 golemtext dark:text-gray-300">{{ provider.Memory }} GB</p>
                </dt>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <dt class="flex flex-row items-center">
                  <div class="bg-golemblue rounded-md p-3">
                    <component :is="databaseicon" class="h-4 w-4 text-white" aria-hidden="true" />
                  </div>
                  <p class="ml-2 text-sm font-medium text-gray-900 golemtext dark:text-gray-300">{{ provider.Disk }} GB</p>
                </dt>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" class="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300"
                  >{{ provider.cpu_hour }} <span class="text-golemblue golemgradient dark:text-gray-400">GLM</span></a
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <a href="#" class="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300"
                  >{{ provider.cpu_hour }} <span class="text-golemblue golemgradient dark:text-gray-400">GLM</span></a
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium rounded-r-lg">
                <a href="#" class="font-semibold text-gray-900 text-sm golemtext dark:text-gray-300"
                  >{{ provider.cpu_hour }} <span class="text-golemblue golemgradient dark:text-gray-400">GLM</span></a
                >
              </td>
            </tr>
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import GolemIcon from "@/components/golem.vue"
import LayersIcon from "@/components/layers.vue"
import { ChipIcon, DatabaseIcon } from "@heroicons/vue/solid"
const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    role: "Admin",
    email: "jane.cooper@example.com",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  // More people...
]

export default {
  components: {
    GolemIcon,
    ChipIcon,
    LayersIcon,
    DatabaseIcon
  },
  setup() {
    return {
      people,
    }
  },
  data() {
    return {
      ignoredfilter: ["Cores", "Memory", "Disk", "cpu_hour", "per_hour", "start_price"],
      filter: "",
      filters: {
          name: { value: '', keys: ['Name', 'Wallet'] },
          cores: { value: { min: 1, max: 256 }, custom: this.coresFilter },
          memory: { value: { min: 1, max: 2056 }, custom: this.memoryFilter },
          disk: { value: { min: 1, max: 200000 }, custom: this.diskFilter },
          cpuh: { value: { min: 0, max: 10 }, custom: this.cpuhFilter },
          env: { value: { min: 0, max: 10 }, custom: this.envFilter },
          start: { value: { min: 0, max: 10 }, custom: this.startFilter }

        },
      icon: "GolemIcon",
      chipicon: "ChipIcon",
      databaseicon: "DatabaseIcon",
      layersicon: "LayersIcon",
      updaterender: 0,
      table_data: false,
      rowcount: "30",
      averageearnings_loaded: false,
      sortBy: "Earnings",
      sortDesc: true,
      median_loaded: false,
      stats_loaded: false,
      computing_loaded: false,
      earnings6h_loaded: false,
      earnings24h_loaded: false,
      earnings90d_loaded: false,
      earnings90d: "",
      items: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    coresFilter (filterValue, row) {
      return row.Cores >= filterValue.min && row.Cores <= filterValue.max
    },
    memoryFilter (filterValue, row) {
      return row.Memory >= filterValue.min && row.Memory <= filterValue.max
    },
    diskFilter (filterValue, row) {
      return row.Disk >= filterValue.min && row.Disk <= filterValue.max
    },
    cpuhFilter (filterValue, row) {
      return row.cpu_hour >= filterValue.min && row.cpu_hour <= filterValue.max
    },
    envFilter (filterValue, row) {
      return row.per_hour >= filterValue.min && row.per_hour <= filterValue.max
    },
    startFilter (filterValue, row) {
      return row.start_price >= filterValue.min && row.start_price <= filterValue.max
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    nodedetails(row) {
      this.$router.push({ name: "node", params: { id: row } })
    },
    fetchData() {
      axios.get(`https://api.stats.golem.network/v1/provider/wallet/${this.$route.params.id}`).then((response) => {
        const apiResponse = response.data
        this.items.length = 0
        const avg_cpu_hour = []
        const avg_start_price = []
        const avg_per_hour = []
        apiResponse.forEach((obj) => {
          if (obj.online) {
          if (obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
            var mainnet = true
            var wallet = obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]
            //  block of code to be executed if the condition is true
          } else {
            var mainnet = false
            var wallet = obj.data["golem.com.payment.platform.erc20-rinkeby-tglm.address"]
            //  block of code to be executed if the condition is false
          }
          if (localStorage.getItem("currency") == "glm") {
            var earnings = `${this.floorFigure(obj.earnings_total, 2)} GLM`
          } else if (!localStorage.getItem("currency")) {
            localStorage.setItem("currency", "glm")
            var earnings = `${this.floorFigure(obj.earnings_total, 2)} GLM`
          } else {
            var earnings = `${this.floorFigure(obj.earnings_total * this.usdprice, 2)} USD`
          }
          let pricing_hashmap = new Map()
          pricing_hashmap.set(obj.data["golem.com.usage.vector"][0], obj.data["golem.com.pricing.model.linear.coeffs"][0])
          pricing_hashmap.set(obj.data["golem.com.usage.vector"][1], obj.data["golem.com.pricing.model.linear.coeffs"][1])
          this.items.push({
            Online: obj.online,
            Version: obj.version,
            Earnings: earnings,
            Mainnet: mainnet,
            Name: obj.data["golem.node.id.name"],
            id: obj.data.id,
            Subnet: obj.data["golem.node.debug.subnet"],
            Cores: obj.data["golem.inf.cpu.threads"],
            Vendor: obj.data["golem.inf.cpu.vendor"],
            Wallet: wallet,
            start_price: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][2], 3)}`,
            per_hour: `${this.floorFigure(pricing_hashmap.get("golem.usage.duration_sec") * 3600, 3)}`,
            cpu_hour: `${this.floorFigure(pricing_hashmap.get("golem.usage.cpu_sec") * 3600, 3)}`,
            Memory: this.floorFigure(obj.data["golem.inf.mem.gib"]),
            Disk: this.floorFigure(obj.data["golem.inf.storage.gib"]),
          })
          avg_cpu_hour.push(obj.data["golem.com.pricing.model.linear.coeffs"][1] * 3600)
          avg_start_price.push(obj.data["golem.com.pricing.model.linear.coeffs"][2])
          avg_per_hour.push(obj.data["golem.com.pricing.model.linear.coeffs"][0] * 3600)
        }})
        const median = (arr) => {
          const mid = Math.floor(arr.length / 2)
          const nums = [...arr].sort((a, b) => a - b)
          return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
        }
        this.median_cpu_hour = `${this.floorFigure(median(avg_cpu_hour), 3)} GLM`
        this.median_start_price = `${this.floorFigure(median(avg_start_price), 3)} GLM`
        this.median_per_hour = `${this.floorFigure(median(avg_per_hour), 3)} GLM`
        this.median_loaded = true
        const average = (array) => array.reduce((a, b) => a + b) / array.length
        this.avg_cpu_hour = `${this.floorFigure(average(avg_cpu_hour), 5)} GLM`
        this.avg_start_price = `${this.floorFigure(average(avg_start_price), 5)} GLM`
        this.avg_per_hour = `${this.floorFigure(average(avg_per_hour), 5)} GLM`
      })
      this.table_data = true
    },
  },
}
</script>

<style>
.rowspacing {
  border-spacing: 0 15px;
}

thead {
  @apply bg-gray-900;
  @apply dark:bg-gray-800;
  @apply py-24;
  @apply sticky;
  @apply top-0;
  @apply z-10;
}

tbody {
  @apply bg-white;
  @apply dark:bg-gray-800;
}
</style>
