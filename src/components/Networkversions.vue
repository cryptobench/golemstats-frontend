<template>
  <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Network Version Adoption (24h)</h1>

      <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {

  data() {
    return {
      loaded: false,
      series: [],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
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
        theme: {
          palette: "palette10", // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0.2,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          title: {
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
          labels: {
            formatter: function(value) {
              return value + " Nodes"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "Yagna version",
            rotate: -90,
            offsetX: -25,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
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
  created() {
    this.utilization()
  },
  mounted: function() {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") { return }
      this.utilization()
    }, 15000)
  },
  methods: {
    utilization() {
      this.series.length = 0
      axios.get("https://api.stats.golem.network/v1/network/versions").then((response) => {
        let apiResponse = response.data
        let data = apiResponse[0].data.result
        data.forEach((obj, index) => {
          let values = obj["values"]
          let computing = []
          for (var i in values) {
            var time = values[i][0] * 1000
            computing.push([time, values[i][1]])
          }
          let unformatted_version = obj["metric"]["version"].slice(-3, 5)
          let version_name = unformatted_version[0] + "." + unformatted_version[1] + "." + unformatted_version[2]
          this.series.push({
            data: computing,
            name: version_name,
          })
        })
      })

      this.loaded = true
    },
  },
}
</script>
