<template>
  <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Network Version Adoption</h1>

      <apexchart v-if="loaded" width="100%" height="350" type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      loaded: false,
      series: [
        {
          data: [],
          name: "Providers",
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
          },
        },

        colors: ["#0000ff"],
        dataLabels: {
          enabled: false,
        },
      },
    }
  },
  created() {
    this.utilization()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") {
        return
      }
      this.utilization()
    }, 65000)
  },
  methods: {
    utilization() {
      this.series[0].data.length = 0
      axios.get("https://api.stats.golem.network/v1/network/versions").then((response) => {
        let apiResponse = response.data

        apiResponse.forEach((obj, index) => {
          let versions = obj["version"]
          let count = obj["count"]

          this.series[0].data.push({
            x: versions,
            y: count,
          })
        })
      })

      this.loaded = true
    },
  },
}
</script>
