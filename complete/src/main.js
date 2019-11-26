// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import service from '../src/service/index'

Vue.config.productionTip = false

Vue.prototype.$http = service
Vue.prototype.url = 'https://cnodejs.org/api/v1/topics?page=1&limit=15'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
