<template>
  <div>
    <b-card class="h-100">
      <h3>Network CPU Vendor Distribution</h3>
      <span class="card-text text-muted h5"
        >AMD: <b class="mr-1">{{ data[1] }}</b> Intel:
        <b class="mr-1">{{ data[0] }}</b> Other: <b>{{ data[2] }}</b></span
      >
      <apexchart
        v-if="loaded"
        width="100%"
        height="250"
        type="donut"
        :options="chartOptions"
        :series="data"
      ></apexchart>
      <div class="text-center" v-else>
        <b-spinner variant="primary" label="Text Centered" />
      </div>
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
  created() {
    this.loaded = true
  },

  data() {
    return {
      loaded: false,

      chartOptions: {
        chart: {
          id: 'Vendor-donut',
          type: 'donut',
          zoom: {
            autoScaleYaxis: true,
          },
        },

        labels: ['Intel', 'AMD', 'Other'],
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
        colors: ['#0000F9', '#d2090a', '#8b07cd'],
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
