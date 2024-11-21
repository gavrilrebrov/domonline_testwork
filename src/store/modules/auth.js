import api from '@/plugins/api';
import router from '@/router';

export default {
  namespaced: true,
  state: () => ({
    user: undefined,
  }),
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
  },
  actions: {
    async login(ctx, creds) {
      try {
        const res = await api.post('/api/auth/login', creds);

        ctx.commit('setUser', res.data.employee_id);
        localStorage.setItem('authToken', res.data.key);

        router.push('/');
      } catch (err) {
        ctx.dispatch('notices/showError', 'Неправильные данные', {
          root: true,
        });
      }
    },
  },
};
