/** xlsx解析后，合并单元格的位置信息 */
export type MergesItem = {
  /** 起始位置 */
  s?: MergeChildrenItem
  /** 结束位置 */
  e?: MergeChildrenItem,
}
type MergeChildrenItem = {
  /** 列 */
  c: number,
  /** 行 */
  r: number
}

/** xlsx解析后，单元格的信息 */
export type CellItem = {
  /** 富文本格式的HTML呈现 */
  h?: string,
  /** 单元格类型
   * @ s -> 字符串
   * @ b -> 布尔值
   * @ n -> 数字
   * @ r -> 日期
   * @ e -> 错误
   */
  t?: string,
  /** 原始值 */
  v?: string,
  /** 格式化文本 */
  w?: string,
  /** 单元格公式 */
  f?: string,
  /** 富文本编码 */
  r?: string,
  /** 与单元格相关的评论 */
  c?: string,
  /** 与单元格相关的数字格式字符串 */
  z?: string,
  /** 但与那个超链接对象(Target包含链接，tooltip为工具提示) */
  l?: string,
  /** 单元格样式主题 */
  s?: string,
}

/**
 * 表格定义类型
 * @ 更多API请查询官网 - https://www.antdv.com/components/table-cn#api
 */
export type AntTableColumnItem = {
  /** 
   * 列头显示文字
   * @ 类型：string
   */
  title?: string,
  /** 
   * 唯一
   * @ 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
   * @ 类型：string | string[]
   */
  dataIndex?: string,
  /** 
   * Vue需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性
   * @ 类型：string
   */
  key?: string,
  /** 
   * 设置列的对齐方式
   * @ 默认值：left
   * @ 可选值：left | right | center
   * @ 类型：string
   */
  align?: string,
  /** 
   * 设置单元格属性
   * @ 类型：Function(record, rowIndex, column)
   */
  customCell?: function
}
