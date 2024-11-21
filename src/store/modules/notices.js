export default {
  namespaced: true,
  state: () => ({
    isShow: false,
    type: undefined,
    message: undefined,
  }),
  mutations: {
    setNotice(state, data) {
      state.isShow = true;
      state.type = data.type;
      state.message = data.message;
    },
    clearNotice(state) {
      state.isShow = false;
      state.type = undefined;
      state.message = undefined;
    },
  },

  actions: {
    showError(ctx, message) {
      ctx.commit('setNotice', {
        type: 'error',
        message,
      });

      setTimeout(() => {
        ctx.commit('clearNotice');
      }, 4000);
    },
  },
};
