<template>
  <div>
    <b-row>
      <b-col xl="12" lg="12" md="12" sm="12" xs="12">
        <networkpercentagecomputing :key="updaterender" />
      </b-col>
      <b-col xs="12" sm="12" lg="6" md="12">
        <vendorpie :key="updaterender" v-if="table_data" :data="vendorlist" />
      </b-col>
      <b-col xs="12" sm="12" lg="6" md="12">
        <architecturepie :key="updaterender" v-if="table_data" :data="architecturelist" />
      </b-col>
      <b-col xs="12" sm="12" lg="6" md="12">
        <agreementreasons :key="updaterender" />
      </b-col>
      <b-col xs="12" sm="12" lg="3" md="6">
        <paidinvoicespercentage :key="updaterender" />
      </b-col>
      <b-col xs="12" sm="12" lg="3" md="6">
        <invoiceaccepted :key="updaterender" />
      </b-col>
      <!-- <b-col xl="12" lg="12" md="12" sm="12" xs="12">
        <networkversions> </networkversions>
      </b-col> -->
    </b-row>
    <networkutilization :key="updaterender" />
  </div>
</template>

<script>
import networkutilization from "@core/components/network/networkutilization.vue"
import agreementreasons from "@core/components/network/agreementreasons.vue"
import paidinvoicespercentage from "@core/components/network/paidinvoicespercentage.vue"
import invoiceaccepted from "@core/components/network/invoicesaccepted.vue"
import networkpercentagecomputing from "@core/components/network/networkpercentagecomputing.vue"
import networkversions from "@core/components/network/networkversions.vue"
import Vendorpie from "@core/components/network/vendorpie.vue"
import architecturepie from "@core/components/network/architecturepie.vue"
import { BCard, BCardText, BFormGroup, BFormInput, BButton, BAvatar, BBadge, BCol, BRow, BSpinner } from "bootstrap-vue"
import axios from "@axios"
import { $themeConfig } from "@themeConfig"

export default {
  metaInfo: {
    title: "Golem Network Stats - A stats page for the Golem Network",
    meta: [
      {
        name: "description",
        content: "View live Golem Network stats",
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
    agreementreasons,
    paidinvoicespercentage,
    invoiceaccepted,
  },
  data() {
    return {
      updaterender: 0,
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
      id: "",
      scheme: "",
      memory: "",
      name: "",
      runtime_name: "",
      cores: "",
      model: "",
      cpu_vendor: "",
      threads: "",
      disk: "",
      runtime_version: "",
      pricing_model: "",
      subnet: "",
      architecture: "",
      multi_activity: "",
      interval_sec: "",
      accept_timeout: "",
      wallet: "",
      online: "",
      cpu_hour: "",
      per_hour: "",
      start_price: "",
      transfer_protocol: [],
      cpu_capabilities: [],
      usage_vector: [],
      testnet: "",
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
  mounted() {
    this.timer = setInterval(() => {
      this.fetchData()
    }, 15000)
  },
  watch: {
    "$store.state.appConfig.layout.skin": function() {
      this.updaterender += 1
    },
  },
  methods: {
    fetchData() {
      this.intelcount = 0
      this.amdcount = 0
      this.thirdtypecpu = 0
      this.vendorlist.length = 0
      this.Aarch64 = 0
      this.x86_64 = 0
      this.architecturelist.length = 0
      axios.get("/v1/network/online").then((response) => {
        const apiResponse = response.data
        apiResponse.forEach((obj) => {
          if (obj.data["golem.inf.cpu.vendor"]) {
            if (obj.data["golem.inf.cpu.vendor"] == "GenuineIntel") {
              this.intelcount++
            } else if (obj.data["golem.inf.cpu.vendor"] == "AuthenticAMD") {
              this.amdcount++
            } else {
              this.thirdtypecpu++
            }
          }

          if (obj.data["golem.inf.cpu.architecture"]) {
            if (obj.data["golem.inf.cpu.architecture"] == "x86_64") {
              this.x86_64++
            } else if (obj.data["golem.inf.cpu.architecture"] == "aarch64") {
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

<style></style>
