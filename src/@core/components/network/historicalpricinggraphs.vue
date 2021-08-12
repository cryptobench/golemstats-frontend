<template>
  <b-card>
    <h3>{{ this.title }}</h3>
    <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
    <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>
    <apexchart v-if="loaded" width="100%" height="350" type="area" :options="options" :series="series"></apexchart>
    <div class="text-center" v-else>
      <b-spinner variant="primary" label="Text Centered" />
    </div>
  </b-card>
</template>

<script>
import { BCard, BCol, BRow, BSpinner, BButton } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BSpinner,
  },
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    palette: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showAnnotations: false,
      loaded: false,
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
        colors: this.palette,
        markers: {
          size: 0,
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
          ],
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
              return value + " GLM"
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
  mounted: function() {
    this.timer = setInterval(() => {
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
        let start = []
        let cpuh = []
        let perh = []
        apiResponse.forEach((obj) => {
          start.push([obj.date, this.floorFigure(obj.start, 3)])
          cpuh.push([obj.date, this.floorFigure(obj.cpuh, 3)])
          perh.push([obj.date, this.floorFigure(obj.perh, 3)])
        })
        this.series.push({
          data: start,
          name: "Start",
        })
        this.series.push({
          data: cpuh,
          name: "CPU/h",
        })
        this.series.push({
          data: perh,
          name: "Per/h",
        })
      })
      if (localStorage.getItem("vuexy-skin") == "dark") {
        this.options.chart.foreColor = "#fff"
        this.options.colors.push("#2c34e6")
        this.options.tooltip.theme = "dark"
      } else {
        this.options.chart.foreColor = "#373d3f"
        this.options.colors.push("#262ed1")
        this.options.tooltip.theme = "light"
      }

      this.loaded = true
    },
  },
}
</script>
