<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8 z-10 relative">
    <Providerslist class="mb-6 mt-6">/</Providerslist>
  </div>
</template>

<script>
// @ is an alias to /src
import Providerslist from "@/components/Providerslist.vue"

export default {
  name: "Home",
  components: {
    Providerslist,
  },
}
</script>
