import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/network/providers/online",
    name: "providers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Providers.vue"),
  },
  {
    path: "/network/live",
    name: "LiveGraphs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/LiveGraphs.vue"),
  },
  {
    path: "/network/provider/pricing",
    name: "ProviderPricing",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/provider/pricing.vue"),
  },
  {
    path: "/network/historical",
    name: "Historical",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Historical.vue"),
  },
  {
    path: "/network/provider/:id",
    name: "node",
    component: () => import("@/views/Providerdetailed.vue"),
  },
  {
    path: "/network/providers/lookup/operator/",
    name: "operatorsearch",
    component: () => import("@/views/Operatorsearch.vue"),
  },
  {
    path: "/network/providers/lookup/node/",
    name: "nodesearch",
    component: () => import("@/views/Nodesearch.vue"),
  },
  {
    path: "/network/requestor",
    name: "requestor",
    component: () => import("@/views/Requestor.vue"),
  },
  {
    path: "/network/providers/operator/:id",
    name: "operatordetailed",
    component: () => import("@/views/Operatordetailed.vue"),
  },
  // {
  //   path: "/thorg",
  //   name: "thorg",
  //   component: () => import("@/views/Thorg.vue"),
  // },
  // {
  //   path: "/thorg/provider/:id",
  //   name: "thorgnode",
  //   component: () => import("@/views/Thorgnode.vue"),
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
