import api from '@/plugins/api';

export default {
  namespaced: true,
  state: () => ({
    items: [],
    count: 0,
  }),
  mutations: {
    setApiData(state, data) {
      state.items = data.results;
      state.count = data.count;
    },
  },
  actions: {
    async fetchItems(ctx, { filters, pagination }) {
      try {
        const res = await api.get('/api/appeals/v1.0/appeals', {
          params: {
            search: filters?.search || undefined,
            premise_id: filters?.premiseId || undefined,
            page_size: pagination?.pageSize || undefined,
            page: pagination?.page || undefined,
          },
        });

        ctx.commit('setApiData', res.data);
      } catch (err) {
        console.log('err: ', err);

        ctx.dispatch('notices/showError', '', {
          root: true,
        });
      }
    },
  },
};
