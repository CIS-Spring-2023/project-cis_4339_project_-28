import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state: {
    isAuthenticated: false,
    role: '',
  },
  mutations: {
    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    logout({ commit }) {
      commit('setIsAuthenticated', false);
      commit('setRole', '');
    },
  },
  plugins: [createPersistedState()],
});

export default store;
