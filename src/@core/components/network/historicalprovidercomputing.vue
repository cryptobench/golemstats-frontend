<template>
  <b-card>
    <h3>{{ this.title }}</h3>
    <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
    <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>

    <div v-if="loaded" class="text-center">
      <apexchart width="100%" height="350" type="area" :options="options" :series="series"></apexchart>
      <b-badge class="text-center" variant="success">ATH: {{ computingath }} </b-badge>
    </div>
    <div class="text-center" v-else>
      <b-spinner variant="primary" label="Text Centered" />
    </div>
  </b-card>
</template>

<script>
import { BCard, BCol, BRow, BSpinner, BBadge, BButton } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BBadge,
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
            formatter: function(value) {
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

      this.loaded = true
    },
  },
}
</script>
