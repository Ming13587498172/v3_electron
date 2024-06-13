<template>
  <div class="whStyle box-padding todo-pinia-box">
    <h2>TODO-Pinia</h2>
    <a-input v-model:value.lazy="todoVal" @keyup.enter="todoAdd" ></a-input>
    <ul>
      <li v-for="item in editTodoList" :key="item.id">
        <a-checkbox v-model:checked="item.isChecked" @change="editTodoChecked(item.id)">{{ item.title }}</a-checkbox>
      </li>
      <li>
        <a-tag color="green" @click="todoEdit('all')">全部</a-tag>
        <a-tag color="orange" @click="todoEdit('isTrue')">处理中</a-tag>
        <a-tag color="blue" @click="todoEdit('isFalse')">未处理</a-tag>
        <a-tag color="red" @click="delTodo">删除</a-tag>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="TodoPinia">
import { useTODOPinia } from '@/store/modules/piniaStudy/todoPinia'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

let todoVal = ref<string>()

const { editTodoList } = storeToRefs(useTODOPinia())
const { addTodo, editTodo, editTodoChecked, delTodo } = useTODOPinia()

const todoAdd = () => {
  addTodo(todoVal.value?.trim() as string)
}

const todoEdit = (type: string) => {
  editTodo(type)
}
</script>

<style scoped lang="scss">
.todo-pinia-box {
  
}
</style>
