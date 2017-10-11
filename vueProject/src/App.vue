<template>
  <div>
    <div v-html="hello"></div>
    <div v-text="hello"></div>
    <div v-for="(item, index) in list" v-bind:class="{odd: index%2}" v-text="item.name + ' : ' + item.price"></div>
    <div v-for="(item, key, index) in obj " v-text="item + ' : ' + key + ' : ' + (index+1)"></div>
    {{num + 1}}
    {{status ? 'success' : 'fail'}}


    <componentA v-for="(item, index) in list" v-text="item.name + '-' + index"></componentA>
    <button v-on:click="addItem">addItem</button>
    <div :class="klass">11111111</div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import componentA from './components/a'

export default {
  components: {componentA},
  data() {
      return {

          klass: {
            test: true,
            test1: false,
            test2: 1,
            test3: 0,
            test4: -1
          },
          hello: '<h1>world</h1>',
          num: 1,
          status: true,
          list: [
            {
              name: 'apple',
              price: 11
            },
            {
              name: 'banana',
              price: 113
            },
            {
              name: 'pee',
              price: 13
            },
            {
              name: 'stuarry',
              price: 15
            },
          ],
        obj: {
          name: 'stuarry',
          price: 15,
          color: 'red',
          weight: 55
        }
      }
    },
    methods: {
      addItem() {
          Vue.set(this.list, 0 , {
              name: 'shabi',
            price: 1
          })
      }

    }
}
</script>

<style>
html {
  height: 100%
}
</style>
