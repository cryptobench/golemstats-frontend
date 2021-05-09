<template>
  <div>
    <b-row>
      <b-col lg="4">
        <b-card>
          <b-row class="mb-1">
            <b-col xs="12" sm="12" offset-lg="2" lg="8">
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
            <b-col xs="6" sm="6" offset-lg="1" lg="4">
              <p>
                <b>Price:</b>
              </p>
            </b-col>
            <b-col xs="6" sm="6" lg="4">
              <p>
                <b>${{ usdprice }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col xs="6" sm="6" offset-lg="1" lg="4">
              <p>
                <b>Marketcap:</b>
              </p>
            </b-col>
            <b-col xs="6" sm="6" lg="4">
              <p>
                <b>${{ marketcap }}</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col xs="6" sm="6" offset-lg="1" lg="4">
              <p>
                <b>Circulating Supply:</b>
              </p>
            </b-col>
            <b-col xs="6" sm="6" lg="6">
              <p>
                <b>1 000 000 000 GLM</b>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col xs="6" sm="6" offset-lg="1" lg="4">
              <p>
                <b>Max Supply:</b>
              </p>
            </b-col>
            <b-col xs="6" sm="6" lg="6">
              <p>
                <b>1 000 000 000 GLM</b>
              </p>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="8" md="12">
        <b-card>
          <h3>Price graph</h3>
          <apexchart
            v-if="graph_loaded"
            width="100%"
            height="250"
            type="area"
            :options="chartOptions"
            :series="series"
          ></apexchart>
          <div class="text-center" v-else>
            <b-spinner variant="primary" label="Text Centered" />
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12" xl="12" md="12" sm="12" xs="12">
        <b-card class="mb-0">
          <h2 class="mb-2">Market</h2>
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
              <b-avatar class="mr-1" variant="light-primary" rounded>
                <feather-icon icon="RadioIcon" size="18" />
              </b-avatar>
              <b>{{ data.value }}</b>
            </template>

            <template #cell(Price)="data">
              <b-avatar variant="light-success" rounded>
                <feather-icon icon="DollarSignIcon" size="18" />
              </b-avatar>
              <b>${{ data.value }}</b>
            </template>

            <template #cell(Volume)="data">
              <b>${{ data.value.toLocaleString('en') }}</b>
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
  BSpinner,
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
    BSpinner,
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
      graph_loaded: false,
      marketcap: '',
      circulating_supply: '',
      table_data: false,
      sortBy: 'Volume',
      sortDesc: true,
      items: [],
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
            format: 'dd MMM yyyy',
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
          width: 3,
        },
        yaxis: {
          title: {
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
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 0.1,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
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
        { key: 'Price', label: 'Price', sortable: true },
        { key: 'Pair', label: 'Pair', sortable: true },
        { key: 'Volume', label: 'Volume', sortable: true },
      ],
    }
  },
  created() {
    this.geckoapi()
    this.graph()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.geckoapi()
    }, 15000)
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    graph: function () {
      let now = Math.floor(Date.now() / 1000)
      axios
        .get(
          'https://api.coingecko.com/api/v3/coins/golem/market_chart/range?vs_currency=usd&from=1392577232&to=' +
            now
        )
        .then((response) => {
          let prices = response.data.prices
          let computing = []
          for (var i in prices) {
            computing.push([prices[i][0], this.floorFigure(prices[i][1], 4)])
          }
          this.series = [
            {
              data: computing,
              name: 'Price $',
            },
          ]
          this.graph_loaded = true
        })
    },
    geckoapi: function () {
      this.items.length = 0
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
            if (obj.market.name.includes('swap')) {
              var pair = 'GLM/' + obj.target
            } else {
              var pair = obj.base + '/' + obj.target
            }
            this.items.push({
              Exchange: obj.market.name,
              Price: this.floorFigure(obj.converted_last.usd, 4),
              Pair: pair,
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
