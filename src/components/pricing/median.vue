<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div>
    <dl class="mt-2 grid grid-rows-4 grid-flow-col gap-4 grid-cols-12">
      <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden col-span-12">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <dt>
            <div class="absolute bg-golemblue rounded-md p-3">
              <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">CPU per hour</p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
              {{this.cpuhour}}
            </p>
            <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
              GLM
            </p>
          </dd>
        </div>
      </div>
      <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden col-span-12">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <dt>
            <div class="absolute bg-golemblue rounded-md p-3">
              <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Env per hour</p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
              {{this.perhour}}
            </p>
            <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
              GLM
            </p>
          </dd>
        </div>
      </div>
      <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden col-span-12">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <dt>
            <div class="absolute bg-golemblue rounded-md p-3">
              <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p class="ml-16 text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Start pricing</p>
          </dt>
          <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">
              {{this.startpricing}}
            </p>
            <p class="ml-2 flex items-baseline text-sm font-semibold text-golemblue dark:text-gray-400">
              GLM
            </p>
          </dd>
        </div>
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
      cpuhour: "",
      perhour: "",
      startpricing: "",

    }
    },
    created() {
      this.medianpricing()
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
             medianpricing() {
      axios.get("https://api.stats.golem.network/v1/network/pricing/median").then((response) => {
        const apiResponse = response.data
          this.cpuhour = this.floorFigure(apiResponse.cpuhour, 4)
          this.perhour = this.floorFigure(apiResponse.perhour, 4)
          this.startpricing = this.floorFigure(apiResponse.start, 4)
      })
    },
  }
}
</script>
