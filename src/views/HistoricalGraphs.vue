<template>
  <b-row>
    <b-col col="12">
      <statsovertime></statsovertime>
      <b-row>
        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalpricinggraphs
            :endpoint="'/v1/network/historical/pricing/average'"
            :title="'Provider Average Pricing'"
            :palette="['#7033FF', '#CC1100', '#FF7E3D']"
          ></historicalpricinggraphs>
        </b-col>
        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalpricinggraphs
            :endpoint="'/v1/network/historical/pricing/median'"
            :title="'Provider Median Pricing'"
            :palette="['#FFED29', '#FF5289', '#00096B']"
          ></historicalpricinggraphs>
        </b-col>

        <b-col lg="6" xl="6" md="12" sm="12" xs="12">
          <historicalprovidercomputing
            :endpoint="'/v1/network/historical/provider/computing'"
            :title="'Providers computing simultaneously'"
            :colors="'#0230FF'"
          ></historicalprovidercomputing>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import statsovertime from '@core/components/network/statsovertime.vue'
import historicalpricinggraphs from '@core/components/network/historicalpricinggraphs.vue'
import historicalprovidercomputing from '@core/components/network/historicalprovidercomputing.vue'
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
import { $themeConfig } from '@themeConfig'

export default {
  metaInfo: {
    title: 'Golemstats - A stats page for the Golem Network',
    meta: [
      {
        name: 'description',
        content: 'Explore the historical Golem Network stats through graphs',
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
  },
  data() {
    return {}
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

<style>
</style>
