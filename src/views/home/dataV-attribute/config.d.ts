export type DataVItem = {
  /** 标签名 */
  dynamicComponentName: string,
  /** 属性 */
  attr?: DdtaVAttrItem,
}

interface DdtaVAttrItem {
  /** 单次动画时长(秒) - 默认值：
   *  @ decoration2 -> 6
   *  @ decoration5 -> 1.2
  */
  dur?: number,
  /** 是否反转 - 默认值：false */
  reverse?: boolean,
  /** 扫描动画时长(秒) - 默认值：2 */
  scanDur?: number,
  /** 光晕动画时长(秒 - 默认值：) 3*/
  haloDur?: number,
  /** chart图表的option数据
   * @ 相关示例请移步Charts实例：http://charts.jiaminghi.com/example/
   * @ 相关配置项请移步Charts配置项：http://charts.jiaminghi.com/config/
   */
  option?: any,
  /** 边框标题 */
  title?: string,
  /** 标题宽度 */
  titleWidth?: number,
  /** 颜色 */
  color?: string | string[],
  /** 背景色 
   * @ 颜色支持 十六进制 | hex | rgb | rgba 颜色关键字等四种类型。
  */
  backgroundColor?: string,
  /** 字体颜色 - 默认值：默认和 color 相同 */
  fontColor?: string,
  /** 字体大小 - 默认值：14 */
  fontSize?: number,
  /** 是否显示背景 - 默认值：true */
  bg?: boolean,
  /** 边框类型 - 默认值：Border1
   * @ Border1 到 Border6, 也可以传入自己的 svg 组件或 datav 的边框组件
  */
  border?: string | Component,
  /** 配置 */
  config?: DataVAttrConfigItem,
  /** 数字是否使用DigitalFlop显示 */
  isDigitalFlop?: boolean,
}

interface DataVAttrConfigItem {
  /** 数据 - 默认值：[] */
  data?: DataVAttrConfigDataItem[] | number[]
  /** 柱颜色 - 默认值：'rgba(0, 194, 255, 0.4)' */
  columnColor?: string,
  /** 柱顶图片url - 默认值：[] */
  img?: string[],
  /** 图片边长 - 默认值：30 */
  imgSideLength?: number,
  /** 文字大小 - 默认值：12 */
  fontSize?: number,
  /**  */
  showValue?: boolean
  /** 进度池数值 - 默认值：0
   * @ 范围：0-100
  */
  value?: number
  /** 边框宽度 - 默认值：3 */
  borderWidth?: number
  /** 边框半径 - 默认值：5 */
  borderRadius?: number
  /** 边框间隙 - 默认值：3 */
  borderGap?: number
  /** 线条间隙 - 默认值：[5, 1] */
  lineDash?: number[]
  /** 局部渐变 - 默认值：false */
  localGradient?: boolean
  /** 配色
   * @ 进度池 - 默认值：['#3DE7C9', '#00BAFF']
   * @ 水位图 - 默认值：['#00BAFF', '#3DE7C9']
   * @ 胶囊柱图 - 默认值：['#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293']
   * @ 默认配色, 自动应用渐变色，若不想使用渐变色，请配置两个相同的颜色。
   * @ 颜色支持 十六进制 | hex | rgb | rgba 颜色关键字等四种类型。
  */
  colors?: string[],
  /** 文字颜色 - 默认值：#fff
   * @ 颜色支持 十六进制 | hex | rgb | rgba 颜色关键字等四种类型。
  */
  textColor?: string,
  /** 格式化	 */
  formatter?: function,
  /** 水位图形状
   * @ 默认值：'rect'
   * @ 有三种形状可供选择：矩形rect、圆角矩形roundRect、圆形round
  */
  shape?: string,
  /** 波浪数量 - 默认值：3 */
  waveNum?: number,
  /** 波浪高度 - 默认值：40 */
  waveHeight?: number,
  /** 波浪透明度 - 默认值：0.4 */
  waveOpacity?: number,
  /** 单位 */
  unit?: string,
  /** 显示数值 */
  showValue?: boolean,
  /** 标签显示数量 - 默认值：6 */
  labelNum?: number,
  /** 环线条宽度 - 默认值：20 */
  lineWidth?: number,
  /** 数字小数位数 - 默认值：0 */
  numToFixed?: number,
  /** 环半径 - 默认值：'50%'
   * @ string - 百分比 - 50%
   * @ number - 数值 - 100
  */
  radius?: string | number,
  /** 环半径(动态) - 默认值：'55%'
   * @ string - 百分比 - 55%
   * @ number - 数值 - 110
  */
  activeRadius?: string | number,
  /** 切换间隔(ms) - 默认值：3000 */
  activeTimeGap?: number,
  /** 环颜色 - 颜色支持 十六进制 | hex | rgb | rgba 颜色关键字等四种类型 */
  color?: string[],
  /** 显示原始值 - 默认值：false */
  showOriginValue?: boolean,
  /** 动效帧数
   * @ 默认值：50
   * @ 用于配置动画过程的帧数即动画时长。
  */
  animationFrame?: number,
  /** 动效曲线
   * @ 默认值：'easeOutCubic'
   * @ 可选值请查阅：http://transition.jiaminghi.com/curveTable/
  */
  animationCurve?: string,
  /** 数字翻牌器样式
   * @ 默认值：'50%'
   * @ 配置内置的数字翻牌器样式 - 详情可查阅：http://datav.jiaminghi.com/guide/digitalFlop.html#%E5%9F%BA%E6%9C%AC%E7%A4%BA%E4%BE%8B */
  digitalFlopStyle?: DataVAttrConfigDigitalFlopStyleItem,
  /** 数字翻牌器单位 - 默认值：'' */
  digitalFlopUnit?: string,
  /** 数字翻牌器小数位数 - 默认值：0 */
  digitalFlopToFixed?: number,
  /** 数字数值
   * @ 默认值：[]
   * @ number中的元素将被用于替换content内容模版中的{nt}标记，其替换顺序与模版标记的顺序一一对应：如下
   * @ const number = [1, 2, 3, 4]
   * @ const content = '数字{nt},数字{nt},数字{nt},数字{nt}'
   * @ 实际显示效果：'数字1,数字2,数字3,数字4'
  */
  number?: number[],
  /** 内容模版
   * @ 默认值：''
   * @ number中的元素将被用于替换content内容模版中的{nt}标记，其替换顺序与模版标记的顺序一一对应：如下
   * @ const number = [1, 2, 3, 4]
   * @ const content = '数字{nt},数字{nt},数字{nt},数字{nt}'
   * @ 实际显示效果：'数字1,数字2,数字3,数字4'
  */
  content?: string,
  /** 小数位数 - 默认值：0 */
  toFixed?: number,
  /** 水平对齐方式
   * @ 默认值：'center'
   * @ textAlign用于设置文字的水平对齐方式
   * @ 可选值为 'center' | 'left' | 'right' ，该值将覆盖style属性中的textAlign属性。
  */
  textAlign?: string,
  /** 行间距
   * @ 默认值：0
   * @ 当使用 \n 进行换行的时候，rowGap可以控制行间距。
   */
  rowGap?: number,
  /** 样式配置
   * @ 详情可查阅：http://crender.jiaminghi.com/guide/style.html
   */
  style?: DataVAttrConfigDigitalFlopStyleItem,
}

type DataVAttrConfigDataItem = {
  /** 名称 */
  name: string,
  /** 数值	 */
  value: number,
}

/** 更多配置：http://crender.jiaminghi.com/guide/style.html */
type DataVAttrConfigDigitalFlopStyleItem = {
  /** 字体大小 */
  fontSize?: number,
  /** 字体颜色 */
  fill?: string
}
