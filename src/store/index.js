import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import notices from './modules/notices';
import appeals from './modules/appeals';
import premises from './modules/premises';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    notices,
    appeals,
    premises,
  },
});
