import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/node/:id',
      name: 'node',
      component: () => import('@/views/Node.vue'),
    },
    {
      path: '/graphs/live',
      name: 'livegraphs',
      component: () => import('@/views/LiveGraphs.vue'),
    },
    {
      path: '/graphs/historical',
      name: 'historical',
      component: () => import('@/views/HistoricalGraphs.vue'),
    },
    {
      path: '/operator',
      name: 'operator',
      component: () => import('@/views/Operator.vue'),
    },
    {
      path: '/operator/:id',
      name: 'operatordetailed',
      component: () => import('@/views/Operatordetailed.vue'),
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('@/views/Market.vue'),
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: 'https://docs.stats.golem.network',
      name: 'stats-docs',
      beforeEnter() {
        window.open('https://docs.stats.golem.network', '_blank')
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
