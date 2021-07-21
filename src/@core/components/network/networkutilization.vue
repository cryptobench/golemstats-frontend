<template>
  <div>
    <b-card>
      <div class="d-flex align-items-center">
        <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
          <feather-icon icon="ActivityIcon" size="18" />
        </b-avatar>
        <h1 class="avatar-margin">Network Activity</h1>

        <b-spinner variant="success" type="grow" small label="Spinning" class="mb-1 spinner-graph"></b-spinner>
      </div>
      <span class="card-text text-muted h5"
        ><b>{{ this.computing_now }}</b> provider(s) computing right now</span
      >
      <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
      <div class="text-center" v-else>
        <b-spinner variant="primary" label="Text Centered" />
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCol, BRow, BSpinner, BAvatar } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BRow,
    BAvatar,
    BCol,
    BSpinner,
  },

  data() {
    return {
      computing_now: "",
      loaded: false,
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
        colors: [],
        markers: {
          size: 0,
        },
        stroke: {
          width: 4,
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
            opacityFrom: 0.8,
            opacityTo: 0.0,
            stops: [0, 90, 100],
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
      this.utilization()
    }, 15000)
  },
  methods: {
    utilization() {
      axios.get("/v1/network/utilization").then((response) => {
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
