<template>
  <div class="bg-white dark:bg-gray-800 pt-5 -mb-2 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
      <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
      <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">{{this.title}}</h1>
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        v-if="showAnnotations"
        @click="hideshowAnnotation()"
      >
        Hide Release Labels
      </button>
      <button
        type="button"
        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
        v-else
        @click="hideshowAnnotation()"
      >
        Show Release Labels
      </button>

      <apexchart width="100%" height="350" type="area" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {

  props: {
    endpoint: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    colors: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showAnnotations: false,
      loaded: false,
      computingath: "",
      series: [],
      options: {
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
        annotations: {
          xaxis: [
            {
              x: new Date("21 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.6.7 Released",
              },
            },
            {
              x: new Date("20 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.6.6 Released",
              },
            },
            {
              x: new Date("15 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.1 Released",
              },
            },
            {
              x: new Date("8 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.2 Released",
              },
            },
            {
              x: new Date("28 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.3 Released",
              },
            },
            {
              x: new Date("11 October 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.8.0 Released",
              },
            },
            {
              x: new Date("8 December 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.9.0 Released",
              },
            },
          ],
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [this.colors],
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
            formatter: function (value) {
              return Math.floor(value) + " Providers"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
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
    this.fetchData()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") {
        return
      }
      this.fetchData()
    }, 15000)
  },
  methods: {
    hideshowAnnotation() {
      if (this.showAnnotations) {
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
        elem.forEach((element) => (element.style.visibility = "hidden"))
        this.showAnnotations = false
      } else {
        this.showAnnotations = true
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
        elem.forEach((element) => (element.style.visibility = "visible"))
      }
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    fetchData() {
      this.series.length = 0
      axios.get(this.endpoint).then((response) => {
        let apiResponse = response.data
        let count = []
        let counttotal = []
        apiResponse.forEach((obj) => {
          count.push([obj.date, obj.total])
          counttotal.push(obj.total)
        })
        this.computingath = Math.max.apply(Math, counttotal)
        this.series.push({
          data: count,
          name: "Simultaneous providers computing",
        })
      })

    },
  },
}
</script>
