<template>
  <div class="whStyle echarts-groups">
    <div class="whStyle flex echarts-list">
      <div :id="item.toString()" class="echarts-item" v-for="item in sl" :key="item">
        <echarts-module></echarts-module>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="echartsGroups">
import EchartsModule from '../EchartsModule/index.vue'

defineProps<{
  sl: number
}>()

</script>

<style scoped lang="scss">
.echarts-groups {
  .echarts-list {
    flex-wrap: wrap;
    justify-content: unset;
    align-items: unset;

    .echarts-item {
      width: calc(25% - 12px);
      height: calc(100% - 12px) / 4;
      margin: 6px;
      border: 1px solid #000;
    }
  }
}
</style>
