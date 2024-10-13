<script setup>
import { ref } from 'vue'
import { updateChannelList, addChannelList } from '@/api/article.js'
import { ElMessage } from 'element-plus'
const emit = defineEmits('success')
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const formRef = ref()
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是1-15位的字母数字',
      trigger: 'blur'
    }
  ]
}
// 让外部可以使用调用组件内部的方法
const open = async (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
  console.log(formModel.value, '收集的表单数据')
}
const onHandle = async () => {
  await formRef.value.validate()
  // 根据数据是否存在，发送不同的请求,之后消息提示框
  formModel.value.id
    ? await updateChannelList(formModel.value)
    : await addChannelList(formModel.value)
  ElMessage({
    type: 'sucess',
    message: formModel.value.id ? '编辑分类成功' : '添加分类成功'
  })
  dialogVisible.value = false
  emit('success')
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form :data="formModel" :rules="rules" ref="formRef">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          maxlength="10"
          minlength="1"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          maxlength="10"
          minlength="10"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onHandle"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
