<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean, //loop 为 true 是为了支持循环轮播
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
      this._initDots() //在克隆child之前初始化dots数组
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    },20) // 用$.nextTick也可，20ms（经验值）是因为浏览器是17ms刷新一次，但是就算设置20ms也会在1000ms之后刷新，mounted 是能获取到 DOM 对象，但 DOM 真正渲染到页面上需要一个 Tick 的时间。
    window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true) // 存疑
        this.slider.refresh()
      })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children
      let width = 0
      let sliderWidth = this.$refs.slider.clientWidth //Element.clientWidth 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child,'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth //如果循环切换的话，每个child左右两边各要克隆一个child，所以要再加两个child的宽度。参考原生实现循环切换，当滑动到同一张图的时候迅速把坐标切回去。（其实就是多了一个第一张图多了一个最后一张图）
      }
      console.log(width);
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        // getCurrentPage() 返回值：{Object} { x: posX, y: posY,pageX: x, pageY: y} 其中，x 和 y 表示偏移的坐标值，pageX 和 pageY 表示横轴方向和纵轴方向的（滚过的）！！页面数。
        //console.log(pageIndex);
        if (this.loop) {
          pageIndex -= 1 //如果要循环轮播的话，第一个页面之前还克隆了一个页面所以还要减1
        }
        this.currentPageIndex = pageIndex

        if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.time = setTimeout(() => {
        this.slider.goToPage(pageIndex,0,400)
      },this.interval)
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.slider
  min-height 1px // 为了让它有个高度，否则better-scroll会有计算问题
  .slider-group
    position relative 
    overflow hidden 
    white-space nowrap // nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
    .slider-item
      float left
      box-sizing border-box
      text-align center 
      a
        display block
        width 100%
        img
          display block 
          width 100%
  .dots
    position: absolute
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll

</style>