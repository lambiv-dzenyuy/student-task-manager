import MainLayoutVue from 'layouts/MainLayout.vue';
import IndexPageVue from 'pages/IndexPage.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayoutVue ,
    children: [{ path: '', component: IndexPageVue }],
  },
  { path: '/auth',
  component:  () => import('layouts/auth-layout.vue'),
  children: [{ path: '', component: () => import('pages/login.vue') }],
 },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
