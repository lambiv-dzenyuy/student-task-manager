import MainLayoutVue from 'layouts/MainLayout.vue';
import IndexPageVue from 'src/pages/project-tasks.vue';
import Dashboard from 'src/pages/dashboard.vue';
import projects from 'pages/projects.vue';
import ProjectTasks from 'pages/project-tasks.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {

    path: '/view',
    component: MainLayoutVue ,
    children: [{name: 'dashboard',  path: '', component: Dashboard },
               {name : 'projects',path : 'projects', component : projects},
               {name : 'project-tasks',path : 'project-tasks/:projectId/:projectTitle', component : ProjectTasks}],
  },
  { path: '/',
  component:  () => import('layouts/auth-layout.vue'),
  children: [{ name: 'login', path: '', component: () => import('pages/login.vue') },
  { name: 'signup', path: 'signup', component: () => import('pages/signup.vue') }
],
 },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
