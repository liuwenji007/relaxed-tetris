<!--
 * @Author: lwj
 * @Date: 2021-09-08 18:51:24
 * @LastEditors: lwj
 * @LastEditTime: 2021-09-08 19:06:51
 * @Description: 
 * @FilePath: /vue-tetris/src/components/guide/index.vue
-->
<template>
  <div v-show="!isMobile">
    <div class="guide right">
      <div class="up">
        <em style="transform:translate(0,-3px) scale(1,2)" />
      </div>
      <div class="left">
        <em style="transform:translate(-7px,3px) rotate(-90deg) scale(1,2)" />
      </div>
      <div class="down">
        <em style="transform: translate(0,9px) rotate(180deg) scale(1,2)" />
      </div>
      <div class="right">
        <em style="transform: translate(7px,3px)rotate(90deg) scale(1,2)" />
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>