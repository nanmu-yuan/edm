export default{
    namespaced:true,
    state:{
        siteInfo:{},
        currentSiteName:'',
        currentSiteApi:'',
        id:'',
        domainBase:'',
        track:'utm_source=EDM&utm_medium='
       
    },
    mutations: {
        UPDATESITENAME(state,data){
            state.currentSiteName = state.siteInfo[data.id]['name'];
            state.id = data.id;
            state.domainBase=domainBase(data.id,state); 
            state.track = `utm_source=EDM&utm_medium=`;
            state.currentSiteApi = state.siteInfo[data.id]['api'];
        },
        SAVESITELIST(state,data){
            state.siteInfo = data;
        }
    },
    actions: {
        
    }
}
// 配置域名
function domainBase(id,state){
    if(id&&state){
        let domainBase = '';
        // 独立站
        if(state.siteInfo[id]['platform'] == 'meSystem'){
            domainBase = 'https://www.'+ state.currentSiteName + '.com/Products/';
        // 云站
        }else if(state.siteInfo[id]['platform'] == 'cloud'){
            domainBase = 'https'+'://www.' + state.currentSiteName +'.com/item/';
        }else{
        // 店匠
            domainBase = 'https://www.' + state.currentSiteName + '.com/';
        }
        return domainBase
    }else{
        return null
    }
}