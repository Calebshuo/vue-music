import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload';

import 'common/stylus/index.styl'
import fastclick from 'fastclick'
Vue.config.productionTip = false

fastclick.attach(document.body) // 取消移动端body dom下点击事件的300ms延迟

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
