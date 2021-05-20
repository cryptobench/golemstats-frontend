<template>
  <div>
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12" xs="12">
        <networkpercentagecomputing> </networkpercentagecomputing>
      </b-col>
      <b-col xs="12" sm="12" lg="6" md="12">
        <h3>Network CPU Vendor Distribution</h3>
        <vendorpie v-if="table_data" :data="vendorlist"></vendorpie>
      </b-col>
      <b-col xs="12" sm="12" lg="6" md="12">
        <h3>Network CPU Architecture</h3>
        <architecturepie
          v-if="table_data"
          :data="architecturelist"
        ></architecturepie>
      </b-col>
      <b-col xl="6" lg="6" md="12" sm="12" xs="12">
        <networkversions> </networkversions>
      </b-col>
    </b-row>
    <networkutilization> </networkutilization>
  </div>
</template>

<script>
import networkutilization from '@core/components/network/networkutilization.vue'
import networkpercentagecomputing from '@core/components/network/networkpercentagecomputing.vue'
import networkversions from '@core/components/network/networkversions.vue'
import Vendorpie from '@core/components/network/vendorpie.vue'
import architecturepie from '@core/components/network/architecturepie.vue'
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
  metaInfo: {
    title: 'Golemstats - A stats page for the Golem Network',
    meta: [
      {
        name: 'description',
        content: 'View live Golem Network stats',
      },
    ],
  },
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
    Vendorpie,
    architecturepie,
  },
  data() {
    return {
      loaded: false,
      table_data: false,
      failure: false,
      loaded_graph: false,
      intelcount: 0,
      amdcount: 0,
      thirdtypecpu: 0,
      x86_64: 0,
      Aarch64: 0,
      vendorlist: [],
      architecturelist: [],
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
    this.fetchData()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.fetchData()
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
        this.loaded_graph = true
        //let success = data.map(({ values }) => values)
      })
    },
    fetchData() {
      this.intelcount = 0
      this.amdcount = 0
      this.thirdtypecpu = 0
      this.vendorlist.length = 0
      this.Aarch64 = 0
      this.x86_64 = 0
      this.architecturelist.length = 0
      axios.get('/v1/network/online').then((response) => {
        let apiResponse = response.data
        apiResponse.forEach((obj) => {
          if (obj.data['golem.inf.cpu.vendor']) {
            if (obj.data['golem.inf.cpu.vendor'] == 'GenuineIntel') {
              this.intelcount++
            } else if (obj.data['golem.inf.cpu.vendor'] == 'AuthenticAMD') {
              this.amdcount++
            } else {
              this.thirdtypecpu++
            }
          }

          if (obj.data['golem.inf.cpu.architecture']) {
            if (obj.data['golem.inf.cpu.architecture'] == 'x86_64') {
              this.x86_64++
            } else if (obj.data['golem.inf.cpu.architecture'] == 'aarch64') {
              this.Aarch64++
            }
          }
        })

        this.vendorlist.push(this.intelcount, this.amdcount, this.thirdtypecpu)
        this.architecturelist.push(this.x86_64, this.Aarch64)
      })
      this.table_data = true
    },
  },
}
</script>

<style>
</style>
