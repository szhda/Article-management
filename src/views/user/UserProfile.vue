<template>
  <el-form :model="userInfo" :rules="rules" ref="formRef" label-width="100px">
    <el-form-item label="登录名称">
      <el-input
        v-model="userInfo.username"
        disabled
        placeholder="请输入登录名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="userInfo.nickname"></el-input>
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="userInfo.email"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { userStore } from '@/stores'
import { updateUserData } from '@/api/user'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const {
  user: { username, nickname, email, id },
  getUserData
} = userStore()

const userInfo = ref({ username, nickname, email, id })
const formRef = ref()
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
const submitForm = async () => {
  // 点击先校验
  const valid = await formRef.value.validate()
  if (valid) {
    await updateUserData(userInfo.value)
    await getUserData()
    ElMessage.success('提交修改成功')
  }
}
</script>
