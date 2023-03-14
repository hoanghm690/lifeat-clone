import { createRouter, createWebHistory } from 'vue-router'
import AppView from '../views/AppView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: { name: 'App' }
    },
    {
      path: '/app',
      name: 'App',
      component: AppView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
