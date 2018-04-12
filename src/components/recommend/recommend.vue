<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl"> <!--这样的话点图片就能进入a标签的链接-->
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Slider from 'base/slider/slider'
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      recommends: []
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
  },
  components: {
    Slider
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
    
    .recommend
      position fixed  // 加上固定定位变成BFC了，所以宽度不是独占一行而是被子元素撑开的了
      width 100%
      top 88px
      bottom 0
      .recommend-content
        height 100%
        overflow hidden
        .slider-wrapper
          position relative
          width 100%
          overflow hidden
        .recommend-list
          .list-title
            height 65px
            line-height 65px
            text-align center
            font-size $font-size-medium
            color $color-theme
</style>