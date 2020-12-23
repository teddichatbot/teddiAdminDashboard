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
export function getFAQListByChapterName(chapterName){
    return axios.get(BASE_URL+'chapterFaq/faqListByChapterName?chapterName='+chapterName)            
}
export function addFaq(payload){
    return axios.post(BASE_URL+'chapterFaq/addChapterWiseFaq',payload)            
}
export function updateFaq(payload){
    return axios.put(BASE_URL+'chapterFaq/updateChapterwiseFaq',payload)            
}
export function searchFaq(payload){
    return axios.post(BASE_URL+'chapterFaq/checkFaqBySelectiveWords',payload)            
}
export function deleteFaq(faqId){
    return axios.delete(BASE_URL+'chapterFaq/deleteSignleFaq?faqId='+faqId)            
}
export function getAllPostcodes(){
    return axios.get(BASE_URL+'postcodes/getAllPostcodes')            
}
export function uploadPostcodes(payload){
    return axios.post(BASE_URL+'postcodes/addBulkPostcodes',payload)            
}
export function getAllPostcodeFiles(){
    return axios.get(BASE_URL+'postcodes/getAllPostcodeFiles')            
}
export function getPostcodesByFileName(fileName){
    return axios.get(BASE_URL+'postcodes/getAllPostcodesByFile?location='+fileName)            
}
export function deleteFileWithPostcodes(fileName){
    return axios.delete(BASE_URL+'postcodes/deleteFileWithPostcodes?location='+fileName)            
}
export function addPostcode(payload){
    return axios.post(BASE_URL+'postcodes/addPostcode',payload)            
}
export function getSinglePostcode(itemName){
    return axios.get(BASE_URL+'postcodes/getSinglePostcodeDetails?postcode='+itemName)            
}
export function getUserListByPostcode(itemName){
    return axios.get(BASE_URL+'users/getUsersListByPostcode?zip_code='+itemName)            
}
export function getFeedbackExport(payload){
    return axios.post(BASE_URL+'feedback/getFeedbacklistForExporting',payload)            
}
export function deleteSinglePostcode(postcodeId){
    return axios.delete(BASE_URL+'postcodes/deletePostcode?postcodeId='+postcodeId)            
}
export function updateUserName(payload){
    return axios.post(BASE_URL+'users/setName',payload)            
}
