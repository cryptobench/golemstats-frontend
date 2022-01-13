<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <h1 class="text-2xl mt-5 font-medium dark:text-gray-300">Network Statistics</h1>
    <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
        <dt>
          <div class="absolute bg-golemblue rounded-md p-3">
            <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Avg earnings per task</p>
        </dt>
        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
            {{this.averageearnings}}
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
          <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Network Earnings (6h)</p>
        </dt>
        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
            {{this.earnings6h}}
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
          <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Network Earnings (24h)</p>
        </dt>
        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
            {{this.earnings24h}}
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
          <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Network Earnings</p>
        </dt>
        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300 ">
            {{this.earnings90d}}
          </p>
          <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
            GLM
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script>
import GolemIcon from "@/components/golem.vue"
import axios from "axios"


export default {
  components: {
    GolemIcon,
  },

    data() {
    return {
      icon: "GolemIcon",
      earnings6h: "",
      earnings24h: "",
      earnings90d: "",
      averageearnings: "",

    }
    },
    created() {
      this.earnings1()
      this.earnings24()
      this.earnings365()
      this.earningspertask()
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
             earnings1() {
      axios.get("https://api.stats.golem.network/v1/network/earnings/6").then((response) => {
        const apiResponse = response.data
          this.earnings6h = `${apiResponse.total_earnings}`
      })
    },
    earnings24() {
      axios.get("https://api.stats.golem.network/v1/network/earnings/24").then((response) => {
        const apiResponse = response.data
          this.earnings24h = `${apiResponse.total_earnings}`
      })
    },
    earnings365() {
      axios.get("https://api.stats.golem.network/v1/network/earnings/90d").then((response) => {
        const apiResponse = response.data
          this.earnings90d = `${this.floorFigure(apiResponse.total_earnings)}`
      })
    },
    earningspertask() {
      axios.get("https://api.stats.golem.network/v1/network/provider/average/earnings").then((response) => {
        const apiResponse = response.data
          this.averageearnings = `${apiResponse.average_earnings}`
      })
    },
  }
}
</script>
