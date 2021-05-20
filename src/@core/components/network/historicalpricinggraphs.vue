<template>
  <b-col lg="6" md="12">
    <h3>{{ this.title }}</h3>
    <b-card>
      <apexchart
        v-if="loaded"
        width="100%"
        height="250"
        type="area"
        :options="options"
        :series="series"
      ></apexchart>
      <div class="text-center" v-else>
        <b-spinner variant="primary" label="Text Centered" />
      </div>
    </b-card>
  </b-col>
</template>

<script>
import { BCard, BCol, BRow, BSpinner } from 'bootstrap-vue'
import axios from '@axios'
export default {
  components: {
    BCard,
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
  },
  data() {
    return {
      loaded: false,
      series: [],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: 'linear',
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
        theme: {
          palette: 'palette3', // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: 'gradient',
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
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
          labels: {
            formatter: function (value) {
              return value + ' GLM'
            },
          },
        },
        xaxis: {
          type: 'datetime',
          title: {
            rotate: -90,
            offsetX: -25,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm:ss',
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
          name: 'Start',
        })
        this.series.push({
          data: cpuh,
          name: 'CPU/h',
        })
        this.series.push({
          data: perh,
          name: 'Per/h',
        })
      })

      this.loaded = true
    },
  },
}
</script>
