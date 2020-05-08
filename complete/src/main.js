// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/distquill.core.css'
// import 'quill/distquill.snow.css'
// import 'quill/distquill.bubble.css'
import router from './router'
import service from '../src/service/index'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'medium'
})
// Vue.use(VueQuillEditor)

Vue.prototype.$http = service
Vue.prototype.url = 'http://localhost:3333'
// Vue.prototype.url = 'http://localhost'
// Vue.prototype.url = 'http://118.31.172.72'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
