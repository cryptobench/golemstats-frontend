<template>
  <div>
    <b-card class="h-100">
      <h3>Network CPU Architecture</h3>
      <apexchart
        width="100%"
        height="250"
        type="donut"
        :options="chartOptions"
        :series="data"
      ></apexchart>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCol, BRow, BSpinner } from 'bootstrap-vue'
export default {
  components: {
    BCard,
    BRow,
    BCol,
    BSpinner,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,

      chartOptions: {
        chart: {
          id: 'vendor-donut',
          type: 'donut',
          zoom: {
            autoScaleYaxis: true,
          },
        },

        labels: ['x86_64', 'Aarch64'],
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: 'HH:mm:ss',
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: true,
        },
        colors: ['#7cdb0f', '#0000F9'],
        markers: {
          size: 0,
        },

        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 90, 100],
          },
        },
      },
    }
  },
}
</script>
