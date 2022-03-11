// const path = require('path');
// const files  = require.context('./',false,/\.vue$/)
// const module = {};
// files.keys().forEach(key=>{
//     const name = path.basename(key,'.vue');
//     module[name] = files(key).default||files(key)
// })
// console.log(module)
// export default module
import a from './Banner.vue'
import b from './Button.vue'
import c from './Footer.vue'
import d from './Logo.vue'
import e from './Menus.vue'
import f from './Preheader.vue'
import g from './Product.vue'
import h from './SplitLine.vue'
export default {
    Banner: a,
    Button: b,
    Footer: c,
    Logo: d,
    Menus: e,
    Preheader: f,
    Product: g,
    SplitLine:h
}

