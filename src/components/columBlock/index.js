const path = require("path");
const files = require.context('./',false,/\.vue$/);

let module = {};
files.keys().forEach(key =>{
    let temp = path.basename(key,'.vue');
    module[temp] = files(key).default||files(key);
})

export default module