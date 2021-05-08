<template>
  <div>
    <statsovertime></statsovertime>
    <b-row>
      <b-col xl="6" lg="6" md="12" sm="12" xs="12">
        <networkversions> </networkversions>
      </b-col>
      <b-col xl="6" lg="6" md="12" sm="12" xs="12">
        <networkpercentagecomputing> </networkpercentagecomputing>
      </b-col>
    </b-row>
    <networkutilization> </networkutilization>
  </div>
</template>

<script>
import networkutilization from '@core/components/network/networkutilization.vue'
import networkpercentagecomputing from '@core/components/network/networkpercentagecomputing.vue'
import networkversions from '@core/components/network/networkversions.vue'
import statsovertime from '@core/components/network/statsovertime.vue'
import {
  BCard,
  BCardText,
  BFormGroup,
  BFormInput,
  BButton,
  BAvatar,
  BBadge,
  BCol,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BCard,
    BCardText,
    BFormGroup,
    BFormInput,
    BButton,
    BAvatar,
    BBadge,
    BCol,
    BRow,
    BSpinner,
    networkutilization,
    networkversions,
    networkpercentagecomputing,
    statsovertime,
  },
  data() {
    return {
      loaded: false,
      failure: false,
      loaded_graph: false,
      id: '',
      scheme: '',
      memory: '',
      name: '',
      runtime_name: '',
      cores: '',
      model: '',
      cpu_vendor: '',
      threads: '',
      disk: '',
      runtime_version: '',
      pricing_model: '',
      subnet: '',
      architecture: '',
      multi_activity: '',
      interval_sec: '',
      accept_timeout: '',
      wallet: '',
      online: '',
      cpu_hour: '',
      per_hour: '',
      start_price: '',
      transfer_protocol: [],
      cpu_capabilities: [],
      usage_vector: [],
      testnet: '',
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
          width: 2,
        },
        yaxis: {
          title: {
            text: '1 = Node is computing a task',
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
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
  created() {
    this.utilization()
  },
  // mounted: function () {
  //   this.timer = setInterval(() => {
  //     this.activity()
  //   }, 15000)
  // },
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
        this.loaded_graph = true
        //let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>

<style>
</style>
