<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h1 class="text-2xl mb-2 font-medium golemtext">Thorg Miners</h1>
    <div
      class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 bg-thorg pt-5 px-4 sm:py-6 sm:px-6 shadow rounded-lg overflow-hidden"
    >
      <div class="col-span-12">
        <h1 class="text-2xl mb-2 font-medium text-white">Search filter</h1>
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="name" class="block text-md font-medium text-gray-400 mb-1">Provider or wallet address</label>
        <input
          v-model="filters.name.value"
          name="name"
          id="name"
          class="shadow-sm p-2 w-full bg-thorg  block  sm:text-sm border-2 border-gray-600 text-white rounded-md"
        />
      </div>
      <div class="col-span-12 lg:col-span-6">
        <label for="name" class="block text-md font-medium text-gray-400 mb-1">GPU</label>
        <input
          v-model="filters.gpu.value"
          name="name"
          id="name"
          class="shadow-sm  p-2 w-full bg-thorg  block  sm:text-sm border-2 border-gray-600 text-white rounded-md"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 overflow-scroll ">
      <v-table
        :data="items"
        :filters="filters"
        class="divide-y-12 divide-gray-900 border-separate rowspacing w-full inline-block lg:table md:table xl:table  col-span-12"
      >
        <template #head>
          <tr>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-lg">Provider</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">GPU</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Cores</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Memory</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-lg">Disk</th>
          </tr>
        </template>
        <template #body="{ rows }">
          <tr
            class="hover:bg-white-300 cursor-pointer my-12 golemtr"
            v-for="provider in rows"
            :key="provider.id"
            v-on:click="nodedetails(provider.id)"
          >
            <td class="px-6 py-4 rounded-l-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12 bg-golemblue rounded-md p-3 relative">
                  <div>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping animate-ping"></div>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 golemping"></div>
                  </div>
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 golemtext">
                    {{ provider.Name }}
                  </div>
                  <div class="text-sm text-gray-500 ">
                    Thorg Miner
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="gpuicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <div v-if="provider.Gpus.length != 0" class="ml-4">
                  <div v-for="(gpu, index) in provider.Gpus" :key="gpu" class="text-sm font-medium text-gray-900 golemtext">
                    {{ gpu }}
                    <div class="text-sm text-gray-600 ">{{provider.Gpu_memory[index]}} GB VRAM</div>
                  </div>
                </div>
                <div v-else class="ml-4">
                  <div class="text-sm font-medium text-gray-900 golemtext">
                    Unknown GPU
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="chipicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 golemtext">
                    {{ provider.Cores }}
                  </div>
                </div>
              </div>
            </td>

            <td class="px-6 py-4">
              <dt class="flex flex-row items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="layersicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p class="ml-2 text-sm font-medium text-gray-900 golemtext">{{ provider.Memory }} GB</p>
              </dt>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <dt class="flex flex-row items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="databaseicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p class="ml-2 text-sm font-medium text-gray-900 golemtext">{{ provider.Disk }} GB</p>
              </dt>
            </td>
          </tr>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import GolemIcon from "@/components/golem.vue"
import { ChipIcon, DatabaseIcon, CubeTransparentIcon } from "@heroicons/vue/solid"
import LayersIcon from "@/components/layers.vue"


export default {
  components: {
    GolemIcon,
    ChipIcon,
    LayersIcon,
    DatabaseIcon,
    CubeTransparentIcon
  },

  data() {
    return {
      ignoredfilter: ["Cores", "Memory", "Disk", "cpu_hour", "per_hour", "start_price"],
      filter: "",
      filters: {
          name: { value: '', keys: ['Name', 'Wallet'] },
          gpu: { value: '', keys: ['Gpus',] },
          cores: { value: { min: 1, max: 256 }, custom: this.coresFilter },
          memory: { value: { min: 1, max: 2056 }, custom: this.memoryFilter },
          disk: { value: { min: 1, max: 200000 }, custom: this.diskFilter },
        },
      icon: "GolemIcon",
      chipicon: "ChipIcon",
      databaseicon: "DatabaseIcon",
      layersicon: "LayersIcon",
      gpuicon: "CubeTransparentIcon",
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
      this.$router.push({ name: "thorgnode", params: { id: row } })
    },
    fetchData() {
      axios.get("https://api.stats.golem.network/v1/network/online").then((response) => {
        const apiResponse = response.data
        this.items.length = 0
        apiResponse.forEach((obj) => {
          if (obj.data['golem.node.debug.subnet'] == "Thorg") {
            var gpus = []
          if (obj.data['golem.inf.gpu.card']) {
              obj.data['golem.inf.gpu.card'].forEach((obj) => {
                gpus.push(obj)
              })
          }


          if (obj.data['golem.inf.gpu.mem']) {
            var gpu_memory = []
              obj.data['golem.inf.gpu.mem'].forEach((obj) => {
                gpu_memory.push(this.floorFigure(obj / 1e+9))
              })
          } else {
            var gpu_memory = null
          }


          this.items.push({
            Online: obj.online,
            Name: obj.data["golem.node.id.name"],
            id: obj.data.id,
            Gpus: gpus,
            Gpu_memory: gpu_memory,
            Cores: obj.data["golem.inf.cpu.threads"],
            Wallet: obj.data.wallet,
            Memory: this.floorFigure(obj.data["golem.inf.mem.gib"]),
            Disk: this.floorFigure(obj.data["golem.inf.storage.gib"]),
          })

          }

        })
        this.loaded
        console.log(this.items)
        // const median = (arr) => {
        //   const mid = Math.floor(arr.length / 2)
        //   const nums = [...arr].sort((a, b) => a - b)
        //   return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2
        // }
        // this.median_cpu_hour = `${this.floorFigure(median(avg_cpu_hour), 3)} GLM`
        // this.median_start_price = `${this.floorFigure(median(avg_start_price), 3)} GLM`
        // this.median_per_hour = `${this.floorFigure(median(avg_per_hour), 3)} GLM`
        // this.median_loaded = true
        // const average = (array) => array.reduce((a, b) => a + b) / array.length
        // this.avg_cpu_hour = `${this.floorFigure(average(avg_cpu_hour), 5)} GLM`
        // this.avg_start_price = `${this.floorFigure(average(avg_start_price), 5)} GLM`
        // this.avg_per_hour = `${this.floorFigure(average(avg_per_hour), 5)} GLM`
      })
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
  @apply py-24;
  @apply sticky;
  @apply top-0;
  @apply z-10;
}

tbody {
  @apply bg-white;
}
</style>
