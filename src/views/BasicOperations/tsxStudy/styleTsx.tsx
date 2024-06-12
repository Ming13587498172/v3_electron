import { defineComponent } from "vue"

export default defineComponent({
  setup() {
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div>
          行内样式不变
          <p style="color: #f00; font-size: 30px;">Red</p>
          { `<p style="color: #f00; font-size: 30px;"></p>` }
          <br />
          <br />
          <p>引入外部 css 文件</p>
          { `1、import "./base.css" 2、<p class="blue">blue</p>` }
          <br />
          <br />
          <p>css module</p>
          { `1、import styles from "./children.module.css" 2、<p class={styles.yellow}>blue</p>` }
        </div>
      </div>
    )
  },
})
