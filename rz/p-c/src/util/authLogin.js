
import  API from "@/api/api.js";

export default function authLogin(){
    return new Promise(async (resolve,reject)=>{
        let resData=await API.get(API.loginCheck,{},true);
        let {
            obj=''
        }=resData;
        if(typeof obj=='string' && obj.length){//如果登录 obj是用户名  否则obj={}
            resolve(obj);
        }else{
            resolve(false);
        }
    })
}
