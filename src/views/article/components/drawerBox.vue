<template>
  <!-- 抽屉 -->
  <el-drawer v-model="drawer" title="添加文章" size="50%">
    <el-form :model="formModel">
      <el-form-item label="*文章标题: " prop="title">
        <el-input placeholder="请输入文章标题" v-model="formModel.title">
        </el-input>
      </el-form-item>
      <el-form-item label="*文章分类: " prop="cate_id">
        <channel-select
          style="width: 100%"
          v-model="formModel.cate_id"
        ></channel-select>
      </el-form-item>
    </el-form>
    <el-form-item label="*文章封面: " prop="cover_img"
      ><el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="handleChange"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"
          ><Plus
        /></el-icon> </el-upload
    ></el-form-item>
    <el-form-item label="*文章内容: " prop="content">
      <div class="editor">
        <quill-editor
          theme="snow"
          v-model:content="formModel.content"
          contentType="html"
          ref="getQuill"
        >
        </quill-editor>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onPublic('已发布')">发布</el-button>
      <el-button type="info" @click="onPublic('草稿')">草稿</el-button>
    </el-form-item>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import channelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addArticle } from '@/api/article'
import { ElMessage } from 'element-plus'
import { getArticleDetail, updateArticle } from '@/api/article'
import { baseURL } from '@/utils/requset'
import axios from 'axios'
const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({ ...defaultForm })
const imageUrl = ref('')
const drawer = ref(false)
const getQuill = ref()
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
const open = async (row) => {
  // console.log('open方法被调用')
  drawer.value = true
  //   编辑还是发布
  if (row.id) {
    console.log('编辑')
    const res = await getArticleDetail(row.id)
    formModel.value = res.data.data
    // 回显数据，图片
    imageUrl.value = baseURL + formModel.value.cover_img
    formModel.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      formModel.value.cover_img
    )
  } else {
    // 每次打开发布文章需要重置表单
    console.log('发布')
    formModel.value = { ...defaultForm }
    imageUrl.value = ''
    getQuill.value.setHTML('')
  }
}
const handleChange = (uploadfile) => {
  console.log(uploadfile)
  imageUrl.value = URL.createObjectURL(uploadfile.raw)
  formModel.value.cover_img = uploadfile.raw
}
const onPublic = async (state) => {
  formModel.value.state = state
  // 上传文件数据得用FormData装
  const formData = new FormData()
  for (let k in formModel.value) {
    // let in 方式里的k就是字符型的
    formData.append(k, formModel.value[k])
  }
  if (formModel.value.id) {
    console.log('进行编辑操作')
    await updateArticle(formData)
    ElMessage.success('编辑成功')
    drawer.value = false
    emit('success', 'edit')
  } else {
    console.log('进行添加文章操作')
    // 携带表单数据发送http请求
    console.log(formModel.value)
    await addArticle(formData)
    ElMessage.success('添加成功')
    drawer.value = false
    emit('success', 'add')
  }
}
const emit = defineEmits(['success'])
//对外暴露自己的方法和数据，但是得通过dom节点获取
defineExpose({
  open
})
</script>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
