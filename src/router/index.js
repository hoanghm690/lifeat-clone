import { createRouter, createWebHistory } from 'vue-router'
import AppView from '../views/AppView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-route',
      redirect: { name: 'app-route' }
    },
    {
      path: '/app',
      name: 'app-route',
      component: AppView
    }
  ]
})

export default router
