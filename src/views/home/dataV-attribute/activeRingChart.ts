import { DataVItem } from "./config";

/** 基础用法 */
export const activeRingChart1: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
      data: [
        {
          name: '杭州',
          value: 98,
        },
        {
          name: '金华',
          value: 150,
        },
        {
          name: '宁波',
          value: 62,
        },
        {
          name: '太原',
          value: 54,
        },
      ],
      lineWidth: 24,
      digitalFlopStyle: {
        fill: 'pink',
      },
    }
  }
}

/** 数字不使用DigitalFlop */
export const activeRingChart2: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
      data: [
        {
          name: '杭州',
          value: 98,
        },
        {
          name: '金华',
          value: 150,
        },
        {
          name: '宁波',
          value: 62,
        },
        {
          name: '太原',
          value: 54,
        },
      ],
      lineWidth: 24,
      digitalFlopStyle: {
        fill: 'pink',
      },
      numToFixed: 2,
    }
  }
}

/** 基本示例 */
export const activeRingChart3: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
      data: [
        {
          name: '周口',
          value: 55
        },
        {
          name: '南阳',
          value: 120
        },
        {
          name: '西峡',
          value: 78
        },
        {
          name: '驻马店',
          value: 66
        },
        {
          name: '新乡',
          value: 80
        }
      ]
    }
  }
}

/** 线条粗细 */
export const activeRingChart4: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
       data: [
        {
          name: '周口',
          value: 55
        },
        {
          name: '南阳',
          value: 120
        },
        {
          name: '西峡',
          value: 78
        },
        {
          name: '驻马店',
          value: 66
        },
        {
          name: '新乡',
          value: 80
        }
      ],
      lineWidth: 10
    }
  }
}

/** 调节半径 */
export const activeRingChart5: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
      radius: '40%',
      activeRadius: '45%',
      data: [
        {
          name: '周口',
          value: 55
        },
        {
          name: '南阳',
          value: 120
        },
        {
          name: '西峡',
          value: 78
        },
        {
          name: '驻马店',
          value: 66
        },
        {
          name: '新乡',
          value: 80
        }
      ],
      digitalFlopStyle: {
        fontSize: 20
      }
    }
  }
}

/** 显示原始值 */
export const activeRingChart6: DataVItem = {
  dynamicComponentName: 'active-ring-chart',
  attr: {
    config: {
      radius: '40%',
      activeRadius: '45%',
      data: [
        {
          name: '周口',
          value: 55
        },
        {
          name: '南阳',
          value: 120
        },
        {
          name: '西峡',
          value: 78
        },
        {
          name: '驻马店',
          value: 66
        },
        {
          name: '新乡',
          value: 80
        }
      ],
      digitalFlopStyle: {
        fontSize: 20
      },
      showOriginValue: true
    }
  }
}

