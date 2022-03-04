import { createApp } from "vue"
import App from "./App.vue"
import "./assets/tailwind.css"
import router from "./router"
import VueApexCharts from "vue3-apexcharts"
import SmartTable from "vuejs-smart-table"
import axios from "axios"
import VueAxios from "vue-axios"

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

createApp(App)
  .use(router)
  .use(VueApexCharts)
  .use(VueAxios, axios) // 👈
  .use(SmartTable, {
    hideSortIcons: true,
  })
  .mount("#app")
