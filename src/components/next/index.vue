<!--
 * @Author: lwj
 * @Date: 2021-09-08 18:51:24
 * @LastEditors: lwj
 * @LastEditTime: 2022-02-04 10:57:16
 * @Description: 
 * @FilePath: /vue-tetris/src/components/next/index.vue
-->
<template>
  <div class="next">
    <div v-for="(item,index) in block">
      <b :class="e ? 'c' : ''" v-for="(e,k2) in item" />
    </div>
  </div>
</template>  

<script src="./index.js">
</script>


<style lang="less">
@import './index.less';
</style>