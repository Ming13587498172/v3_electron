<template>
  <div class="layout-header-box">
    <div class="whStyle flex headFlex">
      <!-- Logo -->
      <a-image :width="50" :preview='false'
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      <!-- user -->
      <ul class="flex">
        <li>
          <FullscreenOutlined class="icon-style" @click="handleFullScreen" />
        </li>
        <li>
          <QuestionCircleOutlined class="icon-style" />
        </li>
        
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" name="LayoutHeader">
import { ref } from 'vue'

const isFullScreen = ref(false)

// 全屏
const handleFullScreen = () => {
  if (!document.fullscreenElement && !isFullScreen.value) {
    // 进入全屏
    document.documentElement.requestFullscreen().then(() => {
      isFullScreen.value = true
    })
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        isFullScreen.value = false
      })
    }
  }
}

</script>

<style scoped lang="scss">
.layout-header-box {
  width: 100%;
  height: 100%;

  .headFlex {
    justify-content: space-between;

    :deep(.ant-image) {
      &:hover {
        cursor: pointer;
      }

      img {
        border-radius: 50%;
      }
    }

    ul {
      li {
        width: 50px;
        height: 100%;
        margin: 0 6px;

        .icon-style {
          font-size: 40px;
          vertical-align: middle;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
