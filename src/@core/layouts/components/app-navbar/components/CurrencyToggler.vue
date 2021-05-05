<template>
  <b-nav-item @click="currency = isDark ? 'glm' : 'usd'">
    <svg
      v-if="isDark"
      version="1.1"
      id="Logo"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 23.7 37.8"
      style="enable-background: new 0 0 23.7 37.8"
      xml:space="preserve"
      height="21px"
      width:="21px"
    >
      <g>
        <path
          class="st0"
          d="M19.3,0l-3.9,3.9c-1.3-1-3-1.5-4.7-1.5c-4.5,0-8.2,3.7-8.2,8.2c0,4,2.9,7.4,6.8,8.1v3c-3.9,0.7-6.8,4-6.8,8.1
		c0,4.5,3.7,8.2,8.2,8.2s8.2-3.7,8.2-8.2c0-4-2.9-7.4-6.8-8.1v-3c3.9-0.6,6.8-4,6.8-8.1c0-1.8-0.6-3.4-1.5-4.7l3.9-3.9L19.3,0z
		 M16.1,29.6c0,3-2.4,5.4-5.4,5.4c-3,0-5.4-2.4-5.4-5.4c0-3,2.4-5.4,5.4-5.4C13.6,24.2,16.1,26.6,16.1,29.6 M10.6,16
		c-3,0-5.4-2.4-5.4-5.4c0-3,2.4-5.4,5.4-5.4c3,0,5.4,2.4,5.4,5.4C16.1,13.6,13.6,16,10.6,16"
        />
      </g>
    </svg>
    <feather-icon
      v-else
      size="21"
      :icon="`${isDark ? 'Sun' : 'DollarSign'}Icon`"
    />
  </b-nav-item>
</template>

<script>
import useAppConfig from '@core/app-config/useAppConfig'
import { computed } from '@vue/composition-api'
import { BNavItem } from 'bootstrap-vue'

export default {
  components: {
    BNavItem,
  },
  setup() {
    const { currency } = useAppConfig()

    const isDark = computed(() => currency.value === 'usd')

    return { currency, isDark }
  },
}
</script>
        <style type="text/css">
.st0 {
  fill: #181ea9;
  margin-left: 5px;
}
</style>
