import { DataVItem } from "./config";

/** 基础用法 */
export const percentPond1: DataVItem = {
  dynamicComponentName: 'percent-pond',
  attr: {
    config: {
      value: 66,
    }
  }
}

/** 调节边框 */
export const percentPond2: DataVItem = {
  dynamicComponentName: 'percent-pond',
  attr: {
    config: {
      value: 66,
      borderWidth: 5,
      borderRadius: 10,
      borderGap: 5,
    }
  }
}

/** 线条间隙 */
export const percentPond3: DataVItem = {
  dynamicComponentName: 'percent-pond',
  attr: {
    config: {
      value: 66,
      lineDash: [10, 2],
    }
  }
}

/** 局部渐变 */
export const percentPond4: DataVItem = {
  dynamicComponentName: 'percent-pond',
  attr: {
    config: {
      value: 66,
      localGradient: true,
    }
  }
}

/** 定制块隙长度 */
export const percentPond5: DataVItem = {
  dynamicComponentName: 'percent-pond',
  attr: {
    config: {
      value: 100,
      colors: ['#01c4f9', '#c135ff'],
      lineDash: [0.25, 0.5, 0.25].map(l => [(300 - 3 + 3) * l, 3]).reduce((all, current) => [...all, ...current], [])
    }
  }
}
