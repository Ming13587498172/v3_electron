import { defineComponent, ref } from "vue"
import ChildrenTsx from './childrenTsx'

export default defineComponent({
  setup () {
    let fatherVal = ref('父值')
    let fromChildVal = ref()
    let toChildVal = ref('父向子传参')
    // const fromChildFn = (item: string) => {
    //   fromChildVal.value = item
    // }
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div>父组件的值：{fatherVal.value}</div>
        <div>来自子组件的值：{fromChildVal.value}</div>
        <br />
        {/* <ChildrenTsx></ChildrenTsx> */}
        {/* <ChildrenTsx title={toChildVal.value as string} onCustomEvent={fromChildFn}></ChildrenTsx> */}
        <ChildrenTsx title={toChildVal.value as string}></ChildrenTsx>
      </div>
    )
  }
})
