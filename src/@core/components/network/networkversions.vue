<template>
  <b-row>
    <b-col lg="12" md="12">
      <b-card>
        <h3>Network Version Adoption (24h)</h3>
        <span class="card-text text-muted h5"
          >Live Data<b>{{ this.count }}</b></span
        >
        <apexchart v-if="loaded" width="100%" height="250" type="area" :options="chartOptions" :series="series"></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BCard, BCol, BRow, BSpinner } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BSpinner,
  },
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
            opacityFrom: 0.5,
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
      this.utilization()
    }, 15000)
  },
  methods: {
    utilization() {
      this.series.length = 0
      axios.get("/v1/network/versions").then((response) => {
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
