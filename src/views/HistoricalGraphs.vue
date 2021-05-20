<template>
  <b-row>
    <b-col col="12">
      <statsovertime></statsovertime>
      <historicalpricinggraphs
        :endpoint="'/v1/network/historical/pricing/average'"
        :title="'Provider Average Pricing'"
      ></historicalpricinggraphs>
      <historicalpricinggraphs
        :endpoint="'/v1/network/historical/pricing/median'"
        :title="'Provider Median Pricing'"
      ></historicalpricinggraphs>
      <historicalprovidercomputing
        :endpoint="'/v1/network/historical/provider/computing'"
        :title="'Providers computing simultaneously'"
      ></historicalprovidercomputing>
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
