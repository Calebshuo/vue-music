<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider><!--必须是recommends.length,因为数组为空if后是true-->
          <div v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl"> <!--这样的话点图片就能进入a标签的链接-->
              <img :src="item.picUrl">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li class="item" v-for="(item, index) in discList" :key="index">
            <div class="icon">
              <img width="60" height="60" :src="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <div class="desc" v-html="item.dissname"></div>
            </div>
          </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import Slider from 'base/slider/slider'
import {getRecommend,getDiscList} from 'api/recommend'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()// 为什么要在这里调用？data已经初始化了，可以声明存放数据的容器了
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
  _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
  }
  },
  components: {
    Slider
  }
}
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
        .recommend-list
          .list-title
            height: 65px
            line-height: 65px
            text-align: center
            font-size: $font-size-medium
            color: $color-theme
          .item
            display: flex
            box-sizing: border-box
            align-items: center // flex元素垂直居中
            padding: 0 20px 20px 20px
            .icon
              flex: 0 0 60px
              width: 60px
              padding-right: 20px
            .text
              display: flex
              flex-direction: column // flex把主轴变为垂直方向排列
              justify-content: center
              flex: 1
              line-height: 20px
              overflow: hidden
              font-size: $font-size-medium
              .name
                margin-bottom: 10px
                color: $color-text
              .desc
                color: $color-text-d

</style>