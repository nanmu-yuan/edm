export default {
    namespaced:true,
    state: {
        defaultArray:{},
        configName:''
    },
    mutations: {
        ADDARRAY (state,data){
           state.defaultArray[data.num] = data.val
        },
        COPYDEFAULTARRAY(state,data){
            let objToArry = (obj)=>Object.keys(obj).map(key => obj[key]),newObj = {};
            let newArr = objToArry(JSON.parse(JSON.stringify(state.defaultArray)));
            newArr.splice(data.index,0,data.val);
            for(let i=0;i<newArr.length;i++){
                newObj[newArr[i].timestamp] = newArr[i];
            }
            state.defaultArray = newObj;
        },
        REMOVEARR(state,data){
            delete state.defaultArray[data.num]
        },
        UPDATEARRAY (state,data){
            state.defaultArray[data.num] = data.val;
            state.defaultArray = Object.assign({},state.defaultArray);
        },
        UPDATEPRODUCTLIST (state,data){
           state.defaultArray[data.num]['content_setting']['spu_config']['list'] = data.list;
        },
        SETCONFIGNAME (state,data){
            state.configName = data;
        },
        DEFAULTARRAYSORT(state,data){
            let objToArry = (obj)=>Object.keys(obj).map(key => obj[key])
            let newObj = {};
            let swapArray = (arr,oldindex,newindex)=>{
                arr[newindex] = arr.splice(oldindex,1,arr[newindex])[0]
                return arr
            }
            let sortArr = [];
            let newArr = objToArry(JSON.parse(JSON.stringify(state.defaultArray)));
            if(data.oldIndex == undefined){
                 newArr.splice(data.newIndex,0,data.element.data().defaultConfig);
                sortArr = JSON.parse(JSON.stringify(newArr));
            }else{
               sortArr = JSON.parse(JSON.stringify(swapArray(newArr,data.oldIndex,data.newIndex)))
            }
            for(let i=0;i<sortArr.length;i++){
                newObj[sortArr[i].timestamp] = sortArr[i]
            }
            state.defaultArray = newObj;
        },
        CLEARNDEFAULTARRAY(state){
            state.defaultArray ={};
            state.configName = '';
        }
    },
    actions: {
        
    }
}