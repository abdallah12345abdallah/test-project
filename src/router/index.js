import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'New WearHouse Page',
      component: () => import('@/pages/NewWearHousePage.vue'),
      meta: { layout: 'dashboard' },
    },
  ],
})

export default router
