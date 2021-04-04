import Vue from 'vue'
import Vuex from 'vuex'
import userModules from './user'



Vue.use(Vuex);

const store = new Vuex.Store({
    
    modules: {
        userModules
    }
})

export default store;