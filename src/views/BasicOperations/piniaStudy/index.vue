<template>
  <div class="whStyle box-padding pinia-style-box">
    <h2>Pinia-Study</h2>

    <a-form layout="inline" :model="formState">
      <a-form-item>
        <a-input v-model:value="formState.name"></a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formState.age"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" size="small" :disabled="formState.name === '' || formState.age === undefined" @click="handleFinish">添加</a-button>
        <a-button type="primary" size="small" @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>

    <a-list item-layout="horizontal" size="small" :data-source="userList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.age">
            <template #title>
              <h3>{{ item.name }}</h3>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts" name="PiniaStudy">
import { usePiniaStudyStore } from '@/store'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
import type { FormProps } from 'ant-design-vue'



const { userList } = storeToRefs(usePiniaStudyStore())
const { addUser, resetData } = usePiniaStudyStore()


interface FormState {
  name: string;
  age: number | undefined;
}
const formState = reactive<FormState>({
  name: '',
  age: undefined,
});
const handleFinish: FormProps['onFinish'] = () => {
  addUser(formState.name, formState.age)
}
const handleReset = () => {
  resetData()
}

</script>

<style scoped lang="scss">
.pinia-style-box {}
</style>
