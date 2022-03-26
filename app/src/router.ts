import { createRouter, createWebHistory } from 'vue-router';
import Captain from './pages/Captain.vue';
import CaptainList from './pages/CaptainList.vue';
import CaptainSummary from './pages/CaptainSummary.vue';

import Home from './pages/Home.vue';
import Roll from './pages/Roll.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          alias: '/',
          name: 'Record',
          component: CaptainList
        },
        {
          path: '/summary',
          name: 'Summary',
          component: CaptainSummary
        },
        {
          path: '/roll',
          name: 'Roll',
          component: Roll
        },
        {
          path: '/:year/:month/:day',
          name: 'RecordDay',
          component: CaptainList
        }
      ]
    },
    {
      path: '/captain/:user',
      name: 'Captain',
      component: Captain
    }
  ]
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   } else {
  //     return { top: 0 };
  //   }
  // }
});
