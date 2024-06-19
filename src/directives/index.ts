import { App } from "vue"
// input 输入框 自动获取焦点
import focus from './global/focus'

// 第二种(目前失败)
// let directives = import.meta.glob('./global/**/*.ts')

export default (app: App<Element>) => {
  /** 第一种：单个导入并注册 */
  app.directive('focus', focus)
  /** 第二种(目前失败)：导入全部并逐个遍历进行注册 */
  // Object.keys(directives).forEach(key => {
  //   let k = key.match(/^.*\/([^/]+)\.[^.]+$/)
  //   app.directive(k![1], (directives as { [key: string]: Directive })[key])
  // })
}
