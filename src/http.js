import axios from 'axios'
import $ from 'jquery'
import store from './store'
const request = axios.create({
    //baseURL: process.env.VUE_APP_BASEURL,
    timeout: 30000
});
export function queryProductBySpu(url,spu){
    return new Promise((resolve,reject) =>{
        $.ajax({
            type:'get',
            url:url,
            dataType:isJsonp()?'json':'jsonp',
            jsonp:isJsonp()?false:'jsonpcallback',
            beforeSend(req){
                isJsonp()?req.setRequestHeader('pms-token',"orderplus") : ''
            },
            success(res){
                if(responseData(res)){
                    resolve(responseData(res));
                }else{
                    reject(spu);
                }
            },
            error(err){
                reject(spu);
                console.err(err);
            },
            complete(){

            }
        })
    })
}
function isJsonp(){
    let currentSiteName = store.state.siteConfig.currentSiteName,siteList = store.state.siteConfig.siteInfo,isJsonp=true;
    siteList.meSystem.indexOf(currentSiteName)>0?isJsonp = false:isJsonp = true;
    return isJsonp
}
function responseData(data){
    let obj = null;
    let currentSiteName = store.state.siteConfig.currentSiteName,siteList = store.state.siteConfig.siteInfo
    if(typeof data == 'string'){data = JSON.parse(data)}
    if(siteList.meSystem.indexOf(currentSiteName) >= 0){
        obj = data.response.data[0]
    }else if(siteList.cloud.indexOf(currentSiteName) >= 0){
        obj = data.data.list[0];
    }else if( siteList.shopify.indexOf(currentSiteName) >= 0){
        obj = data.data.response? data.data.response:data.data ? data.data[0] : null;
    }else if(siteList.Independence.indexOf(currentSiteName) >= 0){
        obj  = data;
    }
    else{
        obj =  data.data
    }
    return obj;
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
 export function post(url,prams){
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