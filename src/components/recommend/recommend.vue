<template>
  <div>
    推荐页面
  </div>
</template>

<script type='text/ecmascript-6'>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      recommends:[]
    }
  },
  created() {
    this._getRecommend()// 为什么要在这里调用？data已经初始化了，可以声明存放数据的容器了
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>

</style>