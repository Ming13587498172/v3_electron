import { defineComponent, ref } from 'vue'
import { Button } from 'ant-design-vue'

export default defineComponent({
  setup () {
    let num = ref(0)
    const handleAdd = () => {
      num.value++
    }
    const handleAdd1 = (n: number) => {
      num.value += n
    }
    // const handleAdd2 = () => {
    //   num.value *= 100
    // }
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <p>num：{num.value}</p>
        <br />
        <div>
          <p>内联写法</p>
          { `<Button onClick={() => {num.value++}}>++</Button>` }
          <br />
          <Button onClick={() => {num.value++}}>++</Button>
        </div>
        <br />
        <br />
        <div>
          <p>直接调用方法</p>
          { `<Button onClick={handleAdd}>++</Button>` }
          <br />
          <Button onClick={handleAdd}>++</Button>
        </div>
        <br />
        <br />
        <div>
          <p>调方法的同时传参</p>
          { `<Button onClick={() => handleAdd1(2)}>++</Button>` }
          <br />
          <Button onClick={() => handleAdd1(2)}>+2</Button>
        </div>
        <br />
        <br />
        <div>
          <p>事件修饰符 --- 但好像没生效</p>
          { `<Button onClickOnce={handleAdd2}>++</Button>` }
          <br />
          {/* <Button onClickOnce={handleAdd2}>*100</Button> */}
        </div>
      </div>
    )
  }
})
