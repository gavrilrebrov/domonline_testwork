import Vue from 'vue';
import VueRouter from 'vue-router';

import AppealsView from '../views/AppealsView.vue';
import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'appeals',
      component: AppealsView,
      meta: {
        auth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuth = !!localStorage.getItem('authToken');

  if (to.matched.some((record) => record.meta.auth)) {
    if (!isAuth) {
      return next({
        name: 'login',
      });
    }
  }

  return next();
});

export default router;
