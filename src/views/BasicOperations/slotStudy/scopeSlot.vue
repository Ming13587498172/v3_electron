<template>
  <div class="box-padding scope-slot-box">
    <slot name="scopeSlot" :item="scopeSlotData" :data="money"></slot>
  </div>
</template>

<script setup lang="ts" name="ScopeSlot">
import { ref } from 'vue';

let scopeSlotData = ref([
  {
    name: '张三',
    age: 18
  }, {
    name: '李四',
    age: 20
  }
])

let money = ref(999)
</script>

<style scoped lang="scss">
</style>
