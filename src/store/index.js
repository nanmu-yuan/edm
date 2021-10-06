import Vue from 'vue'
import Vuex from 'vuex'
import adminConfig from './modules/admin/adminConfig'

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        adminConfig
    }
})

export default store