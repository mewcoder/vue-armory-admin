import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about/index.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/table/index.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/form/index.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/list/index.vue')
    }
  ]
});

export default router;
