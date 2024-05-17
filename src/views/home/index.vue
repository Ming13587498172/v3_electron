<template>
  <div ref="Home" class="whStyle box-padding home-box">
    <div class="whStyle flex echartDOM">
      <a-card hoverable class="whStyle">
        <h1>Echarts</h1>
        <a-button type="dashed" block size="mini" @click="handleEcharts('line')">折线图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('bar')">柱状图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('pie')">饼图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('map')">地图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('radar')">雷达图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('liqiu')">水球图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('gauge')">仪表盘</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('k')">K线图</a-button>
        <a-button type="dashed" block size="mini" @click="handleEcharts('funnel')">漏斗图</a-button>
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
      :getContainer="() => Home" :cancel="echartsOptions = []">
      <echarts-groups :optionList="echartsOptions"></echarts-groups>
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
// 定义 electron 内置的API
let ipcRenderer: any
// echarts-option
let echartsOptions = ref<any>([])
// 对话框
let isModal = ref<boolean>(false)

// 查看 echarts 图表
const handleEcharts = async (type: string) => {
  let timer
  if (isElectron) {
    import("@vueuse/electron").then(({ useIpcRenderer }) => {
      ipcRenderer = useIpcRenderer()
    }).then(() => {
      importOptions(type)
      ipcRenderer.send('open-new-window', {
        width: 1000,
        height: 800,
        route: '/index/EchartsGroups',
      })
      timer = setTimeout(() => {
        ipcRenderer.send('get-charts-options', JSON.stringify(echartsOptions.value))
      }, 200)
    })
  } else {
    importOptions(type)
    isModal.value = true
  }
  clearTimeout(timer)
  echartsOptions.value = []
}

// 导入对应的 option 数据
const importOptions = async (type: string) => {
  switch (type) {
    case 'line':
      await import('./echarts-options/LineChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'bar':
      await import('./echarts-options/BarChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'pie':
      await import('./echarts-options/PieChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'map':
      await import('./echarts-options/MapChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'radar':
      await import('./echarts-options/RadarChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'liqiu':
      await import('./echarts-options/LiQiuChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'gauge':
      await import('./echarts-options/GaugeChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'k':
      await import('./echarts-options/KChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    case 'funnel':
      await import('./echarts-options/FunnelChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          echartsOptions.value.push(res[key])
        })
      })
      break
    default:
      break
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
./echarts-options/line
./echarts-options/LineChart
