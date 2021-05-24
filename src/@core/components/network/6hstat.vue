<template>
  <b-row>
    <b-col lg="6" md="12">
      <b-card>
        <div class="d-flex align-items-center">
          <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
            <feather-icon icon="GlobeIcon" size="18" />
          </b-avatar>
          <h1 class="avatar-margin">{{ this.provider_title }}</h1>

          <b-spinner
            variant="success"
            type="grow"
            small
            label="Spinning"
            class="mb-1 spinner-graph"
          ></b-spinner>
        </div>
        <b-badge class="badge-graph" pill variant="success"
          >Online and available for compute</b-badge
        >

        <apexchart
          v-if="loaded"
          width="100%"
          height="250"
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
        <div class="d-flex align-items-center">
          <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
            <feather-icon icon="CpuIcon" size="18" />
          </b-avatar>
          <h1 class="avatar-margin">{{ this.cores_title }}</h1>

          <b-spinner
            variant="success"
            type="grow"
            small
            label="Spinning"
            class="mb-1 spinner-graph"
          ></b-spinner>
        </div>
        <b-badge class="badge-graph" pill variant="success"
          >Online and available for compute</b-badge
        >
        <apexchart
          v-if="loaded"
          width="100%"
          height="250"
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
        <div class="d-flex align-items-center">
          <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
            <feather-icon icon="LayersIcon" size="18" />
          </b-avatar>
          <h1 class="avatar-margin">{{ this.memory_title }}</h1>

          <b-spinner
            variant="success"
            type="grow"
            small
            label="Spinning"
            class="mb-1 spinner-graph"
          ></b-spinner>
        </div>
        <b-badge class="badge-graph" pill variant="success"
          >Online and available for compute</b-badge
        >
        <apexchart
          v-if="loaded"
          width="100%"
          height="250"
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
        <div class="d-flex align-items-center">
          <b-avatar class="avatar-margin-btm" variant="light-primary" rounded>
            <feather-icon icon="HardDriveIcon" size="18" />
          </b-avatar>
          <h1 class="avatar-margin">{{ this.disk_title }}</h1>

          <b-spinner
            variant="success"
            type="grow"
            small
            label="Spinning"
            class="mb-1 spinner-graph"
          ></b-spinner>
        </div>
        <b-badge class="badge-graph" pill variant="success"
          >Online and available for compute</b-badge
        >
        <apexchart
          v-if="loaded"
          width="100%"
          height="250"
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
import { BCard, BCol, BRow, BSpinner, BBadge, BAvatar } from 'bootstrap-vue'
import axios from '@axios'
export default {
  components: {
    BCard,
    BAvatar,
    BRow,
    BCol,
    BBadge,
    BSpinner,
  },
  props: {
    provider_title: {
      type: String,
      required: true,
    },
    cores_title: {
      type: String,
      required: true,
    },
    memory_title: {
      type: String,
      required: true,
    },
    disk_title: {
      type: String,
      required: true,
    },
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
            format: 'dd MMMM HH:mm:ss',
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
              return value.toFixed(2) + ' TB'
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
            format: 'dd MMMM HH:mm:ss',
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
            format: 'dd MMMM HH:mm:ss',
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
            format: 'dd MMMM HH:mm:ss',
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
      axios.get('/v1/network/historical/stats/6h').then((response) => {
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

<style>
.badge-graph {
  margin-bottom: 6px;
}
.spinner-graph {
  margin-bottom: 35px !important;
  margin-left: 2px;
}

.spinner-grow {
  animation: 1s linear infinite spinner-grow, pause-between-iterations 5s;
}

@keyframes pause-between-iterations {
  /* Other animation is visible for 25% of the time */
  0% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  /* Other animation is hidden for 75% of the time */
  25.1% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.avatar-margin {
  margin-left: 10px;
}
.avatar-margin-btm {
  margin-bottom: 5px;
}
</style>