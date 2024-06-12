// 使用setup函数,然后返回一个渲染函数
import { defineComponent } from "vue"
export default defineComponent({
  setup () {
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div>使用 setup 函数，然后返回一个渲染函数</div>
      </div>
    )
  }
})
