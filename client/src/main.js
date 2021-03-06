import Vue from 'vue'
import router from './router/index'
import App from './App.vue'
import axios from 'axios'
import store from './store'


Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
