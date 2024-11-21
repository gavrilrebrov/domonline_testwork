import api from '@/plugins/api';

export default {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  mutations: {
    setItems(state, data) {
      state.items = data;
    },
  },
  actions: {
    async fetchItems(ctx, { search }) {
      try {
        const res = await api.get('/api/geo/v2.0/user-premises', {
          params: {
            search: search || undefined,
          },
        });

        ctx.commit('setItems', res.data.results);
      } catch (err) {
        ctx.dispatch('notices/showError', '', {
          root: true,
        });
      }
    },
  },
};
