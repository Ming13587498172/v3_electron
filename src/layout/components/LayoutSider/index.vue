<template>
  <div class="layout-sider-box">
    <a-layout-sider>
      <a-menu :selectedKeys="[route.path]" theme="dark" mode="inline">
        <a-menu-item v-for="item in router.getRoutes().filter(obj => Object.keys(obj.meta).length !== 0)" :key="item.path">
          <router-link :to="item.path">{{ item.meta!.title }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script setup lang="ts" name="LayoutSider">
import router from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

</script>

<style scoped lang="scss">
.layout-sider-box {
  height: 100%;
  :deep(.ant-menu) {
    height: 100%;
    overflow: auto;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
