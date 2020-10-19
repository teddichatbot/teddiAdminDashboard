const VUE_APP_SERVER_ENV = process.env.VUE_APP_SERVER_ENV? process.env.VUE_APP_SERVER_ENV : 'DEV';
// console.log("VUE_APP_SERVER_ENV",VUE_APP_SERVER_ENV)
const BASE_URL = (VUE_APP_SERVER_ENV == 'DEV')?'https://teddinodeapp.azurewebsites.net/':'https://teddibackend.azurewebsites.net/';
// console.log("BASE_URL",BASE_URL)
const config = {
    'BASE_URL' : BASE_URL,
    'API_KEY' : ''
}
module.exports = config;