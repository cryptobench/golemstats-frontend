<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8">
    <h1 class="text-2xl mb-2 font-medium  mt-6 dark:text-gray-300">
      Node Lookup <span class="text-sm font-medium text-gray-400">{{this.$route.params.id}}</span>
    </h1>
    <div
      class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 bg-white dark:bg-gray-800 px-4 py-6 mb-6 sm:px-6 shadow rounded-lg overflow-hidden"
    >
      <div class="col-span-12">
        <h1 class="text-2xl mb-2 font-medium dark:text-gray-300">Search Node</h1>
      </div>
      <div class="col-span-12 ">
        <label for="name" class="block text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Yagna ID</label>
        <input
          name="name"
          id="name"
          v-on:keyup.enter="find_node"
          v-model="wallet"
          placeholder="0x..."
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 w-full  block  sm:text-sm border-2 border-gray-100 rounded-md"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"


export default {
  components: {
  },

  data() {
    return {
      wallet: '',
    }
  },
 methods: {

    find_node() {
      axios.get('https://api.stats.golem.network/v1/provider/wallet/' + this.wallet).then((response) => {
        this.$router.push({
          name: 'operatordetailed',
          params: { id: this.wallet },
        })
      })
    },
}
}
</script>
