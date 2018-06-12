import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions' // es6 import的一个语法规范，一次import所有的
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger' // vuex提供的插件，每次通过mutation修改state的时候会在控制台打印一条记录包括修改后的内容，之前内容。

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // vuex提供的调试工具

export default new Vuex.Store({  // 单例模式
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})