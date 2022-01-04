import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken: '',
    profile: {},
    adminId: ''
  },
  mutations: {
    logout: (state) => {
      state.userToken = '';
      state.profile = {};
      state.adminId = '';
    }
  },
  actions: {
  },
  modules: {
  }
})
