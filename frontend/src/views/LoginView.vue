<script setup>
import { ref } from 'vue'
import { userWhiteList } from '../utils/constant.js'
const name = ref('')
const password = ref('')
function login() {
  console.log(1, name.value, password.value)
  if (userWhiteList.some(item => item.name === name.value || item.phoneNumber === name.value)) {
    // TODO: 登录接口和逻辑
  }
}
function reset() {
  name.value = ''
  password.value = ''
}
</script>

<template>
  <div>
    <div>
      账号：<input v-model="name" placeholder="请输入账号或手机号" type="text" />
    </div>
    <div>
      密码：<input v-model="password" placeholder="请输入密码" type="password" />
    </div>
    <div>
      <button @click="login">下一步</button>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>
