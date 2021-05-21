<template>
  <b-row>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Providers</h3>
        <apexchart
          v-if="loaded"
          width="100%"
          height="350"
          type="area"
          :options="onlineoptions"
          :series="online"
        ></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Cores</h3>
        <apexchart
          v-if="loaded"
          width="100%"
          height="350"
          type="area"
          :options="coresoptions"
          :series="cores"
        ></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Memory (TB)</h3>
        <apexchart
          v-if="loaded"
          width="100%"
          height="350"
          type="area"
          :options="memoryoptions"
          :series="memory"
        ></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Disk (TB)</h3>
        <apexchart
          v-if="loaded"
          width="100%"
          height="350"
          type="area"
          :options="diskoptions"
          :series="disk"
        ></apexchart>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
  </b-row>
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
      online: [],
      cores: [],
      memory: [],
      disk: [],
      diskoptions: {
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
          palette: 'palette7', // upto palette10
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
              return value + ' TB'
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
      memoryoptions: {
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
          palette: 'palette10', // upto palette10
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
              let decimals = 2
              var d = Math.pow(10, decimals)
              return (parseInt(value * d) / d).toFixed(decimals) + ' TB'
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
      coresoptions: {
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
              return value + ' Cores'
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

      onlineoptions: {
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
          palette: 'palette2', // upto palette10
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
      axios.get('/v1/network/historical/stats').then((response) => {
        let apiResponse = response.data
        let online = []
        let cores = []
        let memory = []
        let disk = []
        apiResponse.forEach((obj) => {
          online.push([obj.date, obj.online])
          cores.push([obj.date, obj.cores])
          memory.push([obj.date, this.floorFigure(obj.memory / 1024, 0)])
          disk.push([obj.date, this.floorFigure(obj.disk / 1024, 0)])
        })
        this.online = [
          {
            data: online,
            name: 'Providers online',
          },
        ]
        this.cores = [
          {
            data: cores,
            name: 'Amount of Cores',
          },
        ]
        this.memory = [
          {
            data: memory,
            name: 'TB of Memory',
          },
        ]
        this.disk = [
          {
            data: disk,
            name: 'TB of Disk',
          },
        ]
      })

      this.loaded = true
    },
  },
}
</script>
