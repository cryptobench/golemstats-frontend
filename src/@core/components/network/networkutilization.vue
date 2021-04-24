<template>
  <div>
    <h3>Network Utilization (6h)</h3>
    <b-row>
      <b-col lg="12" md="12">
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
    </b-row>
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
      series: [
        {
          name: 'Providers Computing a task',
          data: [],
        },
      ],
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
        colors: ['#262ed1', '#d5d6d6'],
        markers: {
          size: 0,
        },
        stroke: {
          width: 3,
        },
        yaxis: [
          {
            tickAmount: 4,
            seriesName: 'Logarithmic',
          },
          {
            title: 'test',
            opposite: true,
            tickAmount: 4,
            seriesName: 'Linear',
          },
        ],
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 90, 100],
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
  props: {
    online: {
      type: Number,
      required: true,
    },
  },
  methods: {
    utilization() {
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      let now = Math.floor(new Date().getTime() / 1000)
      let then = now - 21600
      axios.get('/v1/network/' + then + '/' + now).then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        let computing = []
        let averagecomputing = []
        for (var i in data) {
          var time = data[i][0] * 1000
          computing.push([time, data[i][1]])
          averagecomputing.push([
            time,
            floorFigure((data[i][1] / this.online) * 100, 2),
          ])
        }
        this.series = [
          {
            name: 'Logarithmic',
            data: computing,
          },
          {
            name: 'Linear',
            data: averagecomputing,
          },
        ]
        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>
