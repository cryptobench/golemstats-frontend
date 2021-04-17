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
        colors: ['#262ed1'],
        markers: {
          size: 0,
        },
        stroke: {
          width: 3,
        },
        yaxis: {
          title: {
            text: 'Providers computing',
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
  methods: {
    utilization() {
      let now = Math.floor(new Date().getTime() / 1000)
      let then = now - 21600
      axios.get('/v1/network/' + then + '/' + now).then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        let computing = []
        for (var i in data) {
          var time = data[i][0] * 1000
          computing.push([time, data[i][1]])
        }
        this.series = [
          {
            data: computing,
            name: 'Providers computing a task',
          },
        ]
        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>
