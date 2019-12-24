// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

 
//公共css
import './assets/css/reset.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueForm from 'vue-form'
import 'jquery'
// 光引用不成，还得使用
Vue.use(router)
Vue.use(ElementUI)
Vue.use(VueForm)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


//ajax
 Vue.use(VueResource);
