<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      Golem Network Stats
    </span>

    <span class="float-md-right d-none d-md-block"
      >Send feature requests to Phillip#9780 on
      <a target="_blank" href="https://chat.golem.network">Discord</a>
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
