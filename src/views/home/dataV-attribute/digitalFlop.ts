import { DataVItem } from "./config";

/** 基本示例 */
export const digitalFlop1: DataVItem = {
  dynamicComponentName: 'digital-flop',
  attr: {
    config: {
      number: [100],
      content: '{nt}个'
    }
  }
}

/** 浮点数 */
export const digitalFlop2: DataVItem = {
  dynamicComponentName: 'digital-flop',
  attr: {
    config: {
      number: [100],
      toFixed: 2,
      content: '{nt}个'
    }
  }
}

/** 多数值 */
export const digitalFlop3: DataVItem = {
  dynamicComponentName: 'digital-flop',
  attr: {
    config: {
      number: [10, 100],
      content: '{nt}个{nt}元'
    }
  }
}

/** 千分位分隔符 */
const formatter = (number: number) => {
  const numbers = number.toString().split('').reverse()
  const segs = []

  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))

  return segs.join(',').split('').reverse().join('')
}
export const digitalFlop4: DataVItem = {
  dynamicComponentName: 'digital-flop',
  attr: {
    config: {
      number: [123456],
      content: '{nt}个',
      formatter
    }
  }
}
