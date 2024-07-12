<template>
  <div class="whStyle box-padding ts-t-study">
    <h2>ts-t-study</h2>
    <br />
    <div>
      <p>string -> {{ functionT('funT') }} --- number -> {{ functionT(1) }} --- Array -> {{ functionT([1, '2', null]) }} --- returnArray -> {{ functionT1(1, 2, 3) }}{{ functionT1('a', 'b', 'c') }}</p>
      <p>{{ funT }}</p>
      <p>{{ functionT3(1) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="TsTStudy">
import { onMounted, ref } from 'vue'

let funT = ref('')

onMounted(() => {
  functionT2('funT1')
})

const functionT = <T>(str: T): T => {
  return str
}
const functionT1 = <T>(a: T, b:T, c: T): T[] => {
  return [a, b, c]
}

const functionT2 = <T extends string>(str: T): void => {
  funT.value = str
}

const functionT3 = <T>(unk: T): T => {
  return unk
}

</script>

<style scoped lang="scss">
.ts-t-study {

}
</style>
