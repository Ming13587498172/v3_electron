<template>
  <div class="whStyle dataV-groups">
    <div class="whStyle flex dataV-list">
      <div class="dataV-item" v-for="item in options" :key="item.dynamicComponentName"
        :style="`width: calc(${100 / options.length}% - 12px);height: calc((100% - 12px) / ${Math.ceil(options.length / 4)});`">
        <data-v-module :dynamicComponentNameObj="item"></data-v-module>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="DataVGroups">
import DataVModule from '../DataVModule/index.vue'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  optionList?: []
}>()

let options = ref<any[]>([])
let ipcRenderer: any

onMounted(() => {
  options.value = props.optionList as []
})

onMounted(() => {
  getEchartsOptions()
})

const getEchartsOptions = () => {
  let timer
  if (window && window.process && window.process.versions && window.process.versions['electron']) {
    import("@vueuse/electron").then(({ useIpcRenderer }) => {
      ipcRenderer = useIpcRenderer()
    }).then(() => {
      ipcRenderer.on('set-charts-options', (_: any, args: any) => {
        if (args !== undefined) {
          options.value = JSON.parse(args)
          timer = setTimeout(() => {
            ipcRenderer.send('get-charts-options', 'clear')
          }, 200)
        }
      })
    })
  } else {
    options.value = props.optionList as []
  }
  clearTimeout(timer)
}

</script>

<style scoped lang="scss">
.dataV-groups {
  .dataV-list {
    flex-wrap: wrap;
    justify-content: unset;
    align-items: unset;

    .dataV-item {
      min-width: calc(25% - 12px);
      // height: calc(100% - 12px) / 4;
      margin: 6px;
      border: 1px solid #000;
    }
  }
}
</style>
