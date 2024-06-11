<template>
  <div class="box-padding children-comm-box">
    {{ childrenVal }}
    <br />
    父组件传来的数据：{{ props.toChildren }}
    <!-- <GrandSon v-bind="$attrs"></GrandSon> -->
  </div>
</template>

<script setup lang="ts" name="ChildrenComm">
import { ref } from 'vue'
// import GrandSon from './grandson.vue'

const props = defineProps<{
  toChildren: string,
  VModelVal: string
}>()

const emit = defineEmits(['to-father', 'update:VModelVal'])
const emitToFather = () => {
  emit('to-father', '这是子组件的消息')
}
emitToFather()

const handler = () => {
  emit('update:VModelVal', props.VModelVal + '   ' + props.VModelVal)
}
handler()

let childrenVal = ref('子组件的值')
defineExpose({
  childrenVal
})
</script>

<style scoped lang="scss">

</style>
