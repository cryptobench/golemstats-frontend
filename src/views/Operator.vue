<template>
  <div>
    <b-row>
      <b-col lg="12" class="mb-2 mt-2">
        <b-card>
          <h1>Node by opeator</h1>
          <p>
            Search for a specific wallet and get a dashboard of all the nodes
            providing for that specific wallet address.
          </p>
          <h5>Search for node</h5>
          <b-form-input
            v-on:keyup.enter="find_node"
            v-model="wallet"
            placeholder="Wallet address"
          ></b-form-input>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import networkutilization from '@core/components/network/networkutilization.vue'
import networkpercentagecomputing from '@core/components/network/networkpercentagecomputing.vue'
import networkversions from '@core/components/network/networkversions.vue'
import {
  BCard,
  BCardText,
  BFormGroup,
  BButton,
  BFormInput,
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
    networkutilization,
    networkversions,
    networkpercentagecomputing,
  },
  data() {
    return {
      loaded: false,
      wallet: '',
    }
  },
  // mounted: function () {
  //   this.timer = setInterval(() => {
  //     this.activity()
  //   }, 15000)
  // },
  methods: {
    makeToast(variant = null) {
      this.$bvToast.toast('Toast body content', {
        title: `Variant ${variant || 'default'}`,
        variant,
        solid: true,
      })
    },
    find_node() {
      axios.get('/v1/wallet/' + this.wallet).then((response) => {
        this.$router.push({
          name: 'operatordetailed',
          params: { id: this.wallet },
        })
      })
    },
  },
}
</script>

<style>
</style>
