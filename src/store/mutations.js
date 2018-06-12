import * as types from './mutation-types'

const mutations = {
   [types.SET_SINGER](state, singer) {  // 第一个参数是state文件中的state 第二个参数是我们的提交
      state.singer = singer
   }
}

export default mutations