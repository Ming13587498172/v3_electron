<template>
  <div class="whStyle box-padding basic-operations-box">
    <div class="whStyle content hide-scrollbar">
      <div class="content-item hide-scrollbar">
        <h1>slot 插槽</h1>
        <DefaultSlot>
          <template #default>
            使用默认插槽
            <br />
            {{
              `<template #default>
              插槽内容
              < /template>`
            }}
            </template>
        </DefaultSlot>
        <NameSlot>
          <template #nameSlot>
            使用具名插槽
            <br />
            {{
              `<template #nameSlot>
              插槽内容
              < /template>`
            }}
            </template>
        </NameSlot>
        <ScopeSlot>
          <template #scopeSlot="{ item, data }">
            [key: string]: any参数 以及 作用域插槽
            <div v-for="i in item" :key="i.name">
              姓名：{{ i.name }}
              年龄{{ i.age }}
              money：{{ data }}
            </div>
          </template>
        </ScopeSlot>
      </div>
      <div class="content-item hide-scrollbar">
        <div>
          <h2>watch 监听</h2>
          <a-input v-model:value="watchVal" autofocus />{{ watchContent }}
          <br />
          <a-button @click="changeCount">count++</a-button>{{ count }}{{ countContent }}
          <ChildrenWatch :fatherA="count.a"></ChildrenWatch>
        </div>
      </div>
      <div class="content-item hide-scrollbar">
        <h2>computed 计算属性</h2>
        {{ msg }} ---- {{ reverMsg }}
      </div>
      <div class="content-item hide-scrollbar">
        <h2>父子孙组件通信</h2>
        <p>父组件数据：{{ fatherData }}</p>
        <p>子组件数据(emit)：{{ childrenData }}</p>
        <p>子组件数据(v-model)：{{ VModelVal }}</p>
        <p>子组件数据(ref)：{{ refVal }}</p>
        <ChildrenComm ref="child" :toChildren="fatherData" v-model:VModelVal="VModelVal" :a="a" :b="b" :c="c"
          @to-father="toFatherChange"></ChildrenComm>
      </div>
      <div class="content-item hide-scrollbar">
        <IndexTsx></IndexTsx>
        <RenderTsx></RenderTsx>
        <SetupTsx></SetupTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <GrammarTsx></GrammarTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <StyleTsx></StyleTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <FatherTsx></FatherTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <EventTsx></EventTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <SlotTsx></SlotTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <DataIndexTsx></DataIndexTsx>
      </div>
      <div class="content-item hide-scrollbar">
        <PiniaStudy></PiniaStudy>
      </div>
      <div class="content-item hide-scrollbar">
        <TodoPinia></TodoPinia>
      </div>
      <div class="content-item hide-scrollbar">
        <HooksStudy></HooksStudy>
      </div>
      <div class="content-item hide-scrollbar">
        <ScssStudy></ScssStudy>
      </div>
      <div class="content-item hide-scrollbar">
        <DynamicStudy></DynamicStudy>
      </div>
      <div class="content-item hide-scrollbar">
        <DirectiveStudy></DirectiveStudy>
      </div>
      <div class="content-item hide-scrollbar">
        <FormatDateStudy></FormatDateStudy>
      </div>
      <div class="content-item hide-scrollbar">19</div>
      <div class="content-item hide-scrollbar">20</div>
      <div class="content-item hide-scrollbar">21</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="BasicOperations">
import { computed, onMounted, ref, watch } from 'vue'
import ChildrenComm from './commStudy/childrenComm.vue'
import HooksStudy from './hooksStudy/index.vue'
import PiniaStudy from './piniaStudy/index.vue'
import TodoPinia from './piniaStudy/todoPinia.vue'
import DefaultSlot from './slotStudy/defaultSlot.vue'
import NameSlot from './slotStudy/nameSlot.vue'
import ScopeSlot from './slotStudy/scopeSlot.vue'
import DataIndexTsx from './tsxStudy/dataIndexTsx'
import EventTsx from './tsxStudy/eventTsx'
import FatherTsx from './tsxStudy/fatherTsx'
import GrammarTsx from './tsxStudy/grammarTsx'
import IndexTsx from './tsxStudy/indexTsx'
import RenderTsx from './tsxStudy/renderTsx'
import SetupTsx from './tsxStudy/setupTsx'
import SlotTsx from './tsxStudy/slotTsx'
import StyleTsx from './tsxStudy/styleTsx'
import ChildrenWatch from './watchStudy/ChildrenWatch.vue'
import ScssStudy from './scssStudy/index.vue'
import DynamicStudy from './dynamicStudy/index.vue'
import DirectiveStudy from './directivestudy/index.vue'
import FormatDateStudy from './formatDateStudy/index.vue'

// 基础监听
let watchVal = ref('')
let watchContent = ref('')
watch(watchVal, (newVal, oldVal) => {
  watchContent.value = `内容由--${oldVal === '' ? '空内容' : oldVal}--变为--${newVal}`
})
const changeCount = () => {
  count.value.a++
}

// 深度监听
let count = ref({
  a: 1,
  b: 2,
})
let countContent = ref('')
watch(count, (newVal, _) => {
  countContent.value = `深度监听：监听到 count对象的 a属性变化--${newVal.a}`
}, { deep: true })

// 计算属性
let msg = ref('hello world')
let reverMsg = computed(() => {
  return msg.value.split('').reverse().join('')
})

// 父子组件通信
let fatherData = ref('这是父组件的消息')
// emit
let childrenData = ref('')
const toFatherChange = (val: string) => {
  childrenData.value = val
}
// v-model
let VModelVal = ref('欣欣')
// ref
const child = ref()
let refVal = ref()
const refChange = () => {
  refVal.value = child.value.childrenVal
}
onMounted(() => {
  refChange()
})
// attrs
let a = ref(1)
let b = ref(2)
let c = ref(3)

</script>

<style scoped lang="scss">
.basic-operations-box {
  .hide-scrollbar {
    overflow: auto;
    /* 启用滚动 */
    -ms-overflow-style: none;
    /* IE 和 Edge */
    scrollbar-width: none;
    /* Firefox */
  }

  /* 兼容所有浏览器的通用方法 */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .content {
    display: flex;
    flex-wrap: wrap;

    .content-item {
      width: 30%;
      margin: 1% calc(10% / 3 / 2);
      background: antiquewhite;
    }
  }
}
</style>
