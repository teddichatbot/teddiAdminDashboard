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

