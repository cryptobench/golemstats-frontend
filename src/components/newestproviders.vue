<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-white dark:bg-gray-800 py-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Newest Providers</h1>
    <div class="grid grid-cols-12 overflow-scroll ">
      <v-table
        v-if="loaded"
        :data="this.items"
        class="divide-y-12 divide-gray-900 rowspacing w-full inline-block lg:table md:table xl:table  col-span-12"
      >
        <template #head>
          <tr>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-l-lg">Provider</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Cores</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider">Memory</th>
            <th scope="col" class="px-6 py-5 text-left text-xs font-medium text-white uppercase tracking-wider rounded-r-lg">Disk</th>
          </tr>
        </template>
        <template #body="{ rows }">
          <tr
            class="hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer my-12"
            v-for="provider in rows"
            :key="provider.Name"
            v-on:click="nodedetails(provider.id)"
          >
            <td class="px-6 py-4 rounded-l-lg">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-12 w-12 bg-golemblue rounded-md p-3 relative">
                  <div v-if="provider.computing_now">
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <div v-else>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300 animate-ping"></div>
                    <div class="absolute top-0 right-0 -mr-1 -mt-1 w-3 h-3 rounded-full bg-green-300"></div>
                  </div>
                  <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900 dark:text-gray-300">
                    {{ provider.Name}}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4">
              <dt class="flex flex-row items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="chipicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ provider.Cores }}</p>
              </dt>
            </td>

            <td class="px-6 py-4">
              <dt class="flex flex-row items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="layersicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ provider.Memory }} GB</p>
              </dt>
            </td>
            <td class="px-6 py-4 whitespace-nowrap rounded-r-lg">
              <dt class="flex flex-row items-center">
                <div class="bg-golemblue rounded-md p-3">
                  <component :is="databaseicon" class="h-4 w-4 text-white" aria-hidden="true" />
                </div>
                <p class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ provider.Disk }} GB</p>
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
import { ChipIcon, DatabaseIcon } from "@heroicons/vue/solid"
import LayersIcon from "@/components/layers.vue"
export default {


  data() {
    return {
      loaded: false,
      items: [],
      count: 4,
         icon: "GolemIcon",
      chipicon: "ChipIcon",
      databaseicon: "DatabaseIcon",
      layersicon: "LayersIcon",
    }
  },
    components: {
    GolemIcon,
    ChipIcon,
    LayersIcon,
    DatabaseIcon
  },
  created() {
    this.fetchData(this.count)
  },
  mounted() {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") { return }
      this.fetchData(this.count)
    }, 15000)
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    nodedetails(row) {
      this.$router.push({ name: "node", params: { id: row } })
    },
    expandAdditionalInfo(row) {
      this.$router.push({ name: "node", params: { id: row.id } })
    },
    fetchData(numberofnodes) {
      this.count = numberofnodes

      this.items.length = 0
      axios.get(`https://api.stats.golem.network/v1/network/historical/nodes/${numberofnodes}`).then((response) => {
        const apiResponse = response.data

        apiResponse.forEach((obj) => {
          if (obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
            var mainnet = true
            var wallet = obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]
            //  block of code to be executed if the condition is true
          } else {
            var mainnet = false
            var wallet = obj.data["golem.com.payment.platform.erc20-rinkeby-tglm.address"]
            //  block of code to be executed if the condition is false
          }
          const event = new Date(obj.created_at)
          this.items.push({
            Name: obj.data["golem.node.id.name"],
            Online: obj.online,
            id: obj.data.id,
            Computing: obj.computing_now,
            Memory: this.floorFigure(obj.data["golem.inf.mem.gib"]),
            Disk: this.floorFigure(obj.data["golem.inf.storage.gib"]),
            Cores: obj.data["golem.inf.cpu.threads"],
          })
        })
      })

      this.loaded = true
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
}
tbody {
  @apply bg-white;
  @apply dark:bg-gray-900;
}
</style>
