<template>
  <div class="whStyle echarts-groups">
    <div class="whStyle flex echarts-list">
      <div class="echarts-item" v-for="item in options" :key="item"
        :style="`width: calc(${100 / options.length}% - 12px);height: calc((100% - 12px) / ${Math.ceil(options.length / 4)});`" >
        <echarts-module :option="item"></echarts-module>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="echartsGroups">
import EchartsModule from '../EchartsModule/index.vue'

defineProps<{
  options: []
}>()

</script>

<style scoped lang="scss">
.echarts-groups {
  .echarts-list {
    flex-wrap: wrap;
    justify-content: unset;
    align-items: unset;

    .echarts-item {
      min-width: calc(25% - 12px);
      // height: calc(100% - 12px) / 4;
      margin: 6px;
      border: 1px solid #000;
    }
  }
}
</style>
