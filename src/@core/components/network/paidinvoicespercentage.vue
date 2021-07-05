<template>
  <div>
    <b-card class="h-100 pb-4">
      <b-row>
        <b-col>
          <h3>Invoices Paid (1h)</h3>
          <span class="card-text text-muted h5"
            >Find more details
            <a
              target="_blank"
              href="https://app.gitbook.com/@golem-network/s/stats-api/v1-api-endpoints/network-specific#paid-invoices-last-hour"
              >here</a
            ></span
          >
        </b-col>
      </b-row>
      <apexchart width="100%" height="250" type="radialBar" v-if="loaded" :options="chartOptions" :series="series"></apexchart>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCol, BRow, BSpinner, BFormInput } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BFormInput,
    BRow,
    BCol,
    BSpinner,
  },
  data() {
    return {
      loaded: false,
      wallet: "",
      displaycount: 15,
      height: 450,
      series: [],
      chartOptions: {
        colors: [],

        labels: ["Invoices Paid"],
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
      axios.get("/v1/network/market/invoice/paid/1h").then((response) => {
        const apiResponse = response.data
        this.series.push(this.floorFigure(apiResponse.percentage_paid))
        if (apiResponse.percentage_paid >= 0.0 && apiResponse.percentage_paid <= 25.0) {
          this.chartOptions.colors.push("#de0417")
        } else if (apiResponse.percentage_paid >= 25.01 && apiResponse.percentage_paid <= 60.0) {
          this.chartOptions.colors.push("#fcc603")
        } else if (apiResponse.percentage_paid >= 60.01 && apiResponse.percentage_paid <= 101.0) {
          this.chartOptions.colors.push("#04cc11")
        }
        this.loaded = true
      })
    },
  },
}
</script>
