import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate"; // User For Saving VuexStore To LocalStorage


import {
  adminLogin,
  givenFeedbackUserList,
  getFeedbackOfSingleUser
} from '../service/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminDetails : {
      name: 'abcd',
      isloggedIn: localStorage.getItem('isloggedIn'),
    }
  },
  mutations: {
    setLoggedInStatus(state, payload){
      // console.log(payload.isloggedIn)
      state.adminDetails.isloggedIn = payload.isloggedIn;
      localStorage.setItem('isloggedIn', payload.isloggedIn)
    }
  },
  actions: {
    Login: ({commit}, payload) => {
      return adminLogin(payload).then(async(response) =>{
        let obj = {};
        obj.isloggedIn = true;
        await commit('setLoggedInStatus', obj)
        return response;
      })
    },
    Logout: ({ commit }) =>{
      let obj = {};
      obj.isloggedIn = false;
      commit('setLoggedInStatus', obj)
    },
    GivenFeedbackUserList: ()=>{
      return givenFeedbackUserList().then(async(response)=>{
        return response;
      })
    },
    SingleUserFeedback: (context, conversationId)=>{
      return getFeedbackOfSingleUser(conversationId).then(async(response)=>{
        return response;
      })
    }
    
  },
  modules: {
  }
})
