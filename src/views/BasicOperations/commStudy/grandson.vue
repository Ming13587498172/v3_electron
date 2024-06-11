<template>
  <div class="box-padding grand-son-box">
    来自祖传的数据：{{ props.a }}---{{ props.b }}----{{ props.c }}
  </div>
</template>

<script setup lang="ts" name="GrandSon">
const props = defineProps<{
  a: number,
  b: number,
  c: number,
}>()
</script>

<style scoped lang="scss">

</style>
