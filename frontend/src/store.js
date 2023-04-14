import { createApp } from 'vue';
import Vuex from 'vuex';

const app = createApp({});

app.use(Vuex);

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
  },
  mutations: {
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
  },
});

export default store;
