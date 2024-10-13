<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :show-file-list="false"
      :auto-upload="false"
      :on-change="onUploadFile"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-button
      type="primary"
      @click="uploadRef.$el.querySelector('input').click()"
      >修改图片</el-button
    >
    <el-button type="success" @click="handleSubmit">上传图片</el-button>
  </page-container>
</template>
<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
import { submitImg } from '@/api/user'
import { ElMessage } from 'element-plus'
const uploadRef = ref()
const useStore = userStore()
const imageUrl = ref(useStore.user.user_pic)
const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
  }
}
const handleSubmit = async () => {
  console.log('上传图片')

  //  上传头像
  await submitImg(imageUrl.value)
  //   发送请求更新用户数据
  await useStore.getUserData()
  ElMessage.success('上传图片成功')
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
