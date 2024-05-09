<template>
  <div class="layout-box">
    <a-layout class="layout">
      <a-layout-header class="layout-header">
        <layout-header></layout-header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider class="layout-sider">
          <layout-sider></layout-sider>
        </a-layout-sider>
        <a-layout-content class="layout-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts" name="Layout">
import LayoutHeader from './components/LayoutHeader/index.vue'
import LayoutSider from './components/LayoutSider/index.vue'
</script>

<style lang="scss">
.layout-box {
  width: 100%;
  height: 100%;

  .ant-layout { 
    width: 100%;
    height: 100%;
    .ant-layout-header {
      height: 60;
      text-align: center;
      color: #fff;
      line-height: 60px;
      background-color: #7dbcea;
    }

    .ant-layout-sider {
      height: 100%;
      text-align: center;
      color: #fff;
      background-color: #3ba0e9;
    }

    .ant-layout-content {
      height: 100%;
      min-height: 200px;
      // text-align: center;
      // color: #fff;
      // background-color: #108ee9;
    }
  }

}
</style>
