<template>
  <div class="shopCart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="iconfont icon-shopCart"  :class="{'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show=" totalCount">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight': totalCount > 0}">&yen; {{totalPrice}}</div>
        <div class="desc">另需配送费 &yen; {{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div transition="drop" class="ball" v-for="(index,ball) in balls" v-show="ball.show" :key="index">
        <dov class="inner"></dov>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    // 使用selectFoods实现父向子传参
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 10,
          count: 2
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  },
  computed: {
    // 计算商品的总数量
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food, index) => {
        total += food.price * food.count
      })
      return total
    },
    // 计算商品的总数量
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 不同状态下的支付状态文字
    payDesc() {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差¥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 支付状态class计算效果
    // 当总价小于最小配送价, 则返回class为not-enough
    // 当总价大于最小配送价, 则返回class为enough
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  }
}
</script>

<style lang="stylus">
  .shopCart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -14px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 400
            color #fff
            background red
            box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopCart
              font-size 24px
              line-height 44px
              text-align center
              color #80858a
              &.highlight
                color #fff
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,.1)
          font-size 16px
          font-weight 700
          color rgba(255,255,255,.4)
          &.highlight
            color #fff

        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          color rgba(255,255,255,.4)
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          font-size 14px
          line-height 48px
          text-align center
          color rgba(255,255,255,.4)
          font-weight 700
          background #2b333b
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-transition
          transition all .4s
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all .4s
</style>
