import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/stylus/index.styl'
import fastclick from 'fastclick'
Vue.config.productionTip = false

fastclick.attach(document.body) // 取消移动端body dom下点击事件的300ms延迟

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
