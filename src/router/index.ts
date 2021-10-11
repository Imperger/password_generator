import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Generator from '@/views/Generator.vue';
import Settings from '@/views/Settings.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
