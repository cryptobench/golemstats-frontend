<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img
              class="logo-manual"
              width="15"
              :src="appLogoImage"
              alt="logo"
            />
          </span>
          <h2 class="brand-text mb-0">
            {{ appName }}
          </h2>
        </b-link>
      </li>
      <span class="alpha"> Experimental Alpha Version</span>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
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
}
</script>

<style>
.alpha {
  color: orange;
}

.logo-manual {
  margin-right: 5px;
}
</style>
