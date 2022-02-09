<template>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
    <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div class="absolute bg-golemblue rounded-md p-3">
          <component :is="icon" class="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </dt>
      <dd class="ml-16 pb-6 sm:pb-7">
        <div class="relative">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">{{ provider_title }}</p>
          <p class="text-sm font-medium text-green-500 truncate">Online and available for compute</p>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
        </div>
      </dd>
      <apexchart v-if="loaded" width="100%" height="250" type="area" :options="onlineoptions" :series="online"></apexchart>
    </div>
    <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div class="absolute bg-golemblue rounded-md p-3">
          <component :is="chipicon" class="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </dt>
      <dd class="ml-16 pb-6 sm:pb-7">
        <div class="relative">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">{{ cores_title }}</p>
          <p class="text-sm font-medium text-green-500 truncate">Online and available for compute</p>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
        </div>
      </dd>
      <apexchart v-if="loaded" width="100%" height="250" type="area" :options="coresoptions" :series="cores"></apexchart>
    </div>
    <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div class="absolute bg-golemblue rounded-md p-3">
          <component :is="layersicon" class="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </dt>
      <dd class="ml-16 pb-6 sm:pb-7">
        <div class="relative">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">{{ memory_title }}</p>
          <p class="text-sm font-medium text-green-500 truncate">Online and available for compute</p>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
        </div>
      </dd>
      <apexchart v-if="loaded" width="100%" height="250" type="area" :options="memoryoptions" :series="memory"></apexchart>
    </div>
    <div class="relative bg-white dark:bg-gray-800 pt-5 px-4 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
      <dt>
        <div class="absolute bg-golemblue rounded-md p-3">
          <component :is="databaseicon" class="h-6 w-6 text-white" aria-hidden="true" />
        </div>
      </dt>
      <dd class="ml-16 pb-6 sm:pb-7">
        <div class="relative">
          <p class="text-2xl font-semibold text-gray-900 dark:text-gray-300">{{ disk_title }}</p>
          <p class="text-sm font-medium text-green-500 truncate">Online and available for compute</p>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
        </div>
      </dd>
      <apexchart v-if="loaded" width="100%" height="250" type="area" :options="diskoptions" :series="disk"></apexchart>
    </div>
  </dl>
</template>

<script>
import { GlobeIcon, ChipIcon, DatabaseIcon } from "@heroicons/vue/solid"
import axios from "axios"
import LayersIcon from "@/components/layers.vue"
export default {
  components: {
    GlobeIcon,
    ChipIcon,
    DatabaseIcon,
    LayersIcon,
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
      icon: "GlobeIcon",
      chipicon: "ChipIcon",
      layersicon: "LayersIcon",
      databaseicon: "DatabaseIcon",
      memory: [],
      disk: [],
      diskoptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        stroke: {
          show: true,
          curve: ["smooth", "straight", "stepline"],
          lineCap: "line",
          width: 4,
          dashArray: 0,
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "dd MMMM HH:mm:ss",
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#0000ff"],
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 99],
          },
        },
        yaxis: {
          title: {
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function (value) {
              return value.toFixed(2) + " TB"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "UTC Time",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm:ss",
            },
          },
        },
      },
      memoryoptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "dd MMMM HH:mm:ss",
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#0000ff"],
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 99],
          },
        },
        yaxis: {
          title: {
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function (value) {
              let decimals = 2
              var d = Math.pow(10, decimals)
              return (parseInt(value * d) / d).toFixed(decimals) + " TB"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "UTC Time",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm:ss",
            },
          },
        },
      },
      coresoptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "dd MMMM HH:mm:ss",
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#0000ff"],
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 99],
          },
        },
        yaxis: {
          title: {
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function (value) {
              return value + " Cores"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "UTC Time",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm:ss",
            },
          },
        },
      },

      onlineoptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          zoom: {
            autoScaleYaxis: true,
          },
          animations: {
            enabled: false,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "dd MMMM HH:mm:ss",
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#0000ff"],
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 99],
          },
        },
        yaxis: {
          title: {
            rotate: -90,
            text: "Providers",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function (value) {
              return value
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            text: "UTC Time",
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm:ss",
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
      if (document.visibilityState === "hidden") {
        return
      }
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
      axios.get("https://api.stats.golem.network/v1/network/historical/stats/30m").then((response) => {
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
            name: "Providers online",
          },
        ]
        this.cores = [
          {
            data: cores,
            name: "Amount of Cores",
          },
        ]
        this.memory = [
          {
            data: memory,
            name: "TB of Memory",
          },
        ]
        this.disk = [
          {
            data: disk,
            name: "TB of Disk",
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
