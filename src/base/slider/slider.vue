<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from "better-scroll"
export default {
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()
    },20) // 用$.nextTick也可，20ms（经验值）是因为浏览器是17ms刷新一次，但是就算设置20ms也会在1000ms之后刷新，mounted 是能获取到 DOM 对象，但 DOM 真正渲染到页面上需要一个 Tick 的时间。
  },
  methods: {
    _setSliderWidth() {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth//存疑
    },
    _initSlider() {

    }
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.slider
  min-height 1px // 存疑
  .slider-group
    position relative 
    overflow hidden 
    white-space nowrap // nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
</style>