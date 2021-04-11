<template>
  <div>
    <b-row>
      <b-col lg="4">
        <b-card>
          <b-row class="mb-1">
            <b-col offset-lg="2" lg="8">
              <h4>
                <span class="brand-logo">
                  <b-img :src="appLogoImage" alt="logo" />
                </span>
                <b>Golem Network Token</b>
              </h4>
            </b-col>
          </b-row>
          <div class="divider mb-2"></div>
          <b-row>
            <b-col offset-lg="1" lg="6">
              <p>
                <b>Price:</b>
              </p>
            </b-col>
            <b-col lg="5">
              <p>
                <b>${{ usdprice }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="1" lg="6">
              <p>
                <b>Marketcap:</b>
              </p>
            </b-col>
            <b-col lg="5">
              <p>
                <b>${{ marketcap }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="1" lg="5">
              <p>
                <b>Circulating Supply:</b>
              </p>
            </b-col>
            <b-col lg="6">
              <p>
                <b>{{ circulating_supply }} GLM</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="1" lg="5">
              <p>
                <b>Max Supply:</b>
              </p>
            </b-col>
            <b-col lg="6">
              <p>
                <b>1 000 000 000 GLM</b>
              </p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCol,
  BCardText,
  BContainer,
  BRow,
  BTable,
  BCard,
  BFormInput,
  BImg,
} from 'bootstrap-vue'
import axios from '@axios'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BCard,
    BCardText,
    BContainer,
    BRow,
    BCol,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage } = $themeConfig.app
    return {
      appName,
      appLogoImage,
    }
  },
  data() {
    return {
      usdprice: '',
      marketcap: '',
      circulating_supply: '',
    }
  },
  created() {
    this.geckoapi()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.geckoapi()
    }, 15000)
  },
  methods: {
    geckoapi: function () {
      axios
        .get('https://api.coingecko.com/api/v3/coins/golem')
        .then((response) => {
          this.usdprice = response.data.market_data.current_price.usd
            .toString()
            .slice(0, 7)
          this.marketcap = response.data.market_data.market_cap.usd
            .toString()
            .replace(/(.{3})/g, '$1 ')
          this.circulating_supply = response.data.market_data.circulating_supply
            .toString()
            .replace(/(.{3})/g, '$1 ')
        })
    },
  },
}
</script>

<style>
.divider {
  background-color: #d8d6dd;
  height: 1px;
}
</style>
