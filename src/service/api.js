import {BASE_URL} from '../config/env'
const axios = require('axios');

export function adminLogin(payload){
    return axios.post(BASE_URL+'admin/login',payload)
                
}
