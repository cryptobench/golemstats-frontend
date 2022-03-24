<template>
  <div class="relative w-full">
    <div class="hidden lg:block lg:absolute h-full w-full overflow-x-hidden" aria-hidden="true">
      <svg class="absolute w-full test z-0" width="100%" height="100%" fill="none">
        <defs>
          <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="2" height="2" class="text-gray-200 dark:text-gray-800" fill="currentColor" />
          </pattern>
        </defs>
        <rect class="w-full" width="100%" height="100%" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
      </svg>
    </div>
    <Nav></Nav>
    <div class="container mx-auto">
      <router-view />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "Home",
  components: {
    Nav,
    Footer,
  },
}
</script>
<style>
.test {
  animation: move_wave 15s infinite;
}
@keyframes move_wave {
  0% {
    transform: scale(1.1);
  }
  15% {
    transform: scale(1.2);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}
body {
  @apply bg-gray-100;
  @apply dark:bg-gray-900;
}
.apexcharts-text,
.apexcharts-pie-label {
  @apply font-sans !important;
}
@media (prefers-color-scheme: dark) {
  html.dark #apexchartsareaxdatetime,
  html.dark .apexcharts-text tspan,
  html.dark .apexcharts-yaxis-title-text,
  html.dark .apexcharts-legend-text,
  html.dark .apexcharts-legend-series .apexcharts-legend-text,
  html.dark .apexcharts-xaxistooltip,
  html.dark .apexcharts-yaxistooltip,
  html.dark .apexcharts-tooltip,
  html.dark .apexcharts-point-annotations,
  html.dark .apexcharts-legend-text span,
  html.dark .apexcharts-yaxis-title {
    fill: theme("colors.gray.400");
    @apply text-gray-400 !important;
    @apply font-sans !important;
  }

  html.dark .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title,
  html.dark .apexcharts-tooltip.apexcharts-theme-light,
  html.dark .apexcharts-xaxistooltip {
    @apply font-sans !important;
    @apply rounded-lg !important;
    @apply bg-gray-200;
    background: theme("colors.gray.800") !important;
    border: 1px solid theme("colors.gray.600") !important;
  }
}
</style>
