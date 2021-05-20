<template>
  <div v-if="loaded">
    <b-row>
      <b-col>
        <b-card>
          <h3>Operator Node Status</h3>
          <b-badge class="mr-1" pill variant="success">
            {{ this.onlinecount }} Online Nodes</b-badge
          >
          <b-badge pill variant="danger"
            >{{ this.offlinecount }} Offline Nodes</b-badge
          >
          <div class="mt-2 mb-1">
            <h4>Mainnet wallet</h4>
            <b-button v-on:click="zkscan" target="_blank" variant="primary">
              ZKscan
            </b-button>
            <b-button v-on:click="etherscan" variant="primary" class="ml-1">
              Etherscan
            </b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col xs="12" sm="12" lg="3" md="4">
        <statistic-card-horizontal
          v-if="loaded"
          icon="CpuIcon"
          :statistic="totalcores"
          statistic-title="Total Cores"
          style="max-width: 400px"
        />
        <div class="text-center cardish" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-col>
      <b-col xs="12" sm="12" lg="3" md="4">
        <statistic-card-horizontal
          v-if="loaded"
          icon="LayersIcon"
          :statistic="totalmemory"
          statistic-title="Total Memory"
          style="max-width: 400px"
        />
        <div class="text-center cardish" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-col>
      <b-col xs="12" sm="12" lg="3" md="4">
        <statistic-card-horizontal
          v-if="loaded"
          icon="HardDriveIcon"
          :statistic="totaldisk"
          statistic-title="Total Disk"
          style="max-width: 400px"
        />
      </b-col>
      <b-col xs="12" sm="12" lg="3" md="4">
        <statistic-card-horizontal
          v-if="usdloaded"
          icon="DollarSignIcon"
          color="success"
          :statistic="totalearnings"
          statistic-title="Total Earnings (14d)"
          style="max-width: 400px"
        />
        <div class="text-center cardish" v-else>
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="pb-5" lg="12" xl="12" md="12" sm="12" xs="12">
        <b-card no-body class="mb-0">
          <b-col lg="6" class="mb-2 mt-2">
            <h5>Search for node</h5>
            <b-form-input
              v-model="filter"
              placeholder="Node Name"
            ></b-form-input>
          </b-col>
          <b-table
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :fields="fields"
            :filter="filter"
            :filter-ignored-fields="ignoredfilter"
            :items="items"
            hover
            @row-clicked="expandAdditionalInfo"
            responsive="sm"
          >
            <!-- A virtual column -->
            <template #cell(Name)="data">
              {{ data.value }}
              <b-badge v-if="data['item'].Online" pill variant="success"
                >Online</b-badge
              >
              <b-badge v-else-if="data['item'].Old" pill variant="danger"
                >OLD</b-badge
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
            <template #cell(Earnings)="data">
              <b-avatar variant="light-success" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(cpu_hour)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(per_hour)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(start_price)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>

    <b-row v-if="oldloaded">
      <b-col lg="12" xl="12" md="12" sm="12" xs="12">
        <b-card no-body class="mb-0">
          <b-col lg="6" class="mb-2 mt-2">
            <h5>Nodes offline for 7 or more days</h5>
          </b-col>
          <b-table
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :fields="fields"
            :filter="filter"
            :filter-ignored-fields="ignoredfilter"
            :items="oldlist"
            hover
            @row-clicked="expandAdditionalInfo"
            responsive="sm"
          >
            <!-- A virtual column -->
            <template #cell(Name)="data">
              {{ data.value }}
              <b-badge pill variant="danger">Old node</b-badge>
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
            <template #cell(Earnings)="data">
              <b-avatar variant="light-success" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(cpu_hour)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(per_hour)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <template #cell(start_price)="data">
              <b-avatar variant="light-info" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard,
  BCardText,
  BFormGroup,
  BFormInput,
  BButton,
  BAvatar,
  BCol,
  BRow,
  BTable,
  BBadge,
  BSpinner,
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'
import statisticscardearnings from '@core/components/provider/statisticscardearnings.vue'
import computing from '@core/components/provider/computing.vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

export default {
  metaInfo: {
    title: 'Golemstats - A stats page for the Golem Network',
    meta: [
      {
        name: 'description',
        content:
          'Filter node operators by wallet address to view in-depth details for operators.',
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
    BTable,
    statisticscardearnings,
    computing,
    StatisticCardHorizontal,
  },
  data() {
    return {
      loaded: false,
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
        { key: 'Earnings', label: 'Total earnings', sortable: true },
        { key: 'cpu_hour', label: 'CPU/h price', sortable: true },
        { key: 'per_hour', label: 'Per/h price', sortable: true },
        { key: 'start_price', label: 'Start Price', sortable: true },
      ],
      items: [],
      oldlist: [],
      ignoredfilter: [
        'Cores',
        'Memory',
        'Disk',
        'Earnings',
        'cpu_hour',
        'per_hour',
        'start_price',
        'Subnet',
      ],
      filter: '',
      sortBy: 'Online',
      sortDesc: true,
      usdprice: '',
      oldloaded: false,
      usdloaded: false,
      onlinecount: '',
      offlinecount: '',
      totalcores: '',
      totalmemory: '',
      totaldisk: '',
      totalearnings: '',
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
    this.geckoapi()
    this.activity()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.activity()
      this.geckoapi()
    }, 60000)
  },
  watch: {
    '$store.state.appConfig.layout.currency': function () {
      this.makeToast(
        'success',
        'Changing layout to ' +
          this.$store.state.appConfig.layout.currency +
          ' prices',
        'This will happen on next pull (within 60s)'
      )
    },
  },
  methods: {
    zkscan() {
      window.open(
        'https://zkscan.io/explorer/accounts/' + this.$route.params.id,
        '_blank'
      )
    },
    etherscan() {
      window.open(
        'https://etherscan.io/address/' + this.$route.params.id,
        '_blank'
      )
    },
    expandAdditionalInfo(row) {
      this.$router.push({ name: 'node', params: { id: row.id } })
    },
    makeToast(variant = null, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      })
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    earnings(provider, hours) {
      axios
        .get('/v1/provider/node/' + provider + '/earnings' + '/' + hours)
        .then((response) => {
          let apiResponse = response.data
          if (localStorage.getItem('currency') == 'glm') {
            let income = this.floorFigure(apiResponse.earnings, 3) + ' GLM'
            console.log('INCOME', income)
            return income
          } else {
            let income =
              this.floorFigure(apiResponse.earnings * this.usdprice, 3) + ' USD'
            console.log('INCOME', income)
            return income
          }
        })
    },
    geckoapi: function () {
      axios
        .get(
          'https://api.coingecko.com/api/v3/simple/price?ids=golem&vs_currencies=usd'
        )
        .then((response) => {
          this.usdprice = response.data.golem.usd
          if (localStorage.getItem('currency') == 'glm') {
            this.totalearnings =
              this.floorFigure(this.totalearnings, 2) + ' GLM'
          } else {
            this.totalearnings =
              this.floorFigure(this.totalearnings * this.usdprice, 2) + ' USD'
          }
          this.usdloaded = true
        })
    },
    daydifference: function (d1, d2) {
      var diff = Math.abs(d1.getTime() - d2.getTime())
      return diff / (1000 * 60 * 60 * 24)
    },
    activity() {
      this.items.length = 0
      axios
        .get('/v1/provider/wallet/' + this.$route.params.id)
        .then((response) => {
          let apiResponse = response.data
          let onlinecounter = 0
          let offlinecounter = 0
          let totalcores = 0
          let totalmemory = 0
          let totaldisk = 0
          let totalearnings = 0
          apiResponse.forEach((obj) => {
            if (obj.online) {
              onlinecounter++
            } else {
              offlinecounter++
            }
            if (obj.online) {
              totalcores += obj.data['golem.inf.cpu.threads']
              totalmemory += obj.data['golem.inf.mem.gib']
              totaldisk += obj.data['golem.inf.storage.gib']
            }

            totalearnings += obj.earnings_total
            // this.earnings(obj.data['id'], 24).then((items) => {
            //   // You might use this at some stage: const { sortBy, descending, page, rowsPerPage } = this.pagination
            //   console.log(items)
            // })
            // this.earnings(obj.data['id'], 24)
            var seen = new Date(obj.updated_at)
            var currenttime = new Date(Date.now())
            if (this.daydifference(currenttime, seen) > 7) {
              var old = true
            } else {
              var old = false
            }

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
                obj.data[
                  'golem.com.payment.platform.erc20-rinkeby-tglm.address'
                ]
              //  block of code to be executed if the condition is false
            }

            if (localStorage.getItem('currency') == 'glm') {
              var earnings = this.floorFigure(obj.earnings_total, 2) + ' GLM'
            } else {
              var earnings =
                this.floorFigure(obj.earnings_total * this.usdprice, 2) + ' USD'
            }

            if (!old) {
              this.items.push({
                Mainnet: mainnet,
                Online: obj.online,
                Earnings: earnings,
                Name: obj.data['golem.node.id.name'],
                id: obj.data['id'],
                Subnet: obj.data['golem.node.debug.subnet'],
                Cores: obj.data['golem.inf.cpu.threads'],
                Wallet: wallet,
                start_price:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][2],
                    3
                  ) + ' GLM',
                per_hour:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600,
                    3
                  ) + ' GLM',
                cpu_hour:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600,
                    3
                  ) + ' GLM',
                Memory: this.floorFigure(obj.data['golem.inf.mem.gib']),
                Disk: this.floorFigure(obj.data['golem.inf.storage.gib']),
              })
            } else {
              this.oldlist.push({
                Mainnet: mainnet,
                Online: obj.online,
                Earnings: earnings,
                Name: obj.data['golem.node.id.name'],
                id: obj.data['id'],
                Subnet: obj.data['golem.node.debug.subnet'],
                Cores: obj.data['golem.inf.cpu.threads'],
                Wallet: wallet,
                start_price:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][2],
                    3
                  ) + ' GLM',
                per_hour:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][0] * 3600,
                    3
                  ) + ' GLM',
                cpu_hour:
                  this.floorFigure(
                    obj.data['golem.com.pricing.model.linear.coeffs'][1] * 3600,
                    3
                  ) + ' GLM',
                Memory: this.floorFigure(obj.data['golem.inf.mem.gib']),
                Disk: this.floorFigure(obj.data['golem.inf.storage.gib']),
              })
              this.oldloaded = true
            }
          })
          this.loaded = true
          this.onlinecount = onlinecounter
          this.offlinecount = offlinecounter
          this.totalcores = totalcores
          this.totalmemory = this.floorFigure(totalmemory) + ' GB'
          this.totaldisk = this.floorFigure(totaldisk) + ' GB'
          this.totalearnings = this.floorFigure(totalearnings)
          //let success = data.map(({ values }) => values)
        })
    },
  },
}
</script>

<style >
html {
  max-width: 100vw;
  overflow-x: hidden !important;
}
[dir] .table th,
[dir] .table td {
  padding: 1rem !important;
}
</style>
