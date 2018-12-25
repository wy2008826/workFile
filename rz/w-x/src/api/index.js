import Vue from 'vue'
import VueResource from 'vue-resource'
import store from '@/store/store.js'
import api from './api'
import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

Vue.use(VueResource)

function http(url,param={},type){
    param.loginfrom = 'wap'
    if(!param.token){//app调用的H5页面会在页面内传递token
        param.token = store.state.info.token
    }
    return new Promise((resolve,reject) => {
        Vue.http({
            url: url,
            params: param,
            method: type,
        }).then((response) => {
            const {body} =  response
            switch(body.responseCode) {
                case '000000':
                    const data = body.obj ? body.obj : true
                    resolve(data)
                    break
                case '999998':
                    window.location.href = '/login'
                    break
                default:
                    store.dispatch('showMsg', body.responseMessage)
                    break
            }
        }).catch((response) => {
            store.dispatch('showMsg', '服务器连接失败，请稍后重试')
        })
    })
}

api.get = (url,param,allOut) => http(url,param,'get')

api.post = (url,param,allOut) => http(url,param,'post')

api.saltPass = async (pwd,phone) => {
    const param = {}
    if(phone){
        param.userName = phone
    }
    const salt = await http(api.salt,param,'get')
    if(!phone) {
        return {salt: salt,pwd: SHA256(MD5(MD5(pwd)+salt))}
    }else{
        return SHA256(MD5(MD5(pwd)+salt))
    }
}


api.interceptors = function() {
    Vue.http.interceptors.push((request,next) => {
        let loadOver = false
        let show = false
        setTimeout(() => {
            if(!loadOver) {
                show = true
                store.dispatch('showLoading', true)
            }
        },500)
        next((response) => {
            loadOver = true
            if(show) {
                store.dispatch('showLoading', false)
            }
            return response
        })
    })
}
export default api