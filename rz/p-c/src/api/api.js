

import store from "@/store/store.js";
import {setMsg,setLoadingStatus} from "@/store/action.js";

import API from "apiConfig";
require('es6-promise').polyfill();

import MD5 from 'blueimp-md5'
import SHA256 from 'sha256'

const axios=require("axios");

const initParam={
	'token':JSON.parse(window.localStorage.getItem('userInfo')||'{}').token,
	loginfrom:'pc'
}

//  request
axios.interceptors.request.use(function (config) {
	store.dispatch(setLoadingStatus(true));
	config.params=Object.assign(config.params||{},initParam);
	return config;
}, function (error) {

});

//   response
axios.interceptors.response.use(function (response) {
    store.dispatch(setLoadingStatus(false));
	return response;
}, function (error) {
	store.dispatch(setLoadingStatus(false));
});

API.http=function(url,params,all,type){
	return new Promise((resolve,reject) => {
		return axios({
			url,
            method:type,
			params
		}).then((response) => {
            const data=response.data;
			if(all){
                resolve(data)
			}else{
                if(data.obj){//有业务逻辑的返回内容
                    resolve(data.obj)
                }else if(data.responseCode=='000000'){//正常业务逻辑
                    const rt = data.obj || true
                    resolve(rt)
                }else if(data.responseCode=='999998'){//未登录
                    window.location.href='/login.html'
                }else if(data){
                    store.dispatch(setMsg(data.responseMessage));
                }
			}
		}).catch((error,a)=>{//错误业务逻辑
            store.dispatch(setMsg('服务器连接失败，请稍后重试!'))
		});
	});
};

API.get = (url,params,all) => API.http(url,params,all,"get");
API.post = (url,params,all) => API.http(url,params,all,"post");
API.calSaltPass=(pwd,salt)=>{
    return SHA256(MD5(MD5(pwd)+salt))
}
API.saltPass = async (pwd,phone) => {
    const param = {}
    if(phone){
        param.userName = phone
    }
    const salt = await API.http(API.salt,param,false,'get')
    if(!phone) {
        return {salt: salt,pwd: API.calSaltPass(pwd,salt)}
    }else{
        return API.calSaltPass(pwd,salt)
    }
}

export default API;

