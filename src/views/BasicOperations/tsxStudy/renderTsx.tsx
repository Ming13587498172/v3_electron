// 用 render 渲染函数返回标签
/**
 * 它其实是一个函数，它里面可以放一个对象，有点类似vue2的写法
 * 下面定义一个 render 渲染函数，里面返回标签
 * 注意 tsx 里面使用变量使用的是 单括号
 */
import { defineComponent } from "vue"
export default defineComponent({
    data () {
      return {
        name: '张三'
      }
    },
    render () { 
      return (
        <div class={'box-padding'}>
          <h2>TSX</h2>
          <div>使用 render 渲染函数返回的标签</div>
        </div>
      )
    }
})
