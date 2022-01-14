<template>
  <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Network Activity</h1>
      <div class="d-flex align-items-center">
        <dt>
          <div class="absolute bg-golemblue rounded-md p-3">
            <component :is="globe" class="h-6 w-6 text-white animate-spin" aria-hidden="true" />
          </div>
        </dt>
        <dd class="ml-16 pb-6 sm:pb-7">
          <div class="relative">
            <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">{{computing_now}} Providers</p>
            <p class="text-sm font-medium text-green-500 truncate">Computing right now</p>
          </div>
        </dd>
      </div>
    </div>

    <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import axios from "axios"
import { StatusOnlineIcon } from "@heroicons/vue/solid"
export default {
  components: {
    StatusOnlineIcon,
  },

  data() {
    return {
      computing_now: "",
      loaded: false,
      globe: "StatusOnlineIcon",
      series: [
        {
          name: "Providers Computing a task",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
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
        dataLabels: {
          enabled: false,
        },
        colors: ["#0000ff"],
        markers: {
          size: 0,
        },
        stroke: {
          width: 4.5,
        },
        yaxis: {
          title: {
            text: "Providers computing",
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
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 99],
          },
        },
        xaxis: {
          type: "datetime",
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
  mounted: function () {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") {
        return
      }
      this.utilization()
    }, 15000)
  },
  methods: {
    utilization() {
      axios.get("https://api.stats.golem.network/v1/network/utilization").then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        let computing = []
        for (var i in data) {
          var time = data[i][0] * 1000
          computing.push([time, data[i][1]])
        }
        var last_element = computing[computing.length - 1]
        this.computing_now = last_element[1]
        this.series = [
          {
            data: computing,
            name: "Providers computing a task",
          },
        ]

        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>

<style>
.animate-spin {
  animation: spin 1.9s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
