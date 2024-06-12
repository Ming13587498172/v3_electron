import { defineComponent } from 'vue'

export default defineComponent({
  setup (_, { slots }) {
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div class="default">{slots.default?.()}</div>
        <div class="mssage">{slots.mssage?.({ msg: '这是 具名插槽 的内容' })}</div>
      </div>
    )
  }
})
