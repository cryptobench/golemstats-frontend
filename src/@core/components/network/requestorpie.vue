<template>
  <div>
    <b-card class="h-100">
      <b-row >
        <b-col lg="6">
      <h3>Amount of tasks requested by requestors</h3>
      <span class="card-text text-muted h5"
        >Ordered by most requesting to lowest.</span
      >
        </b-col>
        <b-col lg="3">
          <span><b>Chart height</b></span>
            <b-form-input v-model="height" /></p
        ></b-col>

        <b-col lg="3">
          <span><b>Requestors to display</b></span>
          <b-form-input v-model="displaycount" @keyup.enter="fetchData" />
        </b-col>
      </b-row>
      <apexchart width="100%" :height="height"  :options="chartOptions" :series="series"></apexchart>
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
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          id: "bar",
          type: "bar",
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
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: true,
          },
        },
        colors: ["#0c3be8"],
        dataLabels: {
          enabled: true,
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.timer = setInterval(() => {
      if (document.visibilityState === "hidden") { return }
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
      if (localStorage.getItem("vuexy-skin") == "dark") {
        this.chartOptions.chart.foreColor = "#fff"
        this.chartOptions.tooltip.theme = "dark"
      } else {
        this.chartOptions.chart.foreColor = "#373d3f"
        this.chartOptions.tooltip.theme = "light"
      }
      axios.get("/v1/requestors").then((response) => {
        const apiResponse = response.data
        let count = []
        const slicedArray = apiResponse.slice(0, this.displaycount)
        slicedArray.forEach((obj, i) => {
          let number = i + 1
          count.push({
            x: "Requestor " + number,
            y: Math.trunc(obj.tasks_requested),
          })
        })
        
        this.series = [
          {
            data: count,
            name: "Tasks Requested",
          },
        ]
      })
    },
  },
}
</script>
