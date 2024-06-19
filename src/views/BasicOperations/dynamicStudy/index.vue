<template>
  <div class="whStyle box-padding dynamic-study">
    <h2>动态权限</h2>
    <a-select ref="select" v-model:value="selectVal" style="width: 100%;" @change="handleChange">
      <a-select-option value="admin">admin</a-select-option>
      <a-select-option value="common">common</a-select-option>
    </a-select>
    <ul>
      <li v-for="item in dynamicList" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="DynamicStudy">
import { onMounted, ref } from 'vue'
import { getDynamicRoutesAPI } from '@/api/routes'
import { storeToRefs } from 'pinia'
import { useDynamicStore } from '@/store'

const { dynamicList } = storeToRefs(useDynamicStore())
const { dealDynamicList } = useDynamicStore()

let selectVal = ref()

onMounted(() => {
  getDynamicRoutes()
})

const getDynamicRoutes = async () => {
  try {
    const { data } = await getDynamicRoutesAPI()
    dealDynamicList(selectVal.value, data)
  } catch (err) {

  }
}

const handleChange = () => {
  getDynamicRoutes()
}

</script>

<style scoped lang="scss">
.dynamic-study {}
</style>
