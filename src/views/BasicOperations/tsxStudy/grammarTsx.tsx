// 语法支持
import { defineComponent, ref } from "vue"
import { Input } from 'ant-design-vue'

export default defineComponent({
  setup () {
    let isShow = ref(true)
    let isFlag = ref(false)
    let obj = ref([
      { name: '张三', age: 18 },
      { name: '李四', age: 18 },
      { name: '王五', age: 18 },
    ])
    let VModelVal = ref()
    return () => (
      <div class={'box-padding'}>
        <h2>TSX</h2>
        <div v-show={isShow.value}>v-show 语法支持</div>
        <br />
        <div>
          v-if 语法不支持 `{'->'}` 使用 三元表达式 代替
          { isFlag.value === true ? <div>isFlag === true</div> : <div>isFlag === false</div> }
        </div>
        <br />
        <div>
          v-for 语法不支持 `{'->'}` 使用 map函数 代替
          <br />
          v-bind或:传参不支持，直接使用 属性=`{'{属性值}'}`
          <ul>
             {
              obj.value.map(item => {
                return <li name-={item.name}>{item.name} --- {item.age}</li>
              })
            }
          </ul>
        </div>
        <br />
        <div>
          v-model 语法支持
          <Input v-model:value={VModelVal.value} autofocus />
          {/* <input v-model={VModelVal.value} type="text" /> */}
          VModelVal的值变化 --- { VModelVal.value }
        </div>
      </div>
    )
  }
})
