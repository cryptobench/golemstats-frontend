<template>
  <div>
    <b-col lg="12" md="12">
      <h3>Network Utilization in percentage (6h)</h3>
      <b-card>
        <apexchart
          v-if="loaded"
          width="100%"
          height="250"
          type="area"
          :options="chartOptions"
          :series="series"
        ></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
  </div>
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
  data() {
    return {
      loaded: false,
      online: '',
      series: [],
      chartOptions: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          zoom: {
            autoScaleYaxis: true,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: 'HH:mm:ss',
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#ffd166'],
        markers: {
          size: 0,
        },
        stroke: {
          width: 2,
        },
        yaxis: {
          title: {
            text: 'Percentage of network computing',
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
        },
        xaxis: {
          type: 'datetime',
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
    this.utilization()
  },
  mounted: function () {
    this.timer = setInterval(() => {
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
      axios.get('/v1/network/online/stats').then((response) => {
        let responsedata = response.data
        this.online = responsedata.online
      })
      let now = Math.floor(new Date().getTime() / 1000)
      let then = now - 21600
      axios.get('/v1/network/' + then + '/' + now).then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        let computing = []
        for (var i in data) {
          var time = data[i][0] * 1000
          computing.push([time, floorFigure(data[i][1] / this.online, 2)])
        }
        this.series = [
          {
            data: computing,
            name: 'Percentage of network computing',
          },
        ]
        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>
