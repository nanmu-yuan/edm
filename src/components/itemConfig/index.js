// const path = require('path')
// const files = require.context('./',false,/\.vue$/)

// let module = {};

// files.keys().forEach(key => {
//     const temp = path.basename(key,'.vue');
//     module[temp] = files(key).default;
// });
// export default module
import a from './add_item_config.vue'
import b from './bg_color_config.vue'
import c from './editor_config.vue'
import d from './image_config.vue'
import e from './link_config.vue'
import f from './pd_position_config.vue'
import g from './select_config.vue'
import h from './spu_config.vue'
import i from './style_config.vue'
import j from './text_config.vue'
export default {
    add_item_config:a,
    bg_color_config:b,
    editor_config:c,
    image_config:d,
    link_config:e,
    pd_position_config:f,
    select_config:g,
    spu_config:h,
    style_config:i,
    text_config:j
}