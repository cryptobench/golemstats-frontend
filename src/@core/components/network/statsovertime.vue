<template>
  <b-row>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Providers</h3>
        <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
        <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>
        <div v-if="loaded" class="text-center">
          <apexchart width="100%" height="350" type="area" :options="onlineoptions" :series="online"></apexchart>
          <b-badge class="text-center" variant="success">ATH: {{ onlinecount }} Providers</b-badge>
        </div>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Cores</h3>
        <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
        <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>

        <div v-if="loaded" class="text-center">
          <apexchart width="100%" height="350" type="area" :options="coresoptions" :series="cores"></apexchart>
          <b-badge class="text-center" variant="success">ATH: {{ corescount }} Cores</b-badge>
        </div>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Memory (TB)</h3>
        <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
        <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>

        <div v-if="loaded" class="text-center">
          <apexchart width="100%" height="350" type="area" :options="memoryoptions" :series="memory"></apexchart>
          <b-badge class="text-center" variant="success">ATH: {{ memorycount }} TB </b-badge>
        </div>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
    <b-col lg="6" md="12">
      <b-card>
        <h3>Historical Stats Disk (TB)</h3>
        <b-button v-if="showAnnotations" @click="hideshowAnnotation()" size="sm" variant="primary">Hide Release Labels</b-button>
        <b-button v-else @click="hideshowAnnotation()" size="sm" variant="primary">Show Release Labels</b-button>

        <div v-if="loaded" class="text-center">
          <apexchart width="100%" height="350" type="area" :options="diskoptions" :series="disk"></apexchart>
          <b-badge class="text-center" variant="success">ATH: {{ diskcount }} TB </b-badge>
        </div>
        <div class="text-center" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BCard, BBadge, BCol, BRow, BSpinner, BButton } from "bootstrap-vue"
import axios from "@axios"
export default {
  components: {
    BCard,
    BButton,
    BRow,
    BCol,
    BBadge,
    BSpinner,
  },
  data() {
    return {
      showAnnotations: false,
      loaded: false,
      online: [],
      onlinecount: [],
      cores: [],
      corescount: [],
      memory: [],
      memorycount: [],
      disk: [],
      diskcount: [],
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
        annotations: {
          xaxis: [
            {
              x: new Date("21 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.6.7 Released",
              },
            },
            {
              x: new Date("20 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.6.6 Released",
              },
            },
            {
              x: new Date("6 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.6.5 Released",
              },
            },
            {
              x: new Date("15 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.1 Released",
              },
            },
          ],
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
          palette: "palette7", // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
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
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function(value) {
              return value + " TB"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            rotate: -90,
            offsetX: -25,
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
        annotations: {
          xaxis: [
            {
              x: new Date("21 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.6.7 Released",
              },
            },
            {
              x: new Date("20 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.6.6 Released",
              },
            },
            {
              x: new Date("6 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.6.5 Released",
              },
            },
            {
              x: new Date("15 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.1 Released",
              },
            },
          ],
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
          palette: "palette10", // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
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
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function(value) {
              let decimals = 2
              var d = Math.pow(10, decimals)
              return (parseInt(value * d) / d).toFixed(decimals) + " TB"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            rotate: -90,
            offsetX: -25,
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
        annotations: {
          xaxis: [
            {
              x: new Date("21 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.6.7 Released",
              },
            },
            {
              x: new Date("20 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.6.6 Released",
              },
            },
            {
              x: new Date("6 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4  ",
                },
                text: "0.6.5 Released",
              },
            },
            {
              x: new Date("15 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.1 Released",
              },
            },
          ],
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
          palette: "palette4", // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
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
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function(value) {
              return value + " Cores"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            rotate: -90,
            offsetX: -25,
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
        annotations: {
          xaxis: [
            {
              x: new Date("21 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.6.7 Released",
              },
            },
            {
              x: new Date("20 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5",
              label: {
                borderColor: "#3F51B5",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.6.6 Released",
              },
            },
            {
              x: new Date("6 May 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.6.5 Released",
              },
            },
            {
              x: new Date("15 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.1 Released",
              },
            },
          ],
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
          palette: "palette2", // upto palette10
        },
        markers: {
          size: 0,
        },

        fill: {
          type: "gradient",
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
              fontSize: "12px",
              fontWeight: 600,
              cssClass: "apexcharts-yaxis-title",
            },
          },
          labels: {
            formatter: function(value) {
              return value + " Providers"
            },
          },
        },
        xaxis: {
          type: "datetime",
          title: {
            rotate: -90,
            offsetX: -25,
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
  mounted: function() {
    this.timer = setInterval(() => {
      this.fetchData()
    }, 15000)
  },
  methods: {
    hideshowAnnotation() {
      if (this.showAnnotations) {
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
        elem.forEach((element) => (element.style.visibility = "hidden"))
        this.showAnnotations = false
      } else {
        this.showAnnotations = true
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
        elem.forEach((element) => (element.style.visibility = "visible"))
      }
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    fetchData() {
      axios.get("/v1/network/historical/stats").then((response) => {
        let apiResponse = response.data
        let online = []
        let onlinecount = []
        let cores = []
        let corescount = []
        let memory = []
        let memorycount = []
        let disk = []
        let diskcount = []
        apiResponse.forEach((obj) => {
          online.push([obj.date, obj.online])
          onlinecount.push(obj.online)
          cores.push([obj.date, obj.cores])
          corescount.push(obj.cores)
          memory.push([obj.date, this.floorFigure(obj.memory / 1024, 0)])
          memorycount.push(this.floorFigure(obj.memory / 1024, 0))
          disk.push([obj.date, this.floorFigure(obj.disk / 1024, 0)])
          diskcount.push(this.floorFigure(obj.disk / 1024, 0))
        })
        this.onlinecount = Math.max.apply(Math, onlinecount)
        this.corescount = Math.max.apply(Math, corescount)
        this.memorycount = Math.max.apply(Math, memorycount)
        this.diskcount = Math.max.apply(Math, diskcount)
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
.apexcharts-xaxis-annotations {
  visibility: hidden;
}
</style>
