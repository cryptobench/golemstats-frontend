<template>
  <b-row>
    <b-col lg="12" md="12">
      <b-card>
        <div class="d-flex align-items-center">
          <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
            <feather-icon icon="ActivityIcon" size="18" />
          </b-avatar>
          <h1 class="avatar-margin">Network Activity in percentage</h1>

          <b-spinner variant="success" type="grow" small label="Spinning" class="mb-1 spinner-graph"></b-spinner>
        </div>
        <span class="card-text text-muted h5"
          ><b>{{ this.computing_now }}%</b> Utilization</span
        >
        <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BCard, BCol, BRow, BSpinner, BAvatar } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BAvatar,
    BRow,
    BCol,
    BSpinner,
  },
  data() {
    return {
      loaded: false,
      online: "",
      computing_now: "",
      series: [],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
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
        colors: ["#0eb567"],
        markers: {
          size: 0,
        },
        stroke: {
          width: 3,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 1,
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
              return value + " %"
            },
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
  mounted: function() {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") { return }
      this.utilization()
    }, 15000)
  },
  methods: {
    utilization() {
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios.get("/v1/network/online/stats").then((response) => {
        let responsedata = response.data
        this.online = responsedata.online
      })

      axios.get("/v1/network/utilization").then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        let computing = []
        for (var i in data) {
          var time = data[i][0] * 1000
          computing.push([time, floorFigure((data[i][1] / this.online) * 100, 2)])
        }
        var last_element = computing[computing.length - 1]
        this.computing_now = floorFigure((last_element[1] / this.online) * 100, 2)
        this.series = [
          {
            data: computing,
            name: "% of network computing",
          },
        ]
        if (localStorage.getItem("vuexy-skin") == "dark") {
          this.chartOptions.chart.foreColor = "#fff"
          this.chartOptions.colors.push("#2c34e6")
          this.chartOptions.tooltip.theme = "dark"
          this.chartOptions.fill.gradient.opacityFrom = 0
          this.chartOptions.fill.gradient.opacityTo = 0.3
        } else {
          this.chartOptions.chart.foreColor = "#373d3f"
          this.chartOptions.colors.push("#262ed1")
          this.chartOptions.tooltip.theme = "light"
        }
        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>
