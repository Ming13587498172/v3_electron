<template>
  <div class="whStyle box-padding hooks-box">
    <h2>Hooks-Study</h2>
    <br />
    <a-button type="primary" @click="useDebounce(debounceEvent, 1000)">防抖</a-button>
    <a-button type="primary" @click="useThrottle(throttleEvent, 1000)">节流</a-button>
  </div>
</template>

<script setup lang="ts" name="HooksStudy">
import { useDebounce } from "./hooks/debounce"
import { useThrottle } from "./hooks/throttle"

const debounceEvent = () => {
  alert('防抖点击')
}

const throttleEvent = () => {
  alert('节流点击')
}
</script>

<style scoped lang="scss">
.hooks-box {

}
</style>
