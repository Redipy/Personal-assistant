// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import service from '../src/service/index'

Vue.config.productionTip = false

Vue.prototype.$http = service
Vue.prototype.url = 'http://localhost:3333/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
