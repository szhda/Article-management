<template>
  <el-select
    style="width: 200px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="width"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :value="channel.id"
      :label="channel.cate_name"
    ></el-option>
  </el-select>
</template>

<script setup>
import { getChannelService } from '@/api/article'
import { ref } from 'vue'
const channelList = ref([])
defineProps({
  modelValue: {
    type: Number
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const getList = async () => {
  // console.log('发送请求获取数据')
  const res = await getChannelService()
  channelList.value = res.data.data
  // console.log(res)
  // console.log(res.data, '发送请求获取的数据')
}
getList()
</script>

<style></style>
