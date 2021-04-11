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
            :statistic="threads"
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
      <h3>Network Utilization (6h)</h3>
      <b-row>
        <b-col lg="12" md="12">
          <b-card>
            <apexchart
              v-if="loaded"
              width="100%"
              height="250"
              type="area"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </b-card>
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
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_cpu_hour"
            statistic-title="Average CPU/h pricing"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_per_hour"
            statistic-title="Average Per/h pricing"
            style="max-width: 300px"
          />
        </b-col>
        <b-col xs="6" sm="6" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_start_price"
            statistic-title="Average start pricing"
            style="max-width: 300px"
          />
        </b-col>
      </b-row>
      <h3>Online nodes</h3>
      <b-row>
        <b-col>
          <b-card no-body class="mb-0">
            <b-col lg="6" class="mb-2 mt-2">
              <h5>Search for node</h5>
              <b-form-input
                v-model="filter"
                placeholder="Node Name"
              ></b-form-input>
            </b-col>
            <b-table
              outlined
              hover
              :fields="fields"
              :items="items"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :filter="filter"
              :filter-ignored-fields="ignoredfilter"
              :per-page="rowcount"
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
import {
  BCol,
  BContainer,
  BRow,
  BTable,
  BCard,
  BFormInput,
} from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
import axios from '@axios'

export default {
  components: {
    BCol,
    BCard,
    BFormInput,
    BContainer,
    BRow,
    BTable,
    StatisticCardHorizontal,
    StatisticCardWithLineChart,
  },
  data() {
    return {
      ignoredfilter: ['Cores', 'Memory (GB)', 'Disk (GB)'],
      filter: '',
      rowcount: '',
      sortBy: 'Name',
      sortDesc: false,
      loaded: false,
      items: [],
      computing: '',
      online: '',
      cores: '',
      threads: '',
      memory: '',
      disk: '',
      avgcores: '',
      avgmemory: '',
      avgthreads: '',
      avgdisk: '',
      avg_cpu_hour: '',
      avg_start_price: '',
      avg_per_hour: '',
      averagearnings: '',
      earnings1h: '',
      earnings24h: '',
      fields: [
        /* 
          Optionally define a class per header, 
          this will overlay whatever thead-class background you choose 
        */
        {
          key: 'Name',
          label: 'Provider Name',
          tdClass: 'primary bold',
          sortable: true,
        },
        { key: 'Subnet', label: 'Subnet', sortable: true },
        { key: 'Cores', label: 'Cores', sortable: true },
        { key: 'Memory (GB)', label: 'Memory (GB)', sortable: true },
        { key: 'Disk (GB)', label: 'Disk (GB)', sortable: true },
        { key: 'cpu_hour', label: 'CPU/h price', sortable: true },
        { key: 'per_hour', label: 'Per/h price', sortable: true },
        { key: 'start_price', label: 'Start Price', sortable: true },
        //{ key: 'Pricing', label: 'Pricing', sortable: true },
      ],
      options: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              year: 'yyyy',
              month: "MMM 'yy",
              day: 'dd MMM',
              hour: 'HH:mm',
            },
          },
        },
      },
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
            text: 'Providers computing',
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
              color: undefined,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          },
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
    this.utilization()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.computingnow()
      this.generalstats()
      this.earningspertask()
      this.earnings1()
      this.earnings24()
      this.fetchData()
      this.utilization()
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
        let avg_cpu_hour = []
        let avg_start_price = []
        let avg_per_hour = []
        apiResponse.forEach((obj) => {
          this.items.push({
            Name: obj.data['golem.node.id.name'],
            Subnet: obj.data['golem.node.debug.subnet'],
            Cores: obj.data['golem.inf.cpu.threads'],
            start_price: floorFigure(
              obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600,
              3
            ),
            per_hour: floorFigure(
              obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600,
              3
            ),
            cpu_hour: floorFigure(
              obj.data['golem.com.pricing.model.linear.coeffs'][2],
              3
            ),
            'Memory (GB)': floorFigure(obj.data['golem.inf.mem.gib']),
            'Disk (GB)': floorFigure(obj.data['golem.inf.storage.gib']),
          })
          avg_cpu_hour.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][2]
          )
          avg_start_price.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600
          )
          avg_per_hour.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600
          )
        })
        let average = (array) => array.reduce((a, b) => a + b) / array.length
        this.avg_cpu_hour = floorFigure(average(avg_cpu_hour), 5) + ' GLM'
        this.avg_start_price = floorFigure(average(avg_start_price), 5) + ' GLM'
        this.avg_per_hour = floorFigure(average(avg_per_hour), 5) + ' GLM'
      })
    },
    utilization() {
      let now = Math.floor(new Date().getTime() / 1000)
      let then = now - 21600
      axios.get('/v1/network/' + then + '/' + now).then((response) => {
        let apiResponse = response.data
        let data = apiResponse.data.result[0].values
        function convertDate(inputFormat) {
          function pad(s) {
            return s < 10 ? '0' + s : s
          }
          var d = new Date(inputFormat)
          return [
            pad(d.getDate()),
            pad(d.getMonth() + 1),
            d.getFullYear(),
          ].join('/')
        }
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
        this.loaded = true
        //let success = data.map(({ values }) => values)
      })
    },

    earnings1() {
      axios.get('/v1/network/earnings/1').then((response) => {
        let apiResponse = response.data
        this.earnings1h = apiResponse.total_earnings + ' GLM'
      })
    },
    earnings24() {
      axios.get('/v1/network/earnings/24').then((response) => {
        let apiResponse = response.data
        this.earnings24h = apiResponse.total_earnings + ' GLM'
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
        this.averagearnings = apiResponse.average_earnings + ' GLM'
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
        this.threads = apiResponse.threads
        this.memory = floorFigure(apiResponse.memory)
        this.disk = floorFigure(apiResponse.disk)
        this.avgcores = floorFigure(apiResponse.threads / apiResponse.online)
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

