// const path = require("path");
// const files = require.context('./',false,/\.vue$/);

// let module = {};
// files.keys().forEach(key =>{
//     let temp = path.basename(key,'.vue');
//     module[temp] = files(key).default||files(key);
// })

// export default module
import a from './colum1.vue'
import b from './colum2.vue'
import c from './colum3.vue'
import d from './colum4.vue'
export default{
    colum1:a,
    colum2:b,
    colum3:c,
    colum4:d
}