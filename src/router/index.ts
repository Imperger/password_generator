import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Generator from '@/views/Generator.vue';
import TemplateBuilder from '@/views/TemplateBuilder.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/template/new',
    name: 'CreateTemplate',
    component: TemplateBuilder
  },
  {
    path: '/template/:id',
    name: 'EditTemplate',
    component: TemplateBuilder
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
