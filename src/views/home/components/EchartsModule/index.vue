<template>
  <div ref="echartsDom" id="echartsDom" class="whStyle echarts-module"></div>
</template>

<script setup lang="ts" name="EchartsModule">
import { onMounted, ref } from "vue"
import echarts from "../../echarts-options/config"

const query = defineProps<{
  option: any
}>()

let echartsDom = ref(null)

onMounted(() => {
  echartsaaaa()
})

const echartsaaaa = () => {
  const echartsData = echarts.init(echartsDom.value)

  let option = query.option

  option && echartsData.setOption(option)

  window.addEventListener('resize', () => {
    echartsData.resize()
  })
}
</script>

<style scoped lang="scss">
.echarts-module {}
</style>
