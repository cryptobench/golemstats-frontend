<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col cols="3" sm="4" md="2" lg="1">
              <b-avatar
                class="mb-1"
                variant="light-primary"
                :src="appLogoImage"
                :text="name"
                size="104px"
                rounded
              />
            </b-col>
            <b-col cols="9" sm="9" md="10" lg="6">
              <h4 class="mb-0">
                {{ name }}
                <b-badge v-if="online" variant="success">
                  <feather-icon icon="GlobeIcon" class="mr-25" />
                  <span>Online</span>
                </b-badge>
                <b-badge v-else variant="danger">
                  <feather-icon icon="GlobeIcon" class="mr-25" />
                  <span>Offline</span>
                </b-badge>
                <computing
                  v-if="online"
                  :provider="this.$route.params.id"
                ></computing>
              </h4>
              <span class="card-text"><b>Subnet:</b> {{ subnet }}</span>
              <div class="mt-1">
                <b-button v-on:click="operator" variant="primary">
                  Node by operator
                </b-button>
              </div>
              <div class="mt-1 mb-1">
                <b-button v-on:click="zkscan" variant="outline-primary">
                  ZKscan
                </b-button>
                <b-button
                  v-on:click="etherscan"
                  variant="outline-primary"
                  class="ml-1"
                >
                  Etherscan
                </b-button>
              </div>
            </b-col>

            <b-col cols="12" sm="12" md="12" lg="12">
              <div class="d-flex align-items-center mt-2">
                <b-col cols="4" sm="4" md="4" lg="2">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-primary" rounded>
                      <feather-icon icon="CpuIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ cores }}</h5>
                      <small>{{ cpu_vendor }} Cores</small>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4" sm="4" md="4" lg="2">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-primary" rounded>
                      <feather-icon icon="LayersIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ memory }}</h5>
                      <small>Memory (GB)</small>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4" sm="4" md="4" lg="2">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-primary" rounded>
                      <feather-icon icon="HardDriveIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ disk }}</h5>
                      <small>Disk (GB)</small>
                    </div>
                  </div>
                </b-col>
              </div>
            </b-col>
            <b-col cols="12" sm="12" lg="12">
              <div class="d-flex align-items-center mt-2">
                <b-col cols="4" sm="4" md="4" lg="2">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-success" rounded>
                      <feather-icon icon="DollarSignIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ cpu_hour }}</h5>
                      <small>GLM CPU/h</small>
                    </div>
                  </div>
                </b-col>
                <b-col cols="4" sm="4" md="4" lg="2">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-success" rounded>
                      <feather-icon icon="DollarSignIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ per_hour }}</h5>
                      <small>GLM per hour</small>
                    </div>
                  </div>
                </b-col>
                <b-col cols="12" sm="12" lg="4">
                  <div class="d-flex align-items-center">
                    <b-avatar variant="light-success" rounded>
                      <feather-icon icon="DollarSignIcon" size="18" />
                    </b-avatar>
                    <div class="ml-1">
                      <h5 class="mb-0">{{ start_price }}</h5>
                      <small>GLM start price</small>
                    </div>
                  </div>
                </b-col>
              </div>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" sm="12" md="6" lg="3" xl="3">
        <statisticscardearnings
          v-if="usdprice"
          icon="DollarSignIcon"
          :hours="24"
          :usdprice="this.usdprice"
          color="success"
          :provider="this.$route.params.id"
          statistic-title="Income (24h)"
          style="max-width: 380px"
        >
        </statisticscardearnings>
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="3" xl="3">
        <statisticscardearnings
          v-if="usdprice"
          icon="DollarSignIcon"
          :hours="168"
          color="success"
          :usdprice="this.usdprice"
          :provider="this.$route.params.id"
          statistic-title="Income (7d)"
          style="max-width: 380px"
        >
        </statisticscardearnings>
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="3" xl="3">
        <statisticscardearnings
          v-if="usdprice"
          icon="DollarSignIcon"
          :hours="744"
          color="success"
          :usdprice="this.usdprice"
          :provider="this.$route.params.id"
          statistic-title="Income (31d)"
          style="max-width: 380px"
        >
        </statisticscardearnings>
      </b-col>
      <b-col cols="12" sm="12" md="6" lg="3" xl="3">
        <statisticscardearnings
          v-if="usdprice"
          icon="DollarSignIcon"
          :hours="8760"
          color="success"
          :usdprice="this.usdprice"
          :provider="this.$route.params.id"
          statistic-title="Income (14d)"
          style="max-width: 380px"
        >
        </statisticscardearnings>
      </b-col>
    </b-row>
    <h3>Task Activity</h3>
    <b-row>
      <b-col lg="12" md="12">
        <b-card>
          <apexchart
            v-if="loaded_graph"
            width="100%"
            height="250"
            type="area"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          <b-col lg="12" cols="12" class="text-center mt-1" v-else-if="failure">
            <p>Error while trying to fetch data :-(</p>
          </b-col>
          <div class="text-center" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
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
  BBadge,
  BCol,
  BRow,
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
    statisticscardearnings,
    computing,
  },
  data() {
    return {
      loaded: false,
      failure: false,
      loaded_graph: false,
      id: '',
      usdprice: '',
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
          min: 0,
          max: 1,
          tickAmount: 1,
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
    this.fetchData()
    this.activity()
    this.geckoapi()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.activity()
    }, 15000)
  },
  watch: {
    '$store.state.appConfig.layout.currency': function () {
      this.makeToast(
        'success',
        'Changing layout to ' +
          this.$store.state.appConfig.layout.currency +
          ' prices',
        'This will happen on next pull (within 15s)'
      )
    },
  },
  methods: {
    makeToast(variant = null, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true,
      })
    },
    operator() {
      this.$router.push({
        name: 'operatordetailed',
        params: { id: this.wallet },
      })
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    geckoapi: function () {
      axios
        .get('https://api.coingecko.com/api/v3/coins/golem')
        .then((response) => {
          this.usdprice = response.data.market_data.current_price.usd
            .toString()
            .slice(0, 7)
        })
    },
    activity() {
      axios
        .get('/v1/provider/node/' + this.$route.params.id + '/activity')
        .then((response) => {
          let apiResponse = response.data
          try {
            var data = apiResponse.data.result[0].values
          } catch (error) {
            this.failure = true
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
          }
          let computing = []
          for (var i in data) {
            var time = data[i][0] * 1000
            computing.push([time, data[i][1]])
          }
          this.series = [
            {
              data: computing,
              name: 'Computing = 1',
            },
          ]
          this.loaded_graph = true
          //let success = data.map(({ values }) => values)
        })
    },
    zkscan() {
      if (this.testnet) {
        window.open(
          'https://rinkeby.zkscan.io/explorer/accounts/' + this.wallet,
          '_blank'
        )
      } else {
        window.open(
          'https://zkscan.io/explorer/accounts/' + this.wallet,
          '_blank'
        )
      }
    },
    etherscan() {
      if (this.testnet) {
        window.open(
          'https://rinkeby.etherscan.io/address/' + this.wallet,
          '_blank'
        )
      } else {
        window.open('https://etherscan.io/address/' + this.wallet, '_blank')
      }
    },
    fetchData() {
      axios
        .get('/v1/provider/node/' + this.$route.params.id)
        .then((response) => {
          let apiResponse = response.data
          this.id = apiResponse[0]['data']['id']
          this.online = apiResponse[0]['online']
          this.scheme = apiResponse[0]['data']['golem.com.scheme']
          this.memory = this.floorFigure(
            apiResponse[0]['data']['golem.inf.mem.gib']
          )
          this.name = apiResponse[0]['data']['golem.node.id.name']
          this.runtime_name = apiResponse[0]['data']['golem.runtime.name']
          this.cores = apiResponse[0]['data']['golem.inf.cpu.threads']
          this.model = apiResponse[0]['data']['golem.inf.cpu.model']

          if (
            apiResponse[0]['data']['golem.inf.cpu.vendor'] == 'GenuineIntel'
          ) {
            this.cpu_vendor = 'Intel'
          } else if (
            apiResponse[0]['data']['golem.inf.cpu.vendor'] == 'AuthenticAMD'
          ) {
            this.cpu_vendor = 'AMD'
          }
          this.threads = apiResponse[0]['data']['golem.inf.cpu.threads']
          this.disk = this.floorFigure(
            apiResponse[0]['data']['golem.inf.storage.gib']
          )
          this.runtime_version = apiResponse[0]['data']['golem.runtime.version']
          this.usage_vector = apiResponse[0]['data']['golem.com.usage.vector']
          this.pricing_model = apiResponse[0]['data']['golem.com.pricing.model']
          this.cpu_hour = this.floorFigure(
            apiResponse[0]['data']['golem.com.pricing.model.linear.coeffs'][1] *
              3600,
            3
          )
          this.per_hour = this.floorFigure(
            apiResponse[0]['data']['golem.com.pricing.model.linear.coeffs'][0] *
              3600,
            3
          )
          this.start_price = this.floorFigure(
            apiResponse[0]['data']['golem.com.pricing.model.linear.coeffs'][2],
            3
          )
          this.subnet = apiResponse[0]['data']['golem.node.debug.subnet']
          this.architecture =
            apiResponse[0]['data']['golem.inf.cpu.architecture']
          this.cpu_capabilities =
            apiResponse[0]['data']['golem.inf.cpu.capabilities']
          this.multi_activity =
            apiResponse[0]['data']['golem.srv.caps.multi-activity']
          this.interval_sec =
            apiResponse[0]['data']['golem.com.scheme.payu.interval_sec']
          this.transfer_protocol =
            apiResponse[0]['data']['golem.activity.caps.transfer.protocol']
          this.pricing =
            apiResponse[0]['data']['golem.com.pricing.model.linear.coeffs']
          this.accept_timeout =
            apiResponse[0]['data'][
              'golem.com.payment.debit-notes.accept-timeout?'
            ]
          if (
            apiResponse[0]['data'][
              'golem.com.payment.platform.erc20-mainnet-glm.address'
            ]
          ) {
            this.testnet = false
            this.wallet =
              apiResponse[0]['data'][
                'golem.com.payment.platform.erc20-mainnet-glm.address'
              ]
            //  block of code to be executed if the condition is true
          } else {
            this.testnet = true
            this.wallet =
              apiResponse[0]['data'][
                'golem.com.payment.platform.erc20-rinkeby-tglm.address'
              ]
            //  block of code to be executed if the condition is false
          }
        })
      this.loaded = true
    },
  },
}
</script>

<style>
</style>
