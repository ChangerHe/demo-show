<template>
  <div v-html="hello"></div>
</template>
<script>
  export default {
      data() {
          return {
              hello: 'I am component a'
          }
      }
  }
</script>

<style>
  * {
    font-size: 20px;
  }
</style>
