import {BASE_URL} from '../config/env'
const axios = require('axios');

export function adminLogin(payload){
    return axios.post(BASE_URL+'admin/login',payload)            
}
export function givenFeedbackUserList(){
    return axios.get(BASE_URL+'feedback/giveFeedbackUserList')            
}
export function getFeedbackOfSingleUser(conversationId){
    return axios.get(BASE_URL+'feedback/getFeedbackByUser/'+conversationId)            
}
export function getAllUserList(){
    return axios.get(BASE_URL+'users/getUsersList')            
}
export function getUserChatHistory(payload){
    return axios.post(BASE_URL+'chat/chatHistory',payload)            
}
export function getRandomMsgListByChapterName(chapterName){
    return axios.get(BASE_URL+'randomMsg/msgListByChapter?chapterType='+chapterName)            
}
export function addRandomMsg(payload){
    return axios.post(BASE_URL+'randomMsg/addRandomMsg',payload)            
}
export function updateRandomMsg(payload){
    return axios.post(BASE_URL+'randomMsg/UpdateRandomMsg',payload)            
}
