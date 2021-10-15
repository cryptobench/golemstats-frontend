<template>
  <div v-if="loaded">
    <b-row>
      <b-col>
        <b-card>
          <h3>Operator Node Status</h3>
          <b-badge class="mr-1" pill variant="success"> {{ this.onlinecount }} Online Nodes </b-badge>
          <b-badge pill variant="danger"> {{ this.offlinecount }} Offline Nodes </b-badge>
          <div class="mt-2 mb-1">
            <h4>Mainnet wallet</h4>
            <b-button target="_blank" variant="primary" @click="zkscan">
              ZKscan
            </b-button>
            <b-button variant="primary" class="ml-1" @click="etherscan">
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
        <div v-else class="text-center cardish">
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
        <div v-else class="text-center cardish">
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
          statistic-title="Total Earnings (90d)"
          style="max-width: 400px"
        />
        <div v-else class="text-center cardish">
          <b-spinner variant="primary" label="Text Centered" />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="pb-5" lg="12" xl="12" md="12" sm="12" xs="12">
        <b-card no-body class="mb-0">
          <b-col lg="6" class="mb-2 mt-2">
            <h5>Search for node</h5>
            <b-form-input v-model="filter" placeholder="Node Name" />
          </b-col>
          <b-table
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :fields="fields"
            :filter="filter"
            :filter-ignored-fields="ignoredfilter"
            :items="items"
            hover
            responsive="sm"
            @row-clicked="expandAdditionalInfo"
          >
            <!-- A virtual column -->
            <template #cell(Name)="data">
              {{ data.value }}
              <b-badge v-if="data['item'].Online" pill variant="success">
                Online
              </b-badge>
              <b-badge v-else-if="data['item'].Old" pill variant="danger">
                OLD
              </b-badge>
              <b-badge v-else pill variant="danger">
                Offline
              </b-badge>
            </template>

            <!-- A custom formatted column -->
            <template #cell(Subnet)="data">
              <div class="d-flex align-items-center">
                <b-badge v-if="data['item'].Mainnet" class="w-100" pill variant="primary">
                  Mainnet
                </b-badge>
                <b-badge v-else class="w-100" pill variant="warning">
                  Testnet
                </b-badge>
              </div>
            </template>

            <template #cell(Version)="data">
              <div class="d-flex align-items-center">
                <b-badge v-if="data['item'].Version == '0.0.0' || data['item'].Version == ''" class="w-100" pill variant="primary"
                  >Not Reported</b-badge
                >
                <b-badge v-else class="w-100" pill variant="primary"> v{{ data["item"].Version }} </b-badge>
              </div>
            </template>
            <!-- A custom formatted column -->
            <template #cell(Cores)="data">
              <div class="d-flex align-items-center">
                <b-avatar v-if="data['item'].Vendor == 'AuthenticAMD'" class="mr-1" variant="light-danger" rounded>
                  <feather-icon icon="CpuIcon" size="18" />
                </b-avatar>
                <b-avatar v-else class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="CpuIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>

            <template #cell(Memory)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="LayersIcon" size="18" />
                </b-avatar>
                {{ data.value }} GB
              </div>
            </template>

            <!-- A virtual composite column -->
            <template #cell(Disk)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="HardDriveIcon" size="18" />
                </b-avatar>
                {{ data.value }} GB
              </div>
            </template>
            <template #cell(Earnings)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-success" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(benchmark_score)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="ZapIcon" size="18" />
                </b-avatar>
                <div v-if="data['item'].benchmark_score == '0'">Not benchmarked</div>
                <div v-else>
                  {{ data.value }}
                </div>
              </div>
            </template>
            <template #cell(cpu_hour)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(per_hour)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(start_price)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
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
            responsive="sm"
            @row-clicked="expandAdditionalInfo"
          >
            <!-- A virtual column -->
            <template #cell(Name)="data">
              {{ data.value }}
              <b-badge pill variant="danger">
                Old node
              </b-badge>
            </template>

            <!-- A custom formatted column -->
            <template #cell(Subnet)="data">
              <div class="d-flex align-items-center">
                <b-badge v-if="data['item'].Mainnet" class="w-100" pill variant="primary">
                  Mainnet
                </b-badge>
                <b-badge v-else class="w-100" pill variant="warning">
                  Testnet
                </b-badge>
              </div>
            </template>

            <!-- A custom formatted column -->
            <template #cell(Cores)="data">
              <div class="d-flex align-items-center">
                <b-avatar v-if="data['item'].Vendor == 'AuthenticAMD'" class="mr-1" variant="light-danger" rounded>
                  <feather-icon icon="CpuIcon" size="18" />
                </b-avatar>
                <b-avatar v-else class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="CpuIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>

            <template #cell(Memory)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="LayersIcon" size="18" />
                </b-avatar>
                {{ data.value }} GB
              </div>
            </template>

            <!-- A virtual composite column -->
            <template #cell(Disk)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="HardDriveIcon" size="18" />
                </b-avatar>
                {{ data.value }} GB
              </div>
            </template>
            <template #cell(Earnings)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-success" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(cpu_hour)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(per_hour)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
            <template #cell(start_price)="data">
              <div class="d-flex align-items-center">
                <b-avatar class="mr-1" variant="light-primary" rounded>
                  <feather-icon icon="DollarSignIcon" size="18" />
                </b-avatar>
                {{ data.value }}
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BCardText, BFormGroup, BFormInput, BButton, BAvatar, BCol, BRow, BTable, BBadge, BSpinner } from "bootstrap-vue"
import axios from "@axios"
import { $themeConfig } from "@themeConfig"
import statisticscardearnings from "@core/components/provider/statisticscardearnings.vue"
import StatisticCardHorizontal from "@core/components/statistics-cards/StatisticCardHorizontal.vue"

export default {
  metaInfo: {
    title: "Golem Network Stats - A stats page for the Golem Network",
    meta: [
      {
        name: "description",
        content: "Filter node operators by wallet address to view in-depth details for operators.",
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
          key: "Name",
          label: "Provider Name",
          tdClass: "primary bold",
          sortable: true,
        },
        { key: "Subnet", label: "Network", sortable: true },
        { key: "Version", label: "Version", sortable: true },
        { key: "Cores", label: "Cores", sortable: true },
        { key: "Memory", label: "Memory (GB)", sortable: true },
        { key: "Disk", label: "Disk (GB)", sortable: true },
        { key: "benchmark_score", label: "Performance Score", sortable: true },
        { key: "Earnings", label: "Total earnings", sortable: true },
        { key: "cpu_hour", label: "CPU/h price", sortable: true },
        { key: "per_hour", label: "Per/h price", sortable: true },
        { key: "start_price", label: "Start Price", sortable: true },
      ],
      items: [],
      oldlist: [],
      ignoredfilter: ["Cores", "Memory", "Disk", "Earnings", "cpu_hour", "per_hour", "start_price", "Subnet"],
      filter: "",
      sortBy: "Online",
      sortDesc: true,
      usdprice: "",
      oldloaded: false,
      usdloaded: false,
      onlinecount: "",
      offlinecount: "",
      totalcores: "",
      totalmemory: "",
      totaldisk: "",
      totalearnings: "",
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
  watch: {
    "$store.state.appConfig.layout.currency": function() {
      this.makeToast(
        "success",
        `Changing layout to ${this.$store.state.appConfig.layout.currency} prices`,
        "This will happen on next pull (within 60s)"
      )
    },
  },
  created() {
    this.geckoapi()
    this.activity()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.activity()
      this.geckoapi()
    }, 60000)
  },
  methods: {
    zkscan() {
      window.open(`https://zkscan.io/explorer/accounts/${this.$route.params.id}`, "_blank")
    },
    etherscan() {
      window.open(`https://etherscan.io/address/${this.$route.params.id}`, "_blank")
    },
    expandAdditionalInfo(row) {
      this.$router.push({ name: "node", params: { id: row.id } })
    },
    makeToast(variant = null, title, message) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
      })
    },
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    earnings(provider, hours) {
      axios.get(`/v1/provider/node/${provider}/earnings` + `/${hours}`).then((response) => {
        const apiResponse = response.data
        if (localStorage.getItem("currency") == "glm") {
          const income = `${this.floorFigure(apiResponse.earnings, 3)} GLM`
          console.log("INCOME", income)
          return income
        }
        if (!localStorage.getItem("currency")) {
          localStorage.setItem("currency", "glm")
          const income = `${this.floorFigure(apiResponse.earnings, 3)} GLM`
          console.log("INCOME", income)
          return income
        }
        const income = `${this.floorFigure(apiResponse.earnings * this.usdprice, 3)} USD`
        console.log("INCOME", income)
        return income
      })
    },
    geckoapi() {
      axios.get("https://api.coingecko.com/api/v3/simple/price?ids=golem&vs_currencies=usd").then((response) => {
        this.usdprice = response.data.golem.usd
        if (localStorage.getItem("currency") == "glm") {
          this.totalearnings = `${this.floorFigure(this.totalearnings, 2)} GLM`
        } else if (!localStorage.getItem("currency")) {
          localStorage.setItem("currency", "glm")
          this.totalearnings = `${this.floorFigure(this.totalearnings, 2)} GLM`
        } else {
          this.totalearnings = `${this.floorFigure(this.totalearnings * this.usdprice, 2)} USD`
        }
        this.usdloaded = true
      })
    },
    daydifference(d1, d2) {
      const diff = Math.abs(d1.getTime() - d2.getTime())
      return diff / (1000 * 60 * 60 * 24)
    },
    activity() {
      this.items.length = 0
      axios.get(`/v1/provider/wallet/${this.$route.params.id}`).then((response) => {
        const apiResponse = response.data
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
            totalcores += obj.data["golem.inf.cpu.threads"]
            totalmemory += obj.data["golem.inf.mem.gib"]
            totaldisk += obj.data["golem.inf.storage.gib"]
          }

          totalearnings += obj.earnings_total
          // this.earnings(obj.data['id'], 24).then((items) => {
          //   // You might use this at some stage: const { sortBy, descending, page, rowsPerPage } = this.pagination
          //   console.log(items)
          // })
          // this.earnings(obj.data['id'], 24)
          const seen = new Date(obj.updated_at)
          const currenttime = new Date(Date.now())
          if (this.daydifference(currenttime, seen) > 7) {
            var old = true
          } else {
            var old = false
          }

          if (obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]) {
            var mainnet = true
            var wallet = obj.data["golem.com.payment.platform.erc20-mainnet-glm.address"]
            //  block of code to be executed if the condition is true
          } else {
            var mainnet = false
            var wallet = obj.data["golem.com.payment.platform.erc20-rinkeby-tglm.address"]
            //  block of code to be executed if the condition is false
          }

          if (localStorage.getItem("currency") == "glm") {
            var earnings = `${this.floorFigure(obj.earnings_total, 2)} GLM`
          } else if (!localStorage.getItem("currency")) {
            localStorage.setItem("currency", "glm")
            var earnings = `${this.floorFigure(obj.earnings_total, 2)} GLM`
          } else {
            var earnings = `${this.floorFigure(obj.earnings_total * this.usdprice, 2)} USD`
          }

          if (!old) {
            this.items.push({
              Mainnet: mainnet,
              Online: obj.online,
              Version: obj.version,
              Earnings: earnings,
              Name: obj.data["golem.node.id.name"],
              id: obj.data.id,
              Subnet: obj.data["golem.node.debug.subnet"],
              Cores: obj.data["golem.inf.cpu.threads"],
              Vendor: obj.data["golem.inf.cpu.vendor"],
              Wallet: wallet,
              benchmark_score: obj.benchmark_score,
              start_price: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][2], 3)} GLM`,
              per_hour: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][0] * 3600, 3)} GLM`,
              cpu_hour: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][1] * 3600, 3)} GLM`,
              Memory: this.floorFigure(obj.data["golem.inf.mem.gib"]),
              Disk: this.floorFigure(obj.data["golem.inf.storage.gib"]),
            })
          } else {
            this.oldlist.push({
              Mainnet: mainnet,
              Online: obj.online,
              Earnings: earnings,
              Name: obj.data["golem.node.id.name"],
              id: obj.data.id,
              Subnet: obj.data["golem.node.debug.subnet"],
              Cores: obj.data["golem.inf.cpu.threads"],
              Wallet: wallet,
              start_price: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][2], 3)} GLM`,
              per_hour: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][0] * 3600, 3)} GLM`,
              cpu_hour: `${this.floorFigure(obj.data["golem.com.pricing.model.linear.coeffs"][1] * 3600, 3)} GLM`,
              Memory: this.floorFigure(obj.data["golem.inf.mem.gib"]),
              Disk: this.floorFigure(obj.data["golem.inf.storage.gib"]),
            })
            this.oldloaded = true
          }
        })
        this.loaded = true
        this.onlinecount = onlinecounter
        this.offlinecount = offlinecounter
        this.totalcores = totalcores
        this.totalmemory = `${this.floorFigure(totalmemory)} GB`
        this.totaldisk = `${this.floorFigure(totaldisk)} GB`
        this.totalearnings = this.floorFigure(totalearnings)
        // let success = data.map(({ values }) => values)
      })
    },
  },
}
</script>

<style>
html {
  max-width: 100vw;
  overflow-x: hidden !important;
}
[dir] .table th,
[dir] .table td {
  padding: 1rem !important;
}
[dir] .table:not(.table-dark):not(.table-light) tfoot:not(.thead-dark) th,
[dir] .table:not(.table-dark):not(.table-light) thead:not(.thead-dark) th {
  background-color: white;
}
[dir] .table thead th {
  border-bottom: none;
}
</style>
