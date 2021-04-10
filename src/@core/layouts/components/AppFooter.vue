<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      Golemstats - Alpha version
    </span>

    <span class="float-md-right d-none d-md-block"
      >Send feature requests to Phillip on
      <a href="chat.golem.network">Discord</a>
      <feather-icon
        icon="SmileIcon"
        size="21"
        class="text-success stroke-current"
      />
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
