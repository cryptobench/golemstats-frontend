<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
      <currency-Toggler class="d-none d-lg-block" />
    </div>
    <div class="nav align-items-center ml-auto">
      <span class="text-primary"
        ><b>{{ this.count.toLocaleString("en") }}</b> API requests served</span
      >
    </div>
  </div>
</template>

<script>
import { BLink } from "bootstrap-vue"
import DarkToggler from "@/@core/layouts/components/app-navbar/components/DarkToggler.vue"
import CurrencyToggler from "@/@core/layouts/components/app-navbar/components/CurrencyToggler.vue"
import axios from "@axios"

export default {
  components: {
    BLink,
    CurrencyToggler,
    // Navbar Components
    DarkToggler,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  created() {
    this.usage()
  },
  mounted: function() {
    this.timer = setInterval(() => {
      this.usage()
    }, 15000)
  },
  data() {
    return {
      count: "",
    }
  },
  methods: {
    usage() {
      axios.get("/v1/api/usage").then((response) => {
        this.count = response.data.count
      })
    },
  },
}
</script>
<style>
.api {
  color: #13188d;
}
</style>
