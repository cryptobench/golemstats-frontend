<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="GlobeIcon"
            :statistic="online"
            statistic-title="Nodes online"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="CpuIcon"
            :statistic="threads"
            statistic-title="Cores"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="LayersIcon"
            :statistic="memory"
            statistic-title="Memory"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="HardDriveIcon"
            :statistic="disk"
            statistic-title="Disk"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="computing_loaded"
            icon="ActivityIcon"
            :statistic="computing"
            statistic-title="Providers computing right now"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="averageearnings_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="averageearnings"
            statistic-title="Average earnings per task"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="earnings6h_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="earnings6h"
            statistic-title="Total Network Earnings (6h)"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="earnings24h_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="earnings24h"
            statistic-title="Total Network Earnings (24h)"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
      </b-row>
      <h3>Pricing Median</h3>
      <b-row>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="median_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="median_cpu_hour"
            statistic-title="Median CPU/h pricing"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="median_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="median_per_hour"
            statistic-title="Median Per/h pricing"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="median_loaded"
            icon="DollarSignIcon"
            color="success"
            :statistic="median_start_price"
            statistic-title="Median start pricing"
            style="max-width: 350px"
          />
          <div class="text-center cardish" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
      </b-row>
      <networkutilization> </networkutilization>
      <h3>Average stats per node</h3>
      <b-row>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="CpuIcon"
            :statistic="avgcores"
            statistic-title="Cores"
            style="max-width: 350px"
          />
          <div class="text-center" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="LayersIcon"
            :statistic="avgmemory"
            statistic-title="Memory"
            style="max-width: 350px"
          />
          <div class="text-center" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            v-if="stats_loaded"
            icon="HardDriveIcon"
            :statistic="avgdisk"
            statistic-title="Disk"
            style="max-width: 350px"
          />
          <div class="text-center" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_cpu_hour"
            statistic-title="Average CPU/h pricing"
            style="max-width: 350px"
          />
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_per_hour"
            statistic-title="Average Per/h pricing"
            style="max-width: 350px"
          />
        </b-col>
        <b-col xs="12" sm="12" lg="3" md="4">
          <statistic-card-horizontal
            icon="DollarSignIcon"
            color="success"
            :statistic="avg_start_price"
            statistic-title="Average start pricing"
            style="max-width: 350px"
          />
        </b-col>
      </b-row>
      <h3>Online nodes</h3>
      <b-row>
        <b-col lg="12" xl="12" md="12" sm="12" xs="12">
          <b-card no-body class="mb-0">
            <b-col lg="6" class="mb-2 mt-2">
              <b-col lg="6">
                <h5>Search for node</h5>
                <b-form-input
                  v-model="filter"
                  placeholder="Node Name or wallet address"
                ></b-form-input>
              </b-col>
              <b-col lg="4" class="mb-2 mt-2">
                <h5>Showing first {{ this.rowcount }} nodes</h5>
                <b-form-input
                  v-model="rowcount"
                  placeholder="30"
                ></b-form-input>
              </b-col>
            </b-col>
            <b-table
              v-if="table_data"
              responsive
              hover
              outlined
              small
              :filter="filter"
              :filter-ignored-fields="ignoredfilter"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :fields="fields"
              :items="items"
              :per-page="rowcount"
              @row-clicked="expandAdditionalInfo"
              show-empty
              empty-text="No online nodes found"
            >
              <!-- A virtual column -->
              <template #cell(Name)="data">
                {{ data.value }}
                <b-badge v-if="data['item'].Online" pill variant="success"
                  >Online</b-badge
                >
                <b-badge v-else pill variant="danger">Offline</b-badge>
              </template>

              <!-- A custom formatted column -->
              <template #cell(Subnet)="data">
                {{ data.value }}
                <b-badge v-if="data['item'].Mainnet" pill variant="primary"
                  >Mainnet</b-badge
                >
                <b-badge v-else pill variant="warning">Testnet</b-badge>
              </template>

              <!-- A custom formatted column -->
              <template #cell(Cores)="data">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="CpuIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>

              <template #cell(Memory)="data">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="LayersIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>

              <!-- A virtual composite column -->
              <template #cell(Disk)="data">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="HardDriveIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>
              <template #cell(cpu_hour)="data">
                <b-avatar variant="light-success" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>
              <template #cell(per_hour)="data">
                <b-avatar variant="light-success" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>
              <template #cell(start_price)="data">
                <b-avatar variant="light-success" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </template>
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
  BSpinner,
  BBadge,
  BAvatar,
} from 'bootstrap-vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
import axios from '@axios'
import networkutilization from '@core/components/network/networkutilization.vue'
import statisticscardearnings from '@core/components/provider/statisticscardearnings.vue'

export default {
  metaInfo: {
    title: 'Golemstats - A stats page for the Golem Network',
    meta: [
      {
        name: 'description',
        content:
          'Golemstats is a network explorer for the Golem network. It features detailed stats about the nodes, the nework and financial data.',
      },
    ],
  },
  components: {
    BCol,
    BCard,
    BFormInput,
    BContainer,
    BBadge,
    BRow,
    BSpinner,
    BAvatar,
    BTable,
    StatisticCardHorizontal,
    StatisticCardWithLineChart,
    networkutilization,
    statisticscardearnings,
  },
  data() {
    return {
      ignoredfilter: [
        'Cores',
        'Memory',
        'Disk',
        'cpu_hour',
        'per_hour',
        'start_price',
      ],
      filter: '',
      mainnet: '',
      table_data: false,
      rowcount: '30',
      averageearnings_loaded: false,
      sortBy: 'Name',
      sortDesc: false,
      median_loaded: false,
      stats_loaded: false,
      computing_loaded: false,
      earnings6h_loaded: false,
      earnings24h_loaded: false,
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
      median_cpu_hour: '',
      avg_start_price: '',
      median_start_price: '',
      avg_per_hour: '',
      median_per_hour: '',
      averageearnings: '',
      earnings6h: '',
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
        { key: 'Memory', label: 'Memory (GB)', sortable: true },
        { key: 'Disk', label: 'Disk (GB)', sortable: true },
        { key: 'cpu_hour', label: 'CPU/h price', sortable: true },
        { key: 'per_hour', label: 'Per/h price', sortable: true },
        { key: 'start_price', label: 'Start Price', sortable: true },
      ],
    }
  },
  created() {
    this.computingnow()
    this.generalstats()
    this.earningspertask()
    this.earnings1()
    this.earnings24()
    this.fetchData()
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
    expandAdditionalInfo(row) {
      this.$router.push({ name: 'node', params: { id: row.id } })
    },
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
          if (
            obj.data['golem.com.payment.platform.erc20-mainnet-glm.address']
          ) {
            var mainnet = true
            var wallet =
              obj.data['golem.com.payment.platform.erc20-mainnet-glm.address']
            //  block of code to be executed if the condition is true
          } else {
            var mainnet = false
            var wallet =
              obj.data['golem.com.payment.platform.erc20-rinkeby-tglm.address']
            //  block of code to be executed if the condition is false
          }
          this.items.push({
            Online: obj.online,
            Mainnet: mainnet,
            Name: obj.data['golem.node.id.name'],
            id: obj.data['id'],
            Subnet: obj.data['golem.node.debug.subnet'],
            Cores: obj.data['golem.inf.cpu.threads'],
            Wallet: wallet,
            start_price:
              floorFigure(
                obj.data['golem.com.pricing.model.linear.coeffs'][2],
                3
              ) + ' GLM',
            per_hour:
              floorFigure(
                obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600,
                3
              ) + ' GLM',
            cpu_hour:
              floorFigure(
                obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600,
                3
              ) + ' GLM',
            Memory: floorFigure(obj.data['golem.inf.mem.gib']),
            Disk: floorFigure(obj.data['golem.inf.storage.gib']),
          })
          avg_cpu_hour.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600
          )
          avg_start_price.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][2]
          )
          avg_per_hour.push(
            obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600
          )
        })
        const median = (arr) => {
          const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b)
          return arr.length % 2 !== 0
            ? nums[mid]
            : (nums[mid - 1] + nums[mid]) / 2
        }

        this.median_cpu_hour = floorFigure(median(avg_cpu_hour), 3) + ' GLM'
        this.median_start_price =
          floorFigure(median(avg_start_price), 3) + ' GLM'
        this.median_per_hour = floorFigure(median(avg_per_hour), 3) + ' GLM'
        this.median_loaded = true

        let average = (array) => array.reduce((a, b) => a + b) / array.length
        this.avg_cpu_hour = floorFigure(average(avg_cpu_hour), 5) + ' GLM'
        this.avg_start_price = floorFigure(average(avg_start_price), 5) + ' GLM'
        this.avg_per_hour = floorFigure(average(avg_per_hour), 5) + ' GLM'
      })
      this.table_data = true
    },

    earnings1() {
      axios.get('/v1/network/earnings/6').then((response) => {
        let apiResponse = response.data
        this.earnings6h = apiResponse.total_earnings + ' GLM'
        this.earnings6h_loaded = true
      })
    },
    earnings24() {
      axios.get('/v1/network/earnings/24').then((response) => {
        let apiResponse = response.data
        this.earnings24h = apiResponse.total_earnings + ' GLM'
        this.earnings24h_loaded = true
      })
    },
    computingnow() {
      axios.get('/v1/provider/computing').then((response) => {
        let apiResponse = response.data
        this.computing = apiResponse.computing_now
        this.computing_loaded = true
      })
    },
    earningspertask() {
      axios.get('/v1/provider/average/earnings').then((response) => {
        let apiResponse = response.data
        this.averageearnings = apiResponse.average_earnings + ' GLM'
        this.averageearnings_loaded = true
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
      this.stats_loaded = true
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/base/colors.scss';

html {
  max-width: 100vw;
  overflow-x: hidden !important;
}

.primary {
  color: $primary;
}

.bold {
  font-weight: 600;
}

.cardish {
  background-color: white;
  border-radius: 0.428rem;
  background-clip: border-box;
  box-shadow: 0 4px 24px 0 rgb(34 41 47 / 10%);
  border: none;
  padding: 1.5rem;
}

.dark-layout {
  .b-avatar.badge-light-primary {
    color: white !important;
    background-color: rgb(154 155 181 / 12%);
  }
  a,
  h2 {
    color: white !important;
  }
  .btn-outline-primary {
    color: white !important;
    border: 1px solid white !important;
  }
}

[dir] .table.table-sm th,
[dir] .table.table-sm td {
  padding: 1.3rem 0.5rem;
}
</style>

