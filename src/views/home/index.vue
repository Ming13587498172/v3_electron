<template>
  <div ref="Home" class="whStyle box-padding home-box">
    <div class="whStyle flex echartDOM">
      <a-card hoverable class="whStyle">
        <!-- <a-row>
          <a-button type="dashed" size="mini">折现图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">柱状图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">饼图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">地图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">雷达图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">水球图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">仪表盘</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">K线图</a-button>
        </a-row>
        <a-row>
          <a-button type="dashed" size="mini">漏斗图</a-button>
        </a-row> -->
        <a-button type="dashed" block size="mini" @click="handleEcharts">折线图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">柱状图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">饼图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">地图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">雷达图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">水球图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">仪表盘</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">K线图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts">漏斗图</a-button>
      </a-card>
      <a-card hoverable class="whStyle">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
      <a-card hoverable class="whStyle">
        <template #cover>
          <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
        </template>
        <a-card-meta title="Europe Street beat">
          <template #description>www.instagram.com</template>
        </a-card-meta>
      </a-card>
    </div>

    <!-- 对话框 -->
    <a-modal v-model:open="isModal" width="100%" wrap-class-name="full-modal" :footer="null" :destroyOnClose="true"
      :getContainer="() => Home">
      <echarts-groups :sl="6"></echarts-groups>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref } from 'vue'
import EchartsGroups from './components/EchartsGroups/index.vue'

// ref 响应式对象
const Home = ref(null)
// 是否处于 Electron 环境
let isElectron = window && window.process && window.process.versions && window.process.versions['electron']
// 对话框
let isModal = ref<boolean>(false)

console.log(isElectron)

const handleEcharts = () => {
  if (isElectron) {

  } else {
    isModal.value = true
  }
}

</script>

<style scoped lang="scss">
.home-box {
  .echartDOM {
    .ant-card {
      flex: 1;

      &:nth-of-type(2) {
        margin: 0 20px;
      }

      .ant-row {
        margin: 0 0 10px 0;
      }
    }
  }

  :deep(.full-modal) {
    .ant-modal {
      max-width: 100%;
      height: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
      .ant-modal-content {
        height: 100%;
        .ant-modal-body {
          height: 100%;
          padding: 40px 30px 0;
        }
      }
    }
  }
}
</style>
