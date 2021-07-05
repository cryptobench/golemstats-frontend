<template>
  <div>
    <b-card class="h-100">
      <b-row>
        <b-col lg="6">
          <h3>Market Agreement Termination Reasons</h3>
          <span class="card-text text-muted h5"
            >Find more details
            <a
              target="_blank"
              href="https://docs.stats.golem.network/v1-api-endpoints/network-specific#market-agreement-termination-reasons"
              >here</a
            ></span
          >
        </b-col>
      </b-row>
      <apexchart width="100%" height="250" type="donut" v-if="loaded" :options="chartOptions" :series="series"></apexchart>
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
        labels: ["Success", "Cancelled by Requestor", "Task Expired", "Requestor Unreachable", "Debitnote Deadline"],
        dataLabels: {
          enabled: true,
        },
        theme: {
          palette: "palette10", // upto palette10
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
      axios.get("/v1/network/market/agreement/termination/reasons").then((response) => {
        const apiResponse = response.data
        this.series.push(
          apiResponse.market_agreements_success,
          apiResponse.market_agreements_cancelled,
          apiResponse.market_agreements_expired,
          apiResponse.market_agreements_requestorUnreachable,
          apiResponse.market_agreements_debitnoteDeadline
        )
        this.loaded = true
      })
    },
  },
}
</script>
