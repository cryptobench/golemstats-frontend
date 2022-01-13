<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
    <Providerdetailed class="mb-6 mt-6">/</Providerdetailed>
  </div>
</template>

<script>
// @ is an alias to /src
import Providerdetailed from "@/components/thorg/Providerdetailed.vue"

export default {
  name: "Home",
  components: {
    Providerdetailed,
  },
}
</script>
<style>
body,
.golemnav {
  @apply bg-thorg;
  @apply dark:bg-thorg;
}

.golemgradient {
  background: linear-gradient(270deg, rgba(255, 6, 151, 0.8) 1.26%, rgba(0, 108, 255, 0.8) 51.88%, rgba(0, 255, 215, 0.8) 97.6%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: block;
}

tbody {
  @apply bg-thorg;
  @apply text-white;
}
.thorg-footer-text {
  @apply text-gray-200;
}
.footerthorg {
  @apply bg-thorg;
  @apply dark:bg-thorg;
}

.golemtext {
  @apply text-white;
}

.githubicon,
.thorgmail {
  @apply text-white;
}

.golemtr {
  @apply rounded-l-lg;
  @apply rounded-r-lg;
  box-shadow: 0px 2px 10px rgba(6, 208, 186, 0.3);
}
.golemshadow {
  box-shadow: 0px 2px 10px rgba(6, 208, 186, 0.3);
}

.golemtr:hover {
  @apply bg-thorg;
}
.golemring {
  @apply border-gray-600;
}

thead {
  background: linear-gradient(270deg, rgba(255, 6, 151) 1.26%, rgba(0, 108, 255) 51.88%, rgba(0, 255, 215) 97.6%);
}
</style>
