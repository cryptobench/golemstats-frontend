<template>
  <b-badge class="badge-status" v-if="computing" variant="danger">
    <feather-icon icon="GlobeIcon" class="mr-25" />
    <span>Computing</span>
  </b-badge>
  <b-badge class="badge-status" v-else variant="warning">
    <feather-icon icon="GlobeIcon" class="mr-25" />
    <span>Not computing</span>
  </b-badge>
</template>

<script>
import { BCard, BCardBody, BAvatar, BBadge } from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BCard,
    BBadge,
    BCardBody,
    BAvatar,
  },
  props: {
    provider: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
      computing: false,
    }
  },
  created() {
    this.check()
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.check()
    }, 15000)
  },
  methods: {
    check() {
      function floorFigure(figure, decimals) {
        if (!decimals) decimals = 2
        var d = Math.pow(10, decimals)
        return (parseInt(figure * d) / d).toFixed(decimals)
      }
      axios
        .get('/v1/provider/node/' + this.provider + '/computing')
        .then((response) => {
          let apiResponse = response.data
          if (apiResponse.computing == 0) {
            this.computing = false
            this.loaded = true
          } else if (apiResponse.computing == 1) {
            this.computing = true
            this.loaded = true
          }
        })
    },
  },
}
</script>
<style >
.badge-status {
  margin-left: 5px;
}
</style>