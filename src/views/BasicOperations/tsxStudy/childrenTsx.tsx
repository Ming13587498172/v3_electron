import { defineComponent, ref  } from "vue"

type Props = {
  title?: string
}

export default defineComponent({
  setup (props: Props, ctx) {
    console.log("🚀 ~ setup ~ props:", props)
    let childrenVal = ref('子值')
    let toFatherVal = ref('子向父传参')
    const toFatherFn = () => {
      ctx.emit('custom-event', toFatherVal.value)
    }
    return () => (
      <div class={'box-padding'}>
        <div>来自父组件的值：{ctx.attrs.title}</div>
        <div onClick={toFatherFn}>子组件的值：{childrenVal.value} {'<---'} 点击</div>
      </div>
    )
  }
})
