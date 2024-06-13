<template>
  <div class="whStyle box-padding hooks-box">
    <h2>Hooks-Study</h2>
    <br />
    <a-button type="primary" @click="handleDebounce">防抖</a-button>
  </div>
</template>

<script setup lang="ts" name="HooksStudy">
import { useDebounce } from './hooks/debounce'


const handleDebounce = () => {
  useDebounce(debounceEvent, 1000)
}
const debounceEvent = () => {
  alert('防抖点击')
}
</script>

<style scoped lang="scss">
.hooks-box {

}
</style>
