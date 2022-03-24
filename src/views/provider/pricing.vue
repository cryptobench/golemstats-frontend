<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8 z-10 relative">
    <div class="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div class="lg:col-span-12 -mb-4 -mt-4">
        <h1 class="text-2xl font-medium dark:text-gray-300">Pricing Analytics</h1>
      </div>
      <div class="lg:col-span-6">
        <Pricinghistorical
          :endpoint="'network/historical/pricing/median'"
          :title="'Median Pricing'"
          :palette="['#FFED29', '#FF5289', '#00096B']"
          :allDataPoints="false"
          :paragraph="'The past week'"
          :annotations="false"
          >/</Pricinghistorical
        >
      </div>
      <div class="lg:col-span-6">
        <h1 class="text-2xl mt-5 font-medium dark:text-gray-300">Live Median Pricing</h1>
        <MedianLive>/</MedianLive>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Stats from "@/components/Stats.vue"
import MedianLive from "@/components/pricing/median.vue"
import Pricinghistorical from "@/components/Pricinghistorical.vue"

export default {
  name: "LiveGraphs",
  components: {
    MedianLive,
    Stats,
    Pricinghistorical,
  },
  created() {
    this.fetchData()
  },
  data() {
    return {
      intelcount: 0,
      amdcount: 0,
      thirdtypecpu: 0,
      x86_64: 0,
      Aarch64: 0,
      vendorlist: [],
      architecturelist: [],
      chartOptions: {
        chart: {
          id: "Vendor-donut",
          type: "donut",
          zoom: {
            autoScaleYaxis: true,
          },
        },
        labels: ["Intel", "AMD", "Other"],
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "HH:mm:ss",
            formatter: undefined,
          },
        },
        dataLabels: {
          enabled: true,
        },
        colors: ["#0000F9", "#d2090a", "#8b07cd"],
        markers: {
          size: 0,
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 0,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 90, 100],
          },
        },
      },
    }
  },
  methods: {
    fetchData() {
      this.intelcount = 0
      this.amdcount = 0
      this.thirdtypecpu = 0
      this.vendorlist.length = 0
      this.Aarch64 = 0
      this.x86_64 = 0
      this.architecturelist.length = 0
      this.axios.get("network/online").then((response) => {
        const apiResponse = response.data
        apiResponse.forEach((obj) => {
          if (obj.data["golem.inf.cpu.vendor"]) {
            if (obj.data["golem.inf.cpu.vendor"] == "GenuineIntel") {
              this.intelcount++
            } else if (obj.data["golem.inf.cpu.vendor"] == "AuthenticAMD") {
              this.amdcount++
            } else {
              this.thirdtypecpu++
            }
          }
          if (obj.data["golem.inf.cpu.architecture"]) {
            if (obj.data["golem.inf.cpu.architecture"] == "x86_64") {
              this.x86_64++
            } else if (obj.data["golem.inf.cpu.architecture"] == "aarch64") {
              this.Aarch64++
            }
          }
        })
        this.vendorlist.push(this.intelcount, this.amdcount, this.thirdtypecpu)
        this.architecturelist.push(this.x86_64, this.Aarch64)
      })
    },
  },
}
</script>
<style>
.apexcharts-text,
.apexcharts-pie-label {
  @apply font-sans !important;
}
</style>
