<template>
  <b-nav-item @click="currency = isDark ? 'glm' : 'usd'">
    <span v-if="isDark">Change currency to GLM</span>
    <span v-else>Change currency to USD</span>
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
