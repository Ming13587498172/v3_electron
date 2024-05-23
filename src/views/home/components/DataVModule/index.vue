<template>
  <component :is="`dv-${dynamicComponentNameObj.dynamicComponentName}`" class="whStyle data-v-module" v-bind="dynamicComponentNameObj?.attr">
    <h1>{{ `dv-${dynamicComponentNameObj.dynamicComponentName}` }}</h1>
  </component>
</template>

<script setup lang="ts" name="DataVModule">
import { DataVItem } from '../../dataV-attribute/config'

defineProps<{
  dynamicComponentNameObj: DataVItem
}>()
</script>

<style scoped lang="scss">
.data-v-module {
  :deep(.border-box-content) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
