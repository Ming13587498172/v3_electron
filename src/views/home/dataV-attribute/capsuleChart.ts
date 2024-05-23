import { DataVItem } from "./config";

/** 综合 */
export const capsuleChart1: DataVItem = {
  dynamicComponentName: 'capsule-chart',
  attr: {
    config: {
      data: [
        {
          name: '南阳',
          value: 167
        },
        {
          name: '周口',
          value: 123
        },
        {
          name: '漯河',
          value: 98
        },
        {
          name: '郑州',
          value: 75
        },
        {
          name: '西峡',
          value: 66
        },
      ],
      textColor: '#000',
      colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
      unit: '万元',
      showValue: true,
      labelNum: 8,
    }
  }
  
}

/** 基本示例 */
export const capsuleChart2: DataVItem = {
  dynamicComponentName: 'capsule-chart',
  attr: {
    config: {
      data: [
        {
          name: '南阳',
          value: 167
        },
        {
          name: '周口',
          value: 67
        },
        {
          name: '漯河',
          value: 123
        },
        {
          name: '郑州',
          value: 55
        },
        {
          name: '西峡',
          value: 98
        }
      ],
      textColor: '#000',
    }
  }
}

/** 单位显示 */
export const capsuleChart3: DataVItem = {
  dynamicComponentName: 'capsule-chart',
   attr: {
    config: {
      data: [
        {
          name: '南阳',
          value: 167
        },
        {
          name: '周口',
          value: 67
        },
        {
          name: '漯河',
          value: 123
        },
        {
          name: '郑州',
          value: 55
        },
        {
          name: '西峡',
          value: 98
        },
      ],
      unit: '单位',
      textColor: '#000',
    }
  }
}

/** 更换颜色 */
export const capsuleChart4: DataVItem = {
  dynamicComponentName: 'capsule-chart',
   attr: {
    config: {
      data: [
        {
          name: '南阳',
          value: 167
        },
        {
          name: '周口',
          value: 123
        },
        {
          name: '漯河',
          value: 98
        },
        {
          name: '郑州',
          value: 75
        },
        {
          name: '西峡',
          value: 66
        },
      ],
      colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
      unit: '单位',
      textColor: '#000',
    }
  }
}

/** 显示数值 */
export const capsuleChart5: DataVItem = {
  dynamicComponentName: 'capsule-chart',
   attr: {
    config: {
      data: [
        {
          name: '南阳',
          value: 167
        },
        {
          name: '周口',
          value: 123
        },
        {
          name: '漯河',
          value: 98
        },
        {
          name: '郑州',
          value: 75
        },
        {
          name: '西峡',
          value: 66
        },
      ],
      colors: ['#e062ae', '#fb7293', '#e690d1', '#32c5e9', '#96bfff'],
      unit: '单位',
      showValue: true,
      textColor: '#000',
    }
  }
}
