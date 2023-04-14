import { createStore } from 'vuex';

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
      // If you have a token stored, remove it here
      // localStorage.removeItem('token');
    },
  },
});

export default store;