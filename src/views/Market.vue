<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-card>
          <b-row class="mb-1">
            <b-col offset-lg="5" lg="4">
              <h4>
                <span class="brand-logo">
                  <b-img width="20" :src="appLogoImage" alt="logo" />
                </span>
                <b>Golem Network Token</b>
              </h4>
            </b-col>
          </b-row>
          <div class="divider mb-2"></div>
          <b-row>
            <b-col offset-lg="4" lg="3">
              <p>
                <b>Price:</b>
              </p>
            </b-col>
            <b-col lg="4">
              <p>
                <b>${{ usdprice }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="4" lg="3">
              <p>
                <b>Marketcap:</b>
              </p>
            </b-col>
            <b-col lg="4">
              <p>
                <b>${{ marketcap }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="4" lg="3">
              <p>
                <b>Circulating Supply:</b>
              </p>
            </b-col>
            <b-col lg="4">
              <p>
                <b>1 000 000 000 GLM</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col offset-lg="4" lg="3">
              <p>
                <b>Max Supply:</b>
              </p>
            </b-col>
            <b-col lg="4">
              <p>
                <b>1 000 000 000 GLM</b>
              </p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" xl="12" md="12" sm="12" xs="12">
        <b-card class="mb-0">
          <b-table
            v-if="table_data"
            responsive
            hover
            outlined
            :fields="fields"
            :items="items"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            show-empty
            empty-text="No online nodes found"
          >
            <!-- A virtual column -->
            <template #cell(Exchange)="data">
              <b>{{ data.value }}</b>
            </template>

            <template #cell(Volume)="data">
              <b-avatar variant="light-success" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              {{ data.value }}
            </template>
            <!-- A custom formatted column -->
            <template #cell(Pair)="data">
              <b>{{ data.value }}</b>
            </template>

            <!-- A custom formatted column -->
          </b-table>
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
  BAvatar,
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
    BTable,
    BAvatar,
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
      table_data: false,
      sortBy: 'Volume',
      sortDesc: true,
      items: [],
      fields: [
        /* 
          Optionally define a class per header, 
          this will overlay whatever thead-class background you choose 
        */
        {
          key: 'Exchange',
          label: 'Exchange',
          tdClass: 'primary bold',
          sortable: true,
        },
        { key: 'Pair', label: 'Pair', sortable: true },
        { key: 'Volume', label: 'Volume', sortable: true },
      ],
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
          let tickers = response.data.tickers
          tickers.forEach((obj) => {
            this.items.push({
              Exchange: obj.market.name,
              Pair: obj.base + '/' + obj.target,
              Volume: obj.converted_volume.usd,
            })
          })
          this.table_data = true
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
