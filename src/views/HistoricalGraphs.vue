<template>
  <b-row>
    <b-col>
      <statsovertime />
      <b-row>
        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalpricinggraphs
            :key="updaterender"
            :endpoint="'/v1/network/historical/pricing/average'"
            :title="'Provider Average Pricing'"
            :palette="['#7033FF', '#CC1100', '#FF7E3D']"
          />
        </b-col>
        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalpricinggraphs
            :key="updaterender"
            :endpoint="'/v1/network/historical/pricing/median'"
            :title="'Provider Median Pricing'"
            :palette="['#FFED29', '#FF5289', '#00096B']"
          />
        </b-col>

        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalprovidercomputing
            :key="updaterender"
            :endpoint="'/v1/network/historical/provider/computing'"
            :title="'Providers computing simultaneously'"
            :colors="'#0230FF'"
          />
        </b-col>
        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <latestnodes :key="updaterender" :count="5" />
        </b-col>
        <b-col lg="12" xl="12" md="12" sm="12" xs="12">
          <networkversions :key="updaterender" />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import statsovertime from "@core/components/network/statsovertime.vue"
import networkversions from "@core/components/network/networkversions.vue"
import historicalpricinggraphs from "@core/components/network/historicalpricinggraphs.vue"
import historicalprovidercomputing from "@core/components/network/historicalprovidercomputing.vue"
import latestnodes from "@core/components/network/latestnodes.vue"
import { BCard, BCardText, BFormGroup, BFormInput, BButton, BAvatar, BBadge, BCol, BRow, BSpinner } from "bootstrap-vue"
import { $themeConfig } from "@themeConfig"

export default {
  metaInfo: {
    title: "Golem Network Stats - A stats page for the Golem Network",
    meta: [
      {
        name: "description",
        content: "Explore the historical Golem Network stats through graphs",
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
    statsovertime,
    historicalpricinggraphs,
    historicalprovidercomputing,
    latestnodes,
    networkversions,
  },
  watch: {
    "$store.state.appConfig.layout.skin": function() {
      this.updaterender += 1
    },
  },
  data() {
    return {
      updaterender: 0,
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
}
</script>

<style></style>
