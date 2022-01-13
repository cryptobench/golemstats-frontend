<template>
  <div>
    <Nav></Nav>
    <div class="container mx-auto ">
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
body {
  @apply bg-gray-200;
  @apply dark:bg-gray-900;
}
.apexcharts-text,
.apexcharts-pie-label {
  @apply font-sans !important;
}
@media (prefers-color-scheme: dark) {
  html.dark #apexchartsareaxdatetime,
  html.dark .apexcharts-text tspan,
  html.dark .apexcharts-text,
  html.dark .apexcharts-yaxis-title-text,
  html.dark .apexcharts-legend-text,
  html.dark .apexcharts-legend-series .apexcharts-legend-text,
  html.dark .apexcharts-xaxistooltip,
  html.dark .apexcharts-yaxistooltip,
  html.dark .apexcharts-point-annotations,
  html.dark .apexcharts-legend-text span {
    fill: theme("colors.gray.400");
    @apply text-gray-400 !important;
  }
  html.dark .apexcharts-tooltip,
  html.dark .apexcharts-theme-light,
  html.dark .apexcharts-active,
  html.dark .apexcharts-tooltip-title {
    @apply bg-gray-800;
  }
  html.dark .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title,
  html.dark .apexcharts-tooltip.apexcharts-theme-light,
  html.dark .apexcharts-xaxistooltip {
    @apply rounded-lg !important;
    @apply bg-gray-800;
    background: theme("colors.gray.900") !important;
    border-bottom: 1px solid theme("colors.gray.900") !important;
  }
}
</style>
