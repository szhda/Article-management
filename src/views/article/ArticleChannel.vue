<script setup>
import { ref } from 'vue'
import { getChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { delChannerList } from '@/api/article'
import { ElMessage, ElMessageBox } from 'element-plus'
const channelList = ref([])
const isLoad = ref(false)
const dialog = ref()
const getList = async () => {
  isLoad.value = true
  const res = await getChannelService()
  channelList.value = res.data.data
  console.log(channelList.value)
  // console.log(res.data.data)
  // channelList.value = [
  //   {
  //     id: 1070,
  //     cate_name: '科技',
  //     cate_alias: 'keji'
  //   },
  //   {
  //     id: 1071,
  //     cate_name: '历史',
  //     cate_alias: 'lishi'
  //   }
  // ]
  // channelList.value = []
  // console.log(channelList.value)
  setTimeout(() => {
    isLoad.value = false
  }, 1000)
}
// const onEdit = (row) => {
//   console.log(row)
// }
const onAddChannel = () => {
  dialog.value.open({})
}
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onSuccess = () => {
  getList()
}
const onDelete = async (row) => {
  await ElMessageBox.confirm('您确定要删除这条数据分类吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await delChannerList(row.id)
  ElMessage({
    type: 'success',
    message: '删除成功'
  })
  getList()
}
getList()
// channelList.value = []
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <!-- 主体表格 -->
    <!-- <template> -->
    <el-table v-loading="isLoad" :data="channelList" style="width: 100%">
      <el-table-column label="序号" type="index"></el-table-column>
      <el-table-column
        label="分类名称"
        width="500"
        prop="cate_name"
      ></el-table-column>
      <el-table-column
        label="分类别称"
        width="500"
        prop="cate_alias"
      ></el-table-column>
      <el-table-column label="操作功能">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 绑定标签，进行dom树操作 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
    <!-- </template> -->
  </page-container>
</template>
