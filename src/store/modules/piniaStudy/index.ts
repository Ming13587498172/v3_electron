import { defineStore } from 'pinia'
import { ref } from 'vue'

type userItem = {
  id: number,
  name: string,
  age: number | undefined
}

export const usePiniaStudyStore = defineStore('piniaStudy', () => {
  let userList = ref<userItem[]>([
    {
      id: 1,
      name: '张三',
      age: 18
    }, {
      id: 2,
      name: '李四',
      age: 22
    }, {
      id: 3,
      name: '王五',
      age: 33
    }
  ])

  const addUser = (name: string, age: number | undefined) => {
    userList.value.push(
      {
        id: userList.value.length + 1,
        name,
        age
      }
    )
  }

  const resetData = () => {
    userList.value = userList.value.splice(0, 3)
  }

  return {
    userList,
    addUser,
    resetData
  }
}, {
  persist: true,
})
