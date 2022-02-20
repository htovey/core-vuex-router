import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
    profile: {},
    adminId: '',
    itemList: [],
  },
  mutations: {
    logout: (state) => {
      state.userToken = '';
      state.profile = {};
      state.adminId = '';
    },
    login: (state, token) => {
      window.localStorage.setItem('token', token);
      state.userToken = token;
    }
  },
  actions: {
    login: ({commit}, token) => {
      commit('login', token);
    },
  },
  modules: {
  },
  getters: { token(state) { return state.userToken  || window.localStorage.getItem('token')}},
})
