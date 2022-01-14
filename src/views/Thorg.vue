<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
    <Providerslist class="mb-6 mt-6">/</Providerslist>
  </div>
</template>

<script>
// @ is an alias to /src
import Providerslist from "@/components/thorg/Providerslist.vue"

export default {
  name: "Home",
  components: {
    Providerslist,
  },
}
</script>
<style>
.golembadge,
.golemgradient {
  background: linear-gradient(270deg, rgba(255, 6, 151, 0.8) 1.26%, rgba(0, 108, 255, 0.8) 51.88%, rgba(0, 255, 215, 0.8) 97.6%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

body,
.golemnav {
  @apply bg-thorg;
  @apply dark:bg-thorg;
}

tbody {
  @apply bg-thorg;
  @apply text-white;
}

.golemtext {
  @apply text-white;
}

.golemtr {
  @apply rounded-l-lg;
  @apply rounded-r-lg;
  box-shadow: 10px 2px 10px rgba(6, 208, 186, 0.3);
  -webkit-box-shadow: 0px 2px 10px rgba(6, 208, 186, 0.3);
  -moz-box-shadow: 0px 2px 10px rgba(6, 208, 186, 0.3);
}
.golemtr:hover {
  @apply bg-blue-900;
}

thorgcolumn:hover {
  @apply bg-blue-900 !important;
}

.golemring {
  @apply border-gray-600;
}

.githubicon,
.thorgmail {
  @apply text-white;
}

.thorg-footer-text {
  @apply text-gray-200;
}

thead {
  background: linear-gradient(270deg, rgba(255, 6, 151) 1.26%, rgba(0, 108, 255) 51.88%, rgba(0, 255, 215) 97.6%);
  background-attachment: fixed;
}

.footerthorg {
  @apply bg-thorg;
  @apply dark:bg-thorg;
}
</style>
