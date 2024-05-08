<template>
  <div class="App">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts" name="App">
// import { onBeforeMount } from 'vue'
// import router from '@/router'
// import { getRoutesAPI } from './api/routes'
// import { useRoutesStore } from './store'

// const { addRourtes } = useRoutesStore()

// onBeforeMount(() => {
//   getRoutesData()

// })

// const getRoutesData = async () => {
//   try {
//     const { data } = await getRoutesAPI()
//     addRourtes(data, router)
//   } catch (err) {

//   }
// }
</script>

<style lang="scss">
html, body, #app, .App {
  width: 100%;
  height: 100%;
}
</style>
