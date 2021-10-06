const path = require('path')
const files = require.context('./',false,/\.vue$/)

let module = {};

files.keys().forEach(key => {
    const temp = path.basename(key,'.vue');
    module[temp] = files(key).default;
});
export default module