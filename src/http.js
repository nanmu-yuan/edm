import axios from 'axios'
import $ from 'jquery'
const request = axios.create({
    //baseURL: process.env.VUE_APP_BASEURL,
    timeout: 30000
});
export function get(url,spu){
    return  new Promise((resolve,reject) =>{
        axios.get(url).then(res =>{
            if(res.data.code == '200' && res.data.data.length>0){
                resolve(responseData(res));
            }else{
                reject(spu)
            }
        }).catch(err =>{
            reject(spu);
            console.err(err);
        })
    })
}
function responseData(data){
    // const para = store.state.edm;
    // if(typeof data == 'string'){data = JSON.parse(data)}
    // if(para.meSystem.indexOf(para.siteName) >= 0){
    //     obj = data.response.data
    // }else if(para.cloud.indexOf(para.siteName) >= 0){
    //     obj = data.data.list;
    // }else if( para.shopify.indexOf(para.siteName) >= 0){
    //     obj = data.data.response ? data.data.response : [];
    // }else if(para.Independence.indexOf(para.siteName) >= 0){
    //     obj  = data;
    // }
    // else{
    //     obj =  data.data
    // }
    let obj = data.data.data[0];
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
 export default request