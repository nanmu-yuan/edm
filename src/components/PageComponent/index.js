const path = require('path');
const files  = require.context('./',false,/\.vue$/)

const module = {};
files.keys().forEach(key=>{
    const name = path.basename(key,'.vue');
    module[name] = files(key).default
})
export default module
