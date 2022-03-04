<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
    <Stats class="mb-6">/</Stats>
    <providerstats
      :provider_title="online + ' Providers'"
      :cores_title="threads + ' Cores'"
      :memory_title="memory + ' TB Memory '"
      :disk_title="disk + ' TB Disk'"
      class="mb-6"
    ></providerstats>
    <Utilization class="mb-12"></Utilization>
  </div>
</template>

<script>
// @ is an alias to /src
import Stats from "@/components/Stats.vue"
import providerstats from "@/components/6hstats.vue"
import Utilization from "@/components/NetworkUtilization.vue"
export default {
  name: "Home",
  components: {
    Stats,
    Utilization,
    providerstats,
  },
  data() {
    return {
      online: "",
      cores: "",
      threads: "",
      memory: "",
      disk: "",
      avgcores: "",
      avgmemory: "",
      avgdisk: "",
    }
  },
  created() {
    this.generalstats()
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      const d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    generalstats() {
      this.axios.get("network/online/stats").then((response) => {
        const apiResponse = response.data
        this.online = apiResponse.online
        this.cores = apiResponse.cores
        this.threads = apiResponse.threads
        this.memory = this.floorFigure(apiResponse.memory / 1024)
        this.disk = this.floorFigure(apiResponse.disk / 1024)
        this.avgcores = this.floorFigure(apiResponse.threads / apiResponse.online)
        this.avgmemory = this.floorFigure(apiResponse.memory / apiResponse.online)
        this.avgdisk = this.floorFigure(apiResponse.disk / apiResponse.online)
      })
    },
  },
}
</script>
