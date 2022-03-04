<template>
  <div class="bg-white dark:bg-gray-800 pt-5 mb-2 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Amount of tasks requested by requestors</h1>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">Requestors to display</label>
      <input
        v-model="displaycount"
        @keyup.enter="fetchData"
        name="name"
        id="name"
        class="shadow-sm mb-2 focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full block sm:text-sm border-2 border-gray-100 rounded-md"
      />
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300"
        >Chart Height <span class="text-sm font-medium text-gray-400">px</span></label
      >
      <input
        v-model="height"
        name="name"
        id="name"
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full block sm:text-sm border-2 border-gray-100 rounded-md"
      />

      <apexchart width="100%" :height="height" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      wallet: "",
      displaycount: 15,
      height: 450,
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          id: "bar",
          type: "bar",
          foreColor: "#373d3f",
          zoom: {
            autoScaleYaxis: true,
          },
        },
        tooltip: {
          theme: "light",
          enabled: true,
          x: {
            show: true,
            format: "HH:mm:ss",
            formatter: undefined,
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
          },
        },
        colors: ["#0c3be8"],
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [],
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
      this.axios.get("requestors").then((response) => {
        const apiResponse = response.data
        let count = []
        const slicedArray = apiResponse.slice(0, this.displaycount)
        slicedArray.forEach((obj, i) => {
          let number = i + 1
          count.push({
            x: "Requestor " + number,
            y: Math.trunc(obj.tasks_requested),
          })
        })

        this.series = [
          {
            data: count,
            name: "Tasks Requested",
          },
        ]
      })
    },
  },
}
</script>
<style>
@media (prefers-color-scheme: dark) {
  html.dark #apexchartsareaxdatetime,
  html.dark .apexcharts-text tspan,
  html.dark .apexcharts-yaxis-title-text,
  html.dark .apexcharts-legend-text,
  html.dark .apexcharts-legend-series .apexcharts-legend-text,
  html.dark .apexcharts-xaxistooltip,
  html.dark .apexcharts-yaxistooltip,
  html.dark .apexcharts-point-annotations,
  html.dark .apexcharts-legend-text span {
    fill: theme("colors.gray.400");
    @apply text-gray-400;
  }

  html.dark .apexcharts-area-series path,
  html.dark .apexcharts-bar-series path {
    fill: theme("colors.blue.800");
  }
}
</style>
