<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8 z-10 relative">
    <div class="grid gap-5 grid-cols-12">
      <div class="col-span-12 mt-4 -mb-2">
        <h1 class="text-2xl font-medium dark:text-gray-300">Historical Statistics</h1>
      </div>
      <div class="col-span-12">
        <statsovertime>/</statsovertime>
      </div>
      <div class="col-span-12 lg:col-span-6 md:col-span-6">
        <Pricinghistorical
          :endpoint="'network/historical/pricing/median'"
          :title="'Provider Median Pricing'"
          :palette="['#FFED29', '#FF5289', '#00096B']"
          :allDataPoints="true"
          :annotations="true"
          >/</Pricinghistorical
        >
      </div>
      <div class="col-span-12 lg:col-span-6 md:col-span-6">
        <Pricinghistorical
          :endpoint="'network/historical/pricing/average'"
          :title="'Provider Average Pricing'"
          :palette="['#FFED29', '#FF5289', '#00096B']"
          :allDataPoints="true"
          :annotations="true"
          >/</Pricinghistorical
        >
      </div>
      <div class="col-span-12 lg:col-span-6">
        <Computinghistorical
          :endpoint="'network/historical/provider/computing'"
          :title="'Providers computing simultaneously'"
          :colors="'#0230FF'"
          class="mb-6"
        >
        </Computinghistorical>
      </div>
      <div class="col-span-12 lg:col-span-6 md:col-span-12">
        <newestproviders> </newestproviders>
      </div>
      <div class="col-span-12 lg:col-span-12">
        <Networkversions class="mb-6"> </Networkversions>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import statsovertime from "@/components/Statsovertime.vue"
import Pricinghistorical from "@/components/Pricinghistorical.vue"
import Computinghistorical from "@/components/Computinghistorical.vue"
import newestproviders from "@/components/newestproviders.vue"
import Networkversions from "@/components/Networkversions.vue"

export default {
  name: "Home",
  components: {
    statsovertime,
    Pricinghistorical,
    Computinghistorical,
    newestproviders,
    Networkversions,
  },
}
</script>
