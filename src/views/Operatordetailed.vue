<template>
  <div v-if="loaded">
    <b-row>
      <b-col lg="12" xl="12" md="12" sm="12" xs="12">
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
            :items="items"
            responsive="sm"
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
    BTable,
    statisticscardearnings,
    computing,
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
        { key: 'cpu_hour', label: 'CPU/h price', sortable: true },
        { key: 'per_hour', label: 'Per/h price', sortable: true },
        { key: 'start_price', label: 'Start Price', sortable: true },
      ],
      items: [],
      ignoredfilter: [
        'Cores',
        'Memory (GB)',
        'Disk (GB)',
        'cpu_hour',
        'per_hour',
        'start_price',
      ],
      filter: '',
      sortBy: 'Online',
      sortDesc: true,
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
    this.activity()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.activity()
    }, 60000)
  },
  methods: {
    activity() {
      this.items.length = 0
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios.get('/v1/wallet/' + this.$route.params.id).then((response) => {
        let apiResponse = response.data

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
            Mainnet: mainnet,
            Online: obj.online,
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
        })
        this.loaded = true
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
  padding: 1rem 1.5rem !important;
}
</style>
