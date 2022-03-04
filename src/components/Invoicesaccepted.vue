<template>
  <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h3 class="text-2xl mb-2 font-medium dark:text-gray-300">Invoices Accepted (1h)</h3>
      <span class="dark:text-gray-400"
        >Find more details
        <a
          target="_blank"
          href="https://app.gitbook.com/@golem-network/s/stats-api/v1-api-endpoints/network-specific#providers-invoices-accepted-percentage-last-hour"
          >here</a
        ></span
      >
      <apexchart width="100%" class="py-6" height="250" type="radialBar" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height: 450,
      series: [],
      chartOptions: {
        colors: [],
        labels: ["Invoices Accepted"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
              background: "#272fd1",
            },
            track: {
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                blur: 4,
                opacity: 0.15,
              },
            },
            dataLabels: {
              name: {
                offsetY: -10,
                color: "#fff",
                fontSize: "13px",
              },
              value: {
                color: "#fff",
                fontSize: "30px",
                show: true,
              },
            },
          },
        },
        stroke: {
          lineCap: "round",
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
      this.axios.get("network/market/provider/invoice/accepted/1h").then((response) => {
        const apiResponse = response.data
        this.series.push(this.floorFigure(apiResponse.percentage_invoice_accepted))
        if (apiResponse.percentage_invoice_accepted >= 0.0 && apiResponse.percentage_invoice_accepted <= 25.0) {
          this.chartOptions.colors.push("#de0417")
        } else if (apiResponse.percentage_invoice_accepted >= 25.01 && apiResponse.percentage_invoice_accepted <= 60.0) {
          this.chartOptions.colors.push("#fcc603")
        } else if (apiResponse.percentage_invoice_accepted >= 60.01 && apiResponse.percentage_invoice_accepted <= 101.0) {
          this.chartOptions.colors.push("#04cc11")
        }
      })
    },
  },
}
</script>
