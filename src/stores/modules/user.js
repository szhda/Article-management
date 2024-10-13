import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userData } from '@/api/user'
export const userStore = defineStore(
  'user-store',
  () => {
    const token = ref('')
    const user = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const getUserData = async () => {
      const res = await userData()
      user.value = res.data.data
    }
    const setUserData = (newData) => {
      console.log(newData, '用户数据')
      user.value = newData
    }
    return {
      token,
      setToken,
      user,
      getUserData,
      setUserData
    }
  },
  { persist: true }
)
