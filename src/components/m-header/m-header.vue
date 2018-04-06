<template>
  <div class="header">
    <i class="icon"></i>
    <h1 class="title">The MusicApp of Caleb</h1>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.header
  position relative
  height 44px
  text-align center
  color $color-theme
  font-size 0
  .icon
    display inline-block
    margin-top 6px
    width 30px
    height 32px
    margin-right 9px
    bg-image('logo')
    background-size 30px 32px
  .title
    display inline-block
    vertical-align top
    line-height 44px
    font-size $font-size-large
</style>