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
      <span class="rotate blink_me t**** Oh hello there mr inspector "
        ><img src="https://stats.golem.network/staticfiles/rocks.svg" width="30" class="rock" />👀</span
      >
      <dark-Toggler class="d-none d-lg-block" />
      <currency-Toggler class="d-none d-lg-block" />
    </div>
    <div class="nav align-items-center ml-auto">
      <span class="text-primary"
        ><b>{{ this.count.toLocaleString("en") }}</b> API requests served</span
      >
      <span class="rotate blink_me rocky-mobile t**** Oh hello there mr inspector"
        ><img src="https://stats.golem.network/staticfiles/rocks.svg" width="30" class="rock" />👀</span
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
.rocky-mobile {
  margin-left: 5px;
}
.rotate {
  transform: rotate(20deg);

  /* Legacy vendor prefixes that you probably don't need... */

  /* Safari */
  -webkit-transform: rotate(20deg);

  /* Firefox */
  -moz-transform: rotate(20deg);

  /* IE */
  -ms-transform: rotate(20deg);

  /* Opera */
  -o-transform: rotate(20deg);

  /* Internet Explorer */
  filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=3);
}
.blink_me {
  animation: blinker 2s linear 4;
}

.rock {
  margin-right: 2px;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
