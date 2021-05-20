<template>
  <b-col lg="6" md="12">
    <b-card>
      <h3>{{ this.title }}</h3>
      <apexchart
        v-if="loaded"
        width="100%"
        height="350"
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
          palette: 'palette4', // upto palette10
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
              return value + ' Providers'
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
        let count = []
        apiResponse.forEach((obj) => {
          count.push([obj.date, obj.total])
        })
        this.series.push({
          data: count,
          name: 'Simultaneous Provider computing',
        })
      })

      this.loaded = true
    },
  },
}
</script>
