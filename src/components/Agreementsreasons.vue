<template>
  <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h3 class="text-2xl mb-2 font-medium dark:text-gray-300">Market Agreement Outcome (1h)</h3>
      <span class="text-gray-500 dark:text-gray-400"
        >Find more details
        <a target="_blank" href="https://docs.stats.golem.network/v1-api-endpoints/network-specific#market-agreement-termination-reasons"
          ><span class="text-golemblue dark:text-gray-300">here</span></a
        ></span
      >
    </div>

    <apexchart class="py-6" width="100%" height="250" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          id: "donut",
          type: "donut",
          foreColor: "#373d3f",
        },
        labels: ["Success", "Cancelled by Requestor", "Task Expired", "Requestor Unreachable", "Debitnote Deadline"],
        dataLabels: {
          enabled: true,
        },
        theme: {
          palette: "palette8", // upto palette10
        },
        stroke: {
          colors: [""],
        },
      },
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") {
        return
      }
      this.fetchData()
    }, 15000)
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    fetchData() {
      this.series.length = 0
      this.axios.get("network/market/agreement/termination/reasons").then((response) => {
        const apiResponse = response.data
        this.series.push(
          apiResponse.market_agreements_success,
          apiResponse.market_agreements_cancelled,
          apiResponse.market_agreements_expired,
          apiResponse.market_agreements_requestorUnreachable,
          apiResponse.market_agreements_debitnoteDeadline
        )
      })
    },
  },
}
</script>
