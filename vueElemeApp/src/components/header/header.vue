<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height: "64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 此时需要加上条件判断,不加的话会因为异步请求而报错 -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="showDetail" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-rightArrow"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="iconfont icon-rightArrow"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
        </div>
      </div>
      <div class="detail-close">
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

  @import "../../common/stylus/mixin"

  .header
    position relative
    overflow hidden
    color: #fff
    background: rgba(7,17,27,.5)
    .content-wrapper
      position relative
      padding: 24px 12px 18px 24px
      .avatar
        display: inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        font-size 14px
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            display inline-block
            margin-left 6px
            vertical-align top
            font-size 18px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
        .support
          .icon
            display inline-block
            vertical-align middle
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image("decrease_1")
            &.discount
              bg-image("discount_1")
            &.invoice
              bg-image("invoice_1")
            &.special
              bg-image("special_1")
            &.guarantee
              bg-image("guarantee_1")
          .text
            line-height 12px
            font-size 12px


      .support-count
        position absolute
        right 12px
        top 70px
        padding-right 4px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,.2)
        text-align center
        .count
          vertical-align middle
          margin-left 10px
          font-size 10px
        .icon-rightArrow
          font-size 14px

    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      background-color rgba(7, 17, 27, .2)
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        margin-top 8px
        vertical-align top
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        vertical-align top
        font-size 12px
      .icon-rightArrow
        position absolute
        font-size 10px
        right 12px
        top 0
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7, 17, 27, .8)
      .detail-wrapper
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -128px auto 0
        clear both
        font-size 32px
        text-align center
</style>
