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
      meta: {
        pageTitle: 'Overview',
        breadcrumb: [
          {
            text: 'Mainnet + Testnet',
            active: true,
          },
        ],
      },
    },
    {
      path: '/node/:id',
      name: 'node',
      component: () => import('@/views/Node.vue'),
      meta: {
        pageTitle: 'Provider Node',
      },
    },
    {
      path: '/market',
      name: 'market',
      component: () => import('@/views/Market.vue'),
      meta: {
        pageTitle: 'GLM Market',
      },
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
