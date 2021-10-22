import Vue from 'vue'
import Vuex from 'vuex'
import adminConfig from './modules/admin/adminConfig'
import siteConfig from './modules/admin/siteConfig'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        adminConfig,
        siteConfig
    }
})

export default store