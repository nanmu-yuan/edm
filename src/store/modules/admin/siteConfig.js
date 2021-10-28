export default{
    namespaced:true,
    state:{
        siteInfo:{},
        currentSiteName:'',
        currentSiteApi:''
    },
    mutations: {
        UPDATESITENAME(state,data){
            state.currentSiteName = data.siteName;
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