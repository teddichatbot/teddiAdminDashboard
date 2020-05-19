import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"; // User For Saving VuexStore To LocalStorage


import {adminLogin} from '../service/api'

Vue.use(Vuex)

export default new Vuex.Store({
plugins: [createPersistedState()],
strict: process.env.NODE_ENV === "development",
  state: {
    adminDetails : {
      name: 'name1',
      email : 'email1',
      token : 'token1'
    }
  },
  mutations: {
  },
  actions: {
    Login: (state, payload) => {
      return adminLogin(payload)
   },
    
  },
  modules: {
  }
})
