import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate"; // User For Saving VuexStore To LocalStorage


import {
  adminLogin,
  givenFeedbackUserList,
  getFeedbackOfSingleUser,
  getAllUserList,
  getUserChatHistory,
  getRandomMsgListByChapterName,
  addRandomMsg,
  updateRandomMsg
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
    },
    GetAllUserList: ()=>{
      return getAllUserList().then(async(response)=>{
        return response;
      })
    },
    GetUserChatHistory: (context, payload)=>{
      return getUserChatHistory(payload).then(async(response)=>{
        return response;
      })
    },
    GetRandomMsgListByChapterName: (context, chapterName)=>{
      return getRandomMsgListByChapterName(chapterName).then(async(response)=>{
        return response;
      })
    },
    AddRandomMsg: (context, payload)=>{
      return addRandomMsg(payload).then(async(response)=>{
        return response;
      })
    },
    UpdateRandomMsg: (context, payload)=>{
      return updateRandomMsg(payload).then(async(response)=>{
        return response;
      })
    },
  },
  modules: {
  }
})
