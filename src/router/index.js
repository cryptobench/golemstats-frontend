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
    path: "/node/:id",
    name: "node",
    component: () => import("@/views/Providerdetailed.vue"),
  },
  {
    path: "/operator/",
    name: "operatorsearch",
    component: () => import("@/views/Operatorsearch.vue"),
  },
  {
    path: "/node/",
    name: "nodesearch",
    component: () => import("@/views/Nodesearch.vue"),
  },
  {
    path: "/operator/:id",
    name: "operatordetailed",
    component: () => import("@/views/Operatordetailed.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
