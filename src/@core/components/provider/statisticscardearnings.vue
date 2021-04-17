<template>
  <div>
    <b-card v-if="loaded" no-body>
      <b-card-body class="d-flex justify-content-between align-items-center">
        <div class="truncate">
          <h2 class="mb-25 font-weight-bolder">
            {{ income }}
          </h2>
          <span>{{ statisticTitle }}</span>
        </div>
        <b-avatar :variant="`light-${color}`" size="45">
          <feather-icon size="21" :icon="icon" />
        </b-avatar>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardBody, BAvatar } from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BCard,
    BCardBody,
    BAvatar,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    statisticTitle: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
  data() {
    return {
      loaded: false,
      income: '',
    }
  },
  created() {
    this.earnings()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.earnings()
    }, 15000)
  },
  methods: {
    earnings() {
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios
        .get(
          '/v1/provider/node/' + this.provider + '/earnings' + '/' + this.hours
        )
        .then((response) => {
          let apiResponse = response.data
          this.income = floorFigure(apiResponse.earnings, 3) + ' GLM'
          this.loaded = true
        })
    },
  },
}
</script>
