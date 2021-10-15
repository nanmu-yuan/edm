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
        REMOVEARR(state,data){
            console.log(state.defaultArray,data)
            delete state.defaultArray[data.num]
        },
        UPDATEARRAY (state,data){
            state.defaultArray[data.num] = data.val;
            state.defaultArray = Object.assign({},state.defaultArray)
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
            console.log(state.defaultArray)
        }
    },
    actions: {
        
    }
}