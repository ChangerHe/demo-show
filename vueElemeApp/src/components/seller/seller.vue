<template>
  <div class="seller">
    <div class="overview">
      <h1 class="title">{{seller.name}}</h1>
      <div class="desc">
        <star-com :size="36" :score="seller.score"></star-com>
        <span class="text">({{seller.ratingCount}})</span>
        <span class="text">月售{{seller.sellCount}}单</span>
      </div>
      <ul class="remark">
        <li class="block">
          <h2>起送价</h2>
          <div class="countent">
            <span class="stress">{{seller.minPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>商家配送</h2>
          <div class="countent">
            <span class="stress">{{seller.deliveryPrice}}</span>元
          </div>
        </li>
        <li class="block">
          <h2>平均配送时间</h2>
          <div class="countent">
            <span class="stress">{{seller.deliveryTime}}</span>分钟
          </div>
        </li>
      </ul>
    </div>
    <split-com></split-com>
    <div class="active"></div>
  </div>
</template>

<script>
import starCom from 'components/star/star'
import splitCom from 'components/split/split'

export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  components: {
    starCom,
    splitCom
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixin'

  .seller
    position relative
    // top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      padding 18px
    .title
      margin-bottom 8px
      line-height 14px
      color rgb(7, 17, 27)
      font-size 14px
    .desc
      padding-bottom 10px
      line-height 18px
      font-size 0
      border-1px(rgba(7, 17, 27, .1))
      .star
        display inline-block
        margin-right 8px
        vertical-align top
        .star-item
          margin-right 4px
      .text
        margin-right 12px
        display inline-block
        vertical-align top
        font-size 10px
    .remark
      display flex
      margin-top 18px
      .block
        flex 1
        text-align center
        border-right 1px solid rgba(7, 17, 27, .1)
        &:last-child {
          border-right 0
        }
        h2
          font-size 10px
          line-height 10px
          color rgb(147, 153, 159)
        .countent
          font-size 16px
          line-height 24px
          font-weight 200
          color rgb(7, 17, 27)

</style>
