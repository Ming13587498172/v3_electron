<template>
  <div class="box-padding children-watch-box">
    监听到父组件count 对象中 a属性值的变化 --- {{ childrenContent }}
  </div>
</template>

<script setup lang="ts" name="ChildrenWatch">
import { ref, watch } from 'vue';

let childrenContent = ref()

const props = defineProps<{
  fatherA: number
}>()

watch(props, (newVal, _) => {
  childrenContent.value = newVal.fatherA
})
</script>

<style scoped lang="scss">
</style>
