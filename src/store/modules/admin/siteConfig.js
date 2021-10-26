export default{
    namespaced:true,
    state:{
        siteInfo:{},
        currentSiteName:''
    },
    mutations: {
        UPDATESITENAME(state,data){
            state.currentSiteName = data.siteName;
        },
        SAVESITELIST(state,data){
            state.siteInfo = data;
        }
    },
    actions: {
        
    }
}