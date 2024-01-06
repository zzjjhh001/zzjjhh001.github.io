import { createRouter, createWebHistory } from 'vue-router'
import DiskView from '../views/Disk/index';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/disk'
    },
    {
      path: '/disk',
      name: 'disk',
      component: DiskView
    },
  ]
})

export default router
