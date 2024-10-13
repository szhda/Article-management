<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelSelect from './components/ChannelSelect.vue'
import { getArticle, deleteArticle } from '@/api/article.js'
import { timeFormat } from '@/utils/format'
import drawerBox from './components/drawerBox.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const articleList = ref([])
const total = ref()
const loading = ref(false)
const node = ref()
// articleList.value = [
//   {
//     Id: 5961,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:53:52.604',
//     state: '已发布',
//     cate_name: '体育'
//   },
//   {
//     Id: 5962,
//     title: '新的文章啊',
//     pub_date: '2022-07-10 14:54:30.904',
//     state: '草稿',
//     cate_name: '体育'
//   }
// ]
const getArticleList = async () => {
  // 加载效果
  loading.value = true
  // console.log('请求文章详情数据')
  const res = await getArticle(params.value)
  articleList.value = res.data.data
  console.log(res.data.data)
  total.value = res.data.total
  loading.value = false
}

const onEdit = (row) => {
  node.value.open(row)
}
const onDelete = (row) => {
  ElMessageBox.confirm('您确定要删除这条文章数据吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
    .then(async () => {
      await deleteArticle(row.id)
      ElMessage.success('删除成功')
      getArticleList()
    })
    .catch(() => {
      ElMessage.success('无事发生')
    })
}
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const handleCurrentChange = (page) => {
  // 页面跳转只需要修改页面即可，再请求数据
  params.value.pagenum = page
  getArticleList()
}
const handleSizeChange = (size) => {
  // 当页面数据条数，发生改变时候，应该跳转到第一个页面并修改卖数据再请求渲染
  params.value.pagenum = 1
  params.value.pagesize = size
  getArticleList()
}
const handleSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const handleReset = () => {
  // 重置数据清空，分页当前页面重置为1
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const showBox = () => {
  node.value.open({})
}
const onSuccess = (type) => {
  if (type === 'add') {
    // 更改页面的值
    params.value.pagenum = Math.ceil(total.value + 1 / params.value.pagesize)
    getArticleList()
  }
  if (type === 'edit') {
    getArticleList()
  }
}
getArticleList()
</script>
<template>
  <page-container title="文章管理">
    <!-- 在自定义组件里，用template包裹住的是插槽内容，而具名插槽需要添加#+name属性值 -->
    <template #extra>
      <el-button type="primary" @click="showBox">发布文章</el-button>
    </template>
    <!-- 改成行内式 -->
    <el-form inline>
      <el-form-item label="文章分类">
        <!-- <el-select style="width: 200px">
          <el-option value="111" label="新闻"></el-option>
          <el-option value="222" label="娱乐"></el-option>
        </el-select> -->
        <channel-select v-model="params.id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态">
        <el-select style="width: 200px" v-model="params.state">
          <el-option value="已发布" label="已发布"></el-option>
          <el-option value="草稿" label="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button type="success" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表单部分 -->
    <el-table :data="articleList" style="width: 100%" v-loading="loading">
      <el-table-column label="分类标题" prop="title"></el-table-column>
      <el-table-column label="分类时间" prop="pub_time">
        <template #default="{ row }">
          {{ timeFormat(row.pub_time) }}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            label="编辑"
            :icon="Edit"
            circle
            plain
            @click="onEdit(row)"
            type="primary"
          ></el-button>
          <el-button
            label="删除"
            :icon="Delete"
            circle
            plain
            @click="onDelete(row)"
            type="danger"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 7]"
      :size="size"
      :disabled="disabled"
      background
      layout="jumper,total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 15px; justify-content: flex-end"
    />
    <!-- 抽屉 -->
    <drawer-box ref="node" @success="onSuccess"></drawer-box>
  </page-container>
</template>
