import MainLayoutVue from 'layouts/MainLayout.vue';
import Tasks from 'src/pages/tasks.vue';
import projects from 'pages/projects.vue';
import Login from 'pages/login.vue';
import ProjectTasks from 'pages/project-tasks.vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/view',
    component: MainLayoutVue,
    children: [

      { name: 'projects', path: 'projects', component: projects },
      { name: 'tasks', path: 'tasks', component: Tasks },
      {
        name: 'project-tasks',
        path: 'project-tasks/:projectId/:projectTitle',
        component: ProjectTasks
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/auth-layout.vue'),
    children: [
      { name: 'login', path: '', component: Login },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('pages/signup.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
