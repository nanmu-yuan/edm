export default{
    namespaced:true,
    state:{
        siteInfo:{},
        currentSiteName:'',
        currentSiteApi:'',
        domainBase:''
       
    },
    mutations: {
        UPDATESITENAME(state,data){
            state.currentSiteName = data.siteName;
            state.domainBase=domainBase(data.siteName,state.siteInfo); 
        },
        SAVESITELIST(state,data){
            state.siteInfo = data;
        },
        UPDATESITEAPI(state,data){
            state.currentSiteApi =state.siteInfo['api'][data.siteName][1];
        },
    },
    actions: {
        
    }
}
// 配置域名
function domainBase(siteName,siteInfo){
    let domainBase = '';
    // 独立站
    if(siteInfo.meSystem.indexOf(siteName) >= 0){
        domainBase = 'https://www.'+ siteName + '.com/Products/';
    // 云站
    }else if(siteInfo.cloud.indexOf(siteName) >= 0){
        domainBase = 'https'+'://www.' + siteName +'.com/item/';
    }else{
    // 店匠
        domainBase = 'https://www.' + siteName + '.com/';
    }
    return domainBase
}