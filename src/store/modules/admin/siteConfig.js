export default{
    namespaced:true,
    state:{
        siteInfo:{},
        currentSiteName:'',
        currentSiteApi:'',
        id:'',
        domainBase:'',
        track:'utm_source=EDM&utm_medium=',
        errorSpu:[],
        utm_campaign:'',
        utm_term:""
       
    },
    mutations: {
        UPDATESITENAME(state,data){
            let currTime = new Date().toISOString().slice(0,10).replace(/[^0-9]/ig,'').substring(0,8);
            if(data.id){
            state.currentSiteName = state.siteInfo[data.id]['name'].toLowerCase();
            state.id = data.id;
            state.domainBase=domainBase(data.id,state); 
            state.currentSiteApi = state.siteInfo[data.id]['api'];
            state.track = `utm_source=EDM&utm_medium=${state.currentSiteName}${currTime}&utm_campaign=${state.utm_campaign}&utm_term=${state.utm_term}`;
            }else if(data.utm_campaign || data.utm_term|| data.time){
                state.utm_campaign = data.utm_campaign;
                state.utm_term = data.utm_term;
                state.track = `utm_source=EDM&utm_medium=${state.currentSiteName}${data.time?data.time:currTime}&utm_campaign=${data.utm_campaign}&utm_term=${data.utm_term}`;
            }
        },
        UPDATETRACKINFO(state,data){
            
        },
        SAVESITELIST(state,data){
            state.siteInfo = data;
        },
        ERRORSPU(state,data){
            if(data =='clear'){
                state.errorSpu=[];
            };
            if(data !='clear' && data){
                state.errorSpu.push(data);
            }
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