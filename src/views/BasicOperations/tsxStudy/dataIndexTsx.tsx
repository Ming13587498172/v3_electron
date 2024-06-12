import { defineComponent, ref } from "vue"

export default defineComponent({
  setup () {
    let arr = ref([
      {
        name: '张三',
        age: 18,
      }, {
        name: '李四',
        age: 24,
      }, {
        name: '王五',
        age: 55,
      }, {
        name: '赵二',
        age: 34,
      },
    ])
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <ul>
          {
            arr.value.map((item, index) => {
              return <li key={index} data-index={`${item.name}-${index}`}>{item.name} --- {item.age} --- data-index的值：{`${item.name}-${index}`}</li>
            })
          }
        </ul>
      </div>
    )
  }
})
