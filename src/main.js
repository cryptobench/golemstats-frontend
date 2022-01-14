import { createApp } from "vue"
import App from "./App.vue"
import "./assets/tailwind.css"
import router from "./router"
import VueApexCharts from "vue3-apexcharts"
import SmartTable from 'vuejs-smart-table'


createApp(App).use(router).use(VueApexCharts).use(SmartTable, {
    sortHeaderClass: 'bg-gray-900 py-24 sticky top-0 z-10 w-full',
  }).mount("#app")
