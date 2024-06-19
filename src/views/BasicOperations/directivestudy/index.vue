<template>
  <div class="whStyle box-padding directive-study">
    <h2>directive-study</h2>
    <br />
    全局自定义指令 -> 输入框自动获取焦点
    <br />
    <input v-focus />
    <br />
    <br />
    局部自定义指令 -> 首字母转大写
      <br />
    <span v-to-upper="str">{{ str }}</span>
  </div>
</template>

<script setup lang="ts" name="DirectiveStudy">
import { ref } from 'vue'
// 首字母转大写
import vToUpper from '@/directives/local/toUpper'

let str = ref('abcdefghijk')
</script>

<style scoped lang="scss">

</style>
