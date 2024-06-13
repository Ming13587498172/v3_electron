import { defineStore } from 'pinia'
import { ref } from 'vue'

type toduItem = {
  id: number,
  title: string,
  isChecked: boolean,
}

export const useTODOPinia = defineStore('todoPinia', () => {
  let todoList = ref<toduItem[]>([])
  let editTodoList = ref<toduItem[]>([])

  const addTodo = (title: string) => {
    todoList.value.push({
      id: todoList.value.length + 1,
      title,
      isChecked: false
    })
    editTodoList.value = JSON.parse(JSON.stringify(todoList.value))
  }

  const editTodoChecked = (id: number) => {
    todoList.value[todoList.value.findIndex(item => item.id === id)].isChecked = !todoList.value[todoList.value.findIndex(item => item.id === id)].isChecked
  }

  const editTodo = (type: string) => {
    switch (type) {
      case 'all':
        editTodoList.value = JSON.parse(JSON.stringify(todoList.value))
        break;
      case 'isTrue':
        editTodoList.value = todoList.value.filter(item => item.isChecked === true)
        break;
      case 'isFalse':
        editTodoList.value = todoList.value.filter(item => item.isChecked === false)
        break;
      default:
        break;
    }
  }

  const delTodo = () => {
    /** 利用 filter 返回 id 不等同的数据 */ 
    // todoList.value = todoList.value.filter(item => item.id !== id)
    /** 利用 splice 删除 id 等同的数据 */
    // todoList.value = todoList.value.splice(todoList.value.findIndex(item => item.id === id), 1)
    todoList.value = todoList.value.filter(item => item.isChecked === false)
    editTodoList.value = JSON.parse(JSON.stringify(todoList.value))
  }

  const resetTodo = () => {
    todoList.value = []
  }

  return {
    todoList,
    editTodoList,
    addTodo,
    editTodoChecked,
    editTodo,
    delTodo,
    resetTodo,
  }
}, {
  persist: true,
})
