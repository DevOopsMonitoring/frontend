import Vue from 'vue';
import Router from 'vue-router';
import Ping from '@/components/Ping';
import Servers from '@/components/Servers';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
    {
      path: '/',
      name: 'Servers',
      component: Servers,
    },
  ],
  mode: 'history',
});