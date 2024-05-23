<template>
  <div ref="Home" class="whStyle box-padding home-box">
    <div class="whStyle flex echartDOM">
      <a-card hoverable class="whStyle hide-scrollbar">
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
      <a-card hoverable class="whStyle hide-scrollbar">
        <h1>DataV</h1>
        <a-button type="dashed" block size="mini" @click="handleDataV('border')">边框</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('decoration')">装饰</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('charts')">图表</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('fullScreen')">全屏容器</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('loading')">Loading加载</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('button')">按钮</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('conicalColumn')">锥形柱图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('percentPond')">进度池</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('waterLevelPond')">水位图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('flylineChartEnhanced')">飞线图增强版</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('flylineChart')">飞线图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('scrollRankingBoard')">排名轮播图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('scrollBoard')">轮播图(表)</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('capsuleChart')">胶囊柱图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('activeRingChart')">动态环图</a-button>
        <a-button type="dashed" block size="mini" @click="handleDataV('digitalFlop')">数字翻牌器</a-button>
      </a-card>
      <a-card hoverable class="whStyle hide-scrollbar">
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
      :getContainer="() => Home" @cancel="close">
      <echarts-groups v-if="echartsOptions.length > 0" :optionList="echartsOptions"></echarts-groups>
      <data-v-groups v-if="dataVAttribute.length > 0" :optionList="dataVAttribute"></data-v-groups>
    </a-modal>
  </div>
</template>

<script setup lang="ts" name="Home">
import { ref } from 'vue'
import EchartsGroups from './components/EchartsGroups/index.vue'
import DataVGroups from './components/DataVGroups/index.vue'
// ref 响应式对象
const Home = ref(null)
// 是否处于 Electron 环境
let isElectron = window && window.process && window.process.versions && window.process.versions['electron']
// 定义 electron 内置的API
let ipcRenderer: any
// 对话框
let isModal = ref<boolean>(false)

// echarts-option
let echartsOptions = ref<any>([])
// 查看 echarts 图表
const handleEcharts = async (type?: string) => {
  let timer
  if (isElectron) {
    import("@vueuse/electron").then(({ useIpcRenderer }) => {
      ipcRenderer = useIpcRenderer()
    }).then(() => {
      importOptions(type as string)
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
    importOptions(type as string)
    isModal.value = true
  }
  clearTimeout(timer)
  echartsOptions.value = []
}

// dataV-attribute
let dataVAttribute = ref<any>([])
// 查看 DataV 图表
const handleDataV = async (type?: string) => {
  let timer
  if (isElectron) {
    import("@vueuse/electron").then(({ useIpcRenderer }) => {
      ipcRenderer = useIpcRenderer()
    }).then(() => {
      importOptions(type as string)
      ipcRenderer.send('open-new-window', {
        width: 1000,
        height: 800,
        route: '/index/DataVGroups',
      })
      timer = setTimeout(() => {
        ipcRenderer.send('get-charts-options', JSON.stringify(dataVAttribute.value))
      }, 200)
    })
  } else {
    importOptions(type as string)
    isModal.value = true
  }
  clearTimeout(timer)
  dataVAttribute.value = []
}

// 导入对应的 option/attribute 数据
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
    case 'border':
      await import('./dataV-attribute/border').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'decoration':
      await import('./dataV-attribute/decoration').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'charts':
      await import('./dataV-attribute/charts').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'fullScreen':
      await import('./dataV-attribute/fullScreen').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'loading':
      await import('./dataV-attribute/loading').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'button':
      await import('./dataV-attribute/button').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'conicalColumn':
      await import('./dataV-attribute/conicalColumn').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'percentPond':
      await import('./dataV-attribute/percentPond').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'waterLevelPond':
      await import('./dataV-attribute/waterLevelPond').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'flylineChartEnhanced': 
      await import('./dataV-attribute/flylineChartEnhanced').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'flylineChart': 
      await import('./dataV-attribute/flylineChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'scrollRankingBoard':
      await import('./dataV-attribute/scrollRankingBoard').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'scrollBoard':
      await import('./dataV-attribute/scrollBoard').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    case 'capsuleChart': 
      await import('./dataV-attribute/capsuleChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
      case 'activeRingChart': 
      await import('./dataV-attribute/activeRingChart').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
      case 'digitalFlop': 
      await import('./dataV-attribute/digitalFlop').then((res: any) => {
        Object.keys(res).forEach(key => {
          dataVAttribute.value.push(res[key])
        })
      })
      break
    default:
      break
  }
}

// a-modal关闭事件
const close = () => {
  echartsOptions.value = []
  dataVAttribute.value = []
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
    .hide-scrollbar {
      overflow: auto; /* 启用滚动 */
      -ms-overflow-style: none; /* IE 和 Edge */
      scrollbar-width: none; /* Firefox */
    }
    
    /* 兼容所有浏览器的通用方法 */
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
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
