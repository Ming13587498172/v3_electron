import { defineComponent } from "vue"
import SlotChildTsx from "./slotChildTsx"

export default defineComponent({
  setup () {
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div>
          <p>默认插槽</p>
          <SlotChildTsx>
            {{
              default: () => <p>这是 默认插槽 的内容</p>,
            }}
          </SlotChildTsx>
        </div>
        <br />
        <br />
        <div>
          <p>具名插槽，并传值</p>
          {/* <SlotChildTsx>
            {{
              mssage: ({ msg }) => <p>{ msg }</p>,
            }}
          </SlotChildTsx> */}
        </div>
      </div>
    )
  }
})
