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
      type: Boolean, //loop 为 true 是为了支持无缝循环轮播
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
      this._autoPlay()
    },20) // 用$.nextTick也可，20ms（经验值）是因为浏览器是17ms刷新一次，但是就算设置20ms也会在1000ms之后刷新，mounted 是能获取到 DOM 对象，但 DOM 真正渲染到页面上需要一个 Tick 的时间。
    window.addEventListener('resize', () => { // 监听窗口改变事件
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true) // 因为屏幕宽度发生改变时已经initSlider一次了，所以已经多了两个children，所以不需要再额外增加两个children的宽度了。
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
      //console.log(width);
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false, // 惯性
          snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
        })
      this.slider.on('scrollEnd', () => { //这个回调可以不写这里吗？（存疑）
      this.currentPageIndex = this.slider.getCurrentPage().pageX;
        this._autoPlay();
      })
      this.slider.on('beforeScrollStart', () => {
        clearTimeout(this.timer);
      })
    },
    _initDots() {
      this.dots = new Array(this.children.length)
    },
   _autoPlay() { // 自动播放
      if (this.autoPlay) {
        this.timer = setTimeout(() => {
          this.slider.next();
        }, this.interval);
      }
    }
  },
  activated() {
    // 缓存后再次进入
    if (this.autoPlay) {
      this._autoPlay();
    };
  },
  deactivated() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import "~common/stylus/variable"
.slider
  min-height 1px // 为了让它有个高度，否则better-scroll会有计算问题
  .slider-group
    position relative  // 不写也可
    overflow hidden // 清除浮动
    white-space nowrap // 不写也可，nowrap	文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。
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