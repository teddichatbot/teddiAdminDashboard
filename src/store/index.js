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
  updateRandomMsg,
  getFAQListByChapterName,
  addFaq,
  updateFaq,
  searchFaq,
  deleteFaq,
  getAllPostcodes,
  uploadPostcodes,
  getAllPostcodeFiles,
  getPostcodesByFileName,
  deleteFileWithPostcodes,
  addPostcode,
  getSinglePostcode,
  getUserListByPostcode,
  getFeedbackExport,
  deleteSinglePostcode,
  updateUserName
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
    GetFaqListByChapterName: (context, chapterName)=>{
      return getFAQListByChapterName(chapterName).then(async(response)=>{
        return response;
      })
    },
    AddFaq: (context, payload)=>{
      return addFaq(payload).then(async(response)=>{
        return response;
      })
    },
    UpdateFaq: (context, payload)=>{
      return updateFaq(payload).then(async(response)=>{
        return response;
      })
    },
    SearchFaq: (context, question)=>{
      let payload = {
        faq: question
      }
      return searchFaq(payload).then(async(response)=>{
        return response;
      })
    },
    DeleteFaq: (context, faqId)=>{
      return deleteFaq(faqId).then(async(response)=>{
        return response;
      })
    },
    GetAllPostcodes: ()=>{
      return getAllPostcodes().then(async(response)=>{
        return response;
      })
    },
    UploadPostcodes: (context, payload)=>{
      return uploadPostcodes(payload).then(async(response)=>{
        return response;
      })
    },
    GetAllPostcodeFiles: ()=>{
      return getAllPostcodeFiles().then(async(response)=>{
        return response;
      })
    },
    GetPostcodesByFileName: (context, fileName)=>{
      return getPostcodesByFileName(fileName).then(async(response)=>{
        return response;
      })
    },
    DeleteFileWithPostcodes: (context, fileName)=>{
      return deleteFileWithPostcodes(fileName).then(async(response)=>{
        return response;
      })
    },
    GetSinglePostcode: (context, itemName)=>{
      return getSinglePostcode(itemName).then(async(response)=>{
        return response;
      })
    },
    AddPostcode: (context, payload)=>{
      return addPostcode(payload).then(async(response)=>{
        return response;
      })
    }, 
    GetUserListByPostcode: (context, itemName)=>{
      return getUserListByPostcode(itemName).then(async(response)=>{
        return response;
      })
    },
    GetFeedbackExport: (context, payload)=>{
      return getFeedbackExport(payload).then(async(response)=>{
        return response;
      })
    }, 
    DeleteSinglePostcode: (context, postcodeId)=>{
      return deleteSinglePostcode(postcodeId).then(async(response)=>{
        return response;
      })
    }, 
    UpdateUserName: (context, payload)=>{
      return updateUserName(payload).then(async(response)=>{
        return response;
      })
    }, 
  },
  modules: {
  }
})
