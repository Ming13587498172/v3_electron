import { DataVItem } from "./config"

/** 矩形水位图 */
export const waterLevelPond1: DataVItem = {
  dynamicComponentName: 'water-level-pond',
  attr: {
    config: {
      data: [66],
    }
  },
}

/** 圆角水位图 */
export const waterLevelPond2: DataVItem = {
  dynamicComponentName: 'water-level-pond',
  attr: {
    config: {
      data: [66, 45],
      shape: 'roundRect',
    }
  },
}

/** 圆形水位图 */
export const waterLevelPond3: DataVItem = {
  dynamicComponentName: 'water-level-pond',
  attr: {
    config: {
      data: [55],
      shape: 'round',
    }
  },
}
