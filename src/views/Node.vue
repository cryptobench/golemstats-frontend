<template>
  <div>
    <b-card>
      <b-row v-if="loaded">
        <b-col
          cols="21"
          xl="6"
          class="d-flex justify-content-between flex-column"
        >
          <!-- User Avatar & Action Buttons -->
          <div class="d-flex justify-content-start">
            <b-avatar
              variant="light-primary"
              :src="appLogoImage"
              :text="name"
              size="104px"
              rounded
            />
            <div class="d-flex flex-column ml-1">
              <div class="mb-1">
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
                </h4>
                <span class="card-text"><b>Subnet:</b> {{ subnet }}</span>
              </div>
              <div class="d-flex flex-wrap">
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
            </div>
          </div>

          <!-- User Stats -->
          <div class="d-flex align-items-center mt-2">
            <div class="d-flex align-items-center mr-2">
              <b-avatar variant="light-primary" rounded>
                <feather-icon icon="CpuIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">{{ cores }}</h5>
                <small>Cores</small>
              </div>
            </div>
            <div class="d-flex align-items-center mr-2">
              <b-avatar variant="light-primary" rounded>
                <feather-icon icon="LayersIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">{{ memory }} GB</h5>
                <small>Memory</small>
              </div>
            </div>
            <div class="d-flex align-items-center mr-2">
              <b-avatar variant="light-primary" rounded>
                <feather-icon icon="HardDriveIcon" size="18" />
              </b-avatar>
              <div class="ml-1">
                <h5 class="mb-0">{{ disk }} GB</h5>
                <small>Disk</small>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row v-else>
        <div class="text-center">
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-row>
    </b-card>
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
  },
  data() {
    return {
      loaded: false,
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
      pricing: [],
      transfer_protocol: [],
      cpu_capabilities: [],
      usage_vector: [],
      testnet: '',
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
  },
  methods: {
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
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios
        .get('/v1/provider/node/' + this.$route.params.id)
        .then((response) => {
          let apiResponse = response.data
          this.id = apiResponse[0]['data']['id']
          this.online = apiResponse[0]['online']
          this.scheme = apiResponse[0]['data']['golem.com.scheme']
          this.memory = floorFigure(apiResponse[0]['data']['golem.inf.mem.gib'])
          this.name = apiResponse[0]['data']['golem.node.id.name']
          this.runtime_name = apiResponse[0]['data']['golem.runtime.name']
          this.cores = apiResponse[0]['data']['golem.inf.cpu.cores']
          this.model = apiResponse[0]['data']['golem.inf.cpu.model']
          this.cpu_vendor = apiResponse[0]['data']['golem.inf.cpu.vendor']
          this.threads = apiResponse[0]['data']['golem.inf.cpu.threads']
          this.disk = floorFigure(
            apiResponse[0]['data']['golem.inf.storage.gib']
          )
          this.runtime_version = apiResponse[0]['data']['golem.runtime.version']
          this.usage_vector = apiResponse[0]['data']['golem.com.usage.vector']
          this.pricing_model = apiResponse[0]['data']['golem.com.pricing.model']
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
