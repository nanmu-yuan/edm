// const path = require("path");
// const files = require.context('./',false,/\.vue$/);

// let module = {};
// files.keys().forEach(key =>{
//     let temp = path.basename(key,'.vue');
//     module[temp] = files(key).default||files(key);
// })

// export default module

import a from './c_banner.vue'
import b from './c_button.vue'
import c from './c_footer.vue'
import d from './c_logo.vue'
import e from './c_menus.vue'
import f from './c_preheader.vue'
import g from './c_product.vue'
import h from './c_SplitLine.vue'
export default {
    c_banner:a,
    c_button:b,
    c_footer:c,
    c_logo:d,
    c_menus:e,
    c_preheader:f,
    c_product:g,
    c_SplitLine:h
}