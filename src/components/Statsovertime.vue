<template>
  <div class="grid gap-5 -mb-1 grid-cols-12">
    <div class="lg:col-span-6 col-span-12 md:col-span-12">
      <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Historical Stats Providers</h1>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-if="showAnnotations"
            @click="hideshowAnnotation()"
          >
            Hide Release Labels
          </button>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-else
            @click="hideshowAnnotation()"
          >
            Show Release Labels
          </button>
          <div v-if="loaded" class="text-center py-5">
            <apexchart :key="updaterender" width="100%" height="350" type="area" :options="onlineoptions" :series="online"></apexchart>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white"
              >ATH: {{ onlinecount }} Providers</span
            >
          </div>

          <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
    <div class="lg:col-span-6 col-span-12 md:col-span-12">
      <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Historical Stats Cores</h1>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-if="showAnnotations"
            @click="hideshowAnnotation()"
          >
            Hide Release Labels
          </button>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-else
            @click="hideshowAnnotation()"
          >
            Show Release Labels
          </button>

          <div v-if="loaded" class="text-center py-5">
            <apexchart :key="updaterender" width="100%" height="350" type="area" :options="coresoptions" :series="cores"></apexchart>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white"
              >ATH: {{ corescount }} Cores</span
            >
          </div>

          <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
    <div class="lg:col-span-6 col-span-12 md:col-span-12">
      <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">
            Historical Stats Memory <span class="ml-1 text-base font-medium text-gray-400">TB</span>
          </h1>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-if="showAnnotations"
            @click="hideshowAnnotation()"
          >
            Hide Release Labels
          </button>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-else
            @click="hideshowAnnotation()"
          >
            Show Release Labels
          </button>

          <div v-if="loaded" class="text-center py-5">
            <apexchart :key="updaterender" width="100%" height="350" type="area" :options="memoryoptions" :series="memory"></apexchart>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white"
              >ATH: {{ memorycount }} TB
            </span>
          </div>

          <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
    <div class="lg:col-span-6 col-span-12 md:col-span-12">
      <div class="bg-white dark:bg-gray-800 pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
        <div class="relative">
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
          <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
          <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">
            Historical Stats Disk <span class="ml-1 text-base font-medium text-gray-400">TB</span>
          </h1>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-if="showAnnotations"
            @click="hideshowAnnotation()"
          >
            Hide Release Labels
          </button>
          <button
            type="button"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            v-else
            @click="hideshowAnnotation()"
          >
            Show Release Labels
          </button>

          <div v-if="loaded" class="text-center py-5">
            <apexchart :key="updaterender" width="100%" height="350" type="area" :options="diskoptions" :series="disk"></apexchart>
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white"
              >ATH: {{ diskcount }} TB
            </span>
          </div>

          <apexchart v-if="loaded" width="100%" height="350" type="area" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {

  data() {
    return {
      showAnnotations: false,
      loaded: false,
      online: [],
      onlinecount: [],
      cores: [],
      updaterender: 0,
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
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.7.1 Released",
              },
            },
            {
              x: new Date("8 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.7.2 Released",
              },
            },
            {
              x: new Date("28 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.7.3 Released",
              },
            },
            {
              x: new Date("11 October 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.8.0 Released",
              },
            },
            {
              x: new Date("8 December 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#D7263D",
              label: {
                borderColor: "#D7263D",
                style: {
                  color: "#fff",
                  background: "#D7263D",
                },
                text: "0.9.0 Released",
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
            opacityFrom: 0.2,
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
            formatter: function (value) {
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
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.7.1 Released",
              },
            },
            {
              x: new Date("8 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.7.2 Released",
              },
            },
            {
              x: new Date("28 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.7.3 Released",
              },
            },
            {
              x: new Date("11 October 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.8.0 Released",
              },
            },
            {
              x: new Date("8 December 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#A300D6",
              label: {
                borderColor: "#A300D6",
                style: {
                  color: "#fff",
                  background: "#A300D6",
                },
                text: "0.9.0 Released",
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
            opacityFrom: 0.2,
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
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.7.0 Released",
              },
            },
            {
              x: new Date("24 June 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.7.1 Released",
              },
            },
            {
              x: new Date("8 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.7.2 Released",
              },
            },
            {
              x: new Date("28 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.7.3 Released",
              },
            },
            {
              x: new Date("11 October 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.8.0 Released",
              },
            },
            {
              x: new Date("8 December 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#4ECDC4",
              label: {
                borderColor: "#4ECDC4",
                style: {
                  color: "#fff",
                  background: "#4ECDC4",
                },
                text: "0.9.0 Released",
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
            opacityFrom: 0.2,
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
            formatter: function (value) {
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
            {
              x: new Date("8 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.2 Released",
              },
            },
            {
              x: new Date("28 July 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.7.3 Released",
              },
            },
            {
              x: new Date("11 October 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.8.0 Released",
              },
            },
            {
              x: new Date("8 December 2021").getTime(),
              strokeDashArray: 0,
              borderColor: "#3F51B5	",
              label: {
                borderColor: "#3F51B5	",
                style: {
                  color: "#fff",
                  background: "#3F51B5",
                },
                text: "0.9.0 Released",
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
            opacityFrom: 0.2,
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
            formatter: function (value) {
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
  watch: {
    "$store.state.appConfig.layout.skin": function () {
      this.updaterender += 1
    },
  },

  methods: {
    hideshowAnnotation() {
      if (this.showAnnotations) {
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
        Array.from(elem).forEach(child => {
    child.style.visibility = "hidden"
})
        this.showAnnotations = false
      } else {
        this.showAnnotations = true
        var elem = document.getElementsByClassName("apexcharts-xaxis-annotations")
          Array.from(elem).forEach(child => {
    child.style.visibility = "visible"
})
      }
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    fetchData() {
      axios.get("https://api.stats.golem.network/v1/network/historical/stats").then((response) => {
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
