import axios from 'axios'
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import $ from 'jquery'
import { Message, Loading } from 'element-ui';
import router from './router'
import * as base from './assets/js/base'
import store from './store/index'

const request = axios.create({
    //baseURL: process.env.VUE_APP_BASEURL,
    timeout: 30000
});

let loading;        //定义loading变量
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: 'lodding...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
// 请求拦截  设置统一header
request.interceptors.request.use(config => {
    // 加载
    startLoading()
    if (localStorage.eleToken)
        config.headers.Authorization = localStorage.eleToken
    return config
}, error => {
    return Promise.reject(error)
})
// 响应拦截  401 token过期处理
request.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    if (error.response) {
        switch (error.response.status) {
            case 400:   error.message = '请求错误'   

            break     
            case 401:    
                        error.message = '未授权，请登录' 
                        base.LoginOut();
            break 
            case 403:          
                        Message.error('token值无效，请重新登录')
                        // 清除token
                        base.LoginOut();
            break    
            case 404:    error.message = `请求地址出错: ${error.response.config.url}` 
            break  
            case 408:    error.message = '请求超时' 
            break   
            case 500:    error.message = '服务器内部错误'
            break    
            case 501:    error.message = '服务未实现'  
            break   
            case 502:    error.message = '网关错误'  
            break     
            case 503:    error.message = '服务不可用'    
            break     
            case 504:    error.message = '网关超时'   
            break  
            case 505:    error.message = 'HTTP版本不受支持'  
            break   
            default:  
                        error.message = '其他情况'  
        }
    }
    return Promise.reject(error)
})
export function get(url){
    return  new Promise((resolve,reject) =>{
        axios.get(url)
        .then(res =>{
            resolve(responseData(res));
        }).catch(err =>{
            reject(err)
        })
    })
}
function responseData(data){
    var obj = null;
    const para = store.state.edm;
    if(typeof data == 'string'){data = JSON.parse(data)}
    if(para.meSystem.indexOf(para.siteName) >= 0){
        obj = data.response.data
    }else if(para.cloud.indexOf(para.siteName) >= 0){
        obj = data.data.list;
    }else if( para.shopify.indexOf(para.siteName) >= 0){
        obj = data.data.response ? data.data.response : [];
    }else if(para.Independence.indexOf(para.siteName) >= 0){
        obj  = data;
    }
    else{
        obj =  data.data
    }
    return obj;
}
export function post(url,params) { 
    return new Promise((resolve,reject) =>{
        axios.post(url,QS.stringify(params))
        .then(res =>{
            resolve(res.data)
        })
        .catch(err =>{
            reject(err)
        })
    })
 }
 export  function jsonp(url){
    return new Promise((resolve,reject) =>{
        $.ajax({
            url,
            type:"get",
            dataType:"jsonp",
            jsonp:'jsonpcallback',
            success:function (data) { 
                resolve(responseData(data));
             },
            error:function(data){
                reject(data)
            },
            beforeSend:function(req){
               req.setRequestHeader('pms-token','orderplus')
            },
        })
    })
 }



 /****
  * 
  * 
  */

  export function queryProductBySpu(url,spu){
    return new Promise((resolve,reject) =>{
        $.ajax({
            type:'get',
            url:url,
            dataType:isJsonp()?'json':'jsonp',
            jsonp:isJsonp()?false:'jsonpcallback',
            beforeSend(req){
                // isJsonp()?req.setRequestHeader('pms-token',"orderplus") : ''
            },
            success(res){
                if(responseData_(res)){
                    resolve(responseData_(res));
                }else{
                    reject(spu);
                    store.commit('siteConfig/ERRORSPU',spu);
                }
            },
            error(err){
                reject(spu);
               // console.err(err);
            },
            complete(){

            }
        })
    })
}
function isJsonp(){
    let id = store.state.siteConfig.id,siteList = store.state.siteConfig.siteInfo,isJsonp=true;
    siteList[id]['platform'] == 'meSystem'?isJsonp = false:isJsonp = true;
    return isJsonp
}
function responseData_(data){
    let obj = null;
    let id = store.state.siteConfig.id,siteList = store.state.siteConfig.siteInfo
    if(typeof data == 'string'){data = JSON.parse(data)}
    if(siteList[id]['platform'] == 'meSystem'){
        obj = data.response.data[0]
    }else if(siteList[id]['platform'] == 'cloud'){
        obj = data.data.list[0];
    }else if( siteList[id]['platform'] == 'shopify'){
        obj = data.data.response? data.data.response:data.data ? data.data[0] : null;
    }else if(siteList[id]['platform'] == 'Independence'){
        obj  = data;
    }
    else{
        obj =  data.data
    }
    return obj;
}
 export function tpPost(url,prams){
    return new Promise((resolve,rejcet) =>{
        $.ajax({
            type : 'post',
            url : url,
            data:{
                html:prams.template,
                site_name:prams.site_name
            },
            success:function(res){
                var data = JSON.parse(res)
                resolve(data)
            },
            error : function(err){
                rejcet(err)
            },
            complete:function(){
      
            }
        })
    })
 } 
export default request