<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="GlobeIcon"
            :statistic="online"
            statistic-title="Nodes online"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="CpuIcon"
            :statistic="cores"
            statistic-title="Cores"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="LayersIcon"
            :statistic="memory"
            statistic-title="Memory (GB)"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="HardDriveIcon"
            :statistic="disk"
            statistic-title="Disk (GB)"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="ActivityIcon"
            :statistic="computing"
            statistic-title="Providers computing right now"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="averagearnings"
            statistic-title="Average earnings per task"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="earnings1h"
            statistic-title="Total Network Earnings (1h)"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="earnings24h"
            statistic-title="Total Network Earnings (24h)"
            style="max-width: 300px"
          />
        </b-col>
      </b-row>

      <h3>Average stats per node</h3>
      <b-row>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="CpuIcon"
            :statistic="avgcores"
            statistic-title="Cores"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="CpuIcon"
            :statistic="avgthreads"
            statistic-title="Threads"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="LayersIcon"
            :statistic="avgmemory"
            statistic-title="Memory (GB)"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="HardDriveIcon"
            :statistic="avgdisk"
            statistic-title="Disk (GB)"
            style="max-width: 300px"
          />
        </b-col>
      </b-row>
      <h3>Online nodes</h3>
      <b-row>
        <b-col>
          <b-card no-body class="mb-0">
            <b-table
              outlined
              hover
              :fields="fields"
              :items="items"
              show-empty
              empty-text="No online nodes found"
            >
            </b-table>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { BCol, BContainer, BRow, BTable, BCard } from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
import axios from '@axios'

export default {
  components: {
    BCol,
    BCard,
    BContainer,
    BRow,
    BTable,
    StatisticCardHorizontal,
    StatisticCardWithLineChart,
  },
  data() {
    return {
      items: [],
      computing: '',
      online: '',
      cores: '',
      memory: '',
      disk: '',
      avgcores: '',
      avgmemory: '',
      avgthreads: '',
      avgdisk: '',
      averagearnings: '',
      earnings1h: '',
      earnings24h: '',
      fields: [
        /* 
          Optionally define a class per header, 
          this will overlay whatever thead-class background you choose 
        */
        { key: 'Name', label: 'Provider Name', tdClass: 'primary bold' },
        { key: 'Subnet', label: 'Subnet' },
        { key: 'Cores', label: 'Cores' },
        { key: 'Threads', label: 'Threads' },
        { key: 'Memory (GB)', label: 'Memory (GB)' },
        { key: 'Disk (GB)', label: 'Disk (GB)' },
      ],
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: 'Providers Computing a task',
          data: [280, 185, 263, 108, 190, 2, 134, 218, 248, 265, 57, 146],
        },
      ],
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true,
          },
          title: {
            text: 'Network Utilization',
          },
          toolbar: {
            autoSelected: 'zoom',
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ['#262ed1'],
        markers: {
          size: 0,
        },
      },
    }
  },
  created() {
    this.computingnow()
    this.generalstats()
    this.earningspertask()
    this.earnings1()
    this.earnings24()
    this.fetchData()
    //this.utilization()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.computingnow()
      this.generalstats()
      this.earningspertask()
      this.earnings1()
      this.earnings24()
      this.fetchData()
    }, 15000)
  },
  watch: {
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      axios.get('/v1/network/online').then((response) => {
        let apiResponse = response.data
        function floorFigure(figure, decimals) {
          if (!decimals) decimals = 2
          var d = Math.pow(10, decimals)
          return (parseInt(figure * d) / d).toFixed(decimals)
        }
        this.items.length = 0
        apiResponse.forEach((obj) => {
          this.items.push({
            Name: obj.data['golem.node.id.name'],
            Subnet: obj.data['golem.node.debug.subnet'],
            Cores: obj.data['golem.inf.cpu.cores'],
            Threads: obj.data['golem.inf.cpu.threads'],
            'Memory (GB)': floorFigure(obj.data['golem.inf.mem.gib']),
            'Disk (GB)': floorFigure(obj.data['golem.inf.storage.gib']),
          })
        })
      })
    },
    utilization() {
      axios.get('/v1/network/1616596380/1616617980').then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0]
        let success = data.map(({ values }) => values)
        console.log(success)
      })
    },

    earnings1() {
      axios.get('/v1/network/earnings/1').then((response) => {
        let apiResponse = response.data
        this.earnings1h = apiResponse.total_earnings
      })
    },
    earnings24() {
      axios.get('/v1/network/earnings/24').then((response) => {
        let apiResponse = response.data
        this.earnings24h = apiResponse.total_earnings
      })
    },
    computingnow() {
      axios.get('/v1/provider/computing').then((response) => {
        let apiResponse = response.data
        this.computing = apiResponse.computing_now
      })
    },
    earningspertask() {
      axios.get('/v1/provider/average/earnings').then((response) => {
        let apiResponse = response.data
        this.averagearnings = apiResponse.average_earnings
      })
    },
    generalstats() {
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios.get('/v1/network/online/stats').then((response) => {
        let apiResponse = response.data
        this.online = apiResponse.online
        this.cores = apiResponse.cores
        this.memory = floorFigure(apiResponse.memory)
        this.disk = floorFigure(apiResponse.disk)
        this.avgcores = floorFigure(apiResponse.cores / apiResponse.online)
        this.avgthreads = floorFigure(apiResponse.threads / apiResponse.online)
        this.avgmemory = floorFigure(apiResponse.memory / apiResponse.online)
        this.avgdisk = floorFigure(apiResponse.disk / apiResponse.online)
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/base/colors.scss';

.primary {
  color: $primary;
}

.bold {
  font-weight: 600;
}
</style>

