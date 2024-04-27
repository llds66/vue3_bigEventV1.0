import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'big-user',
  () => {
    // token
    const token = ref('')
    const setToken = (t) => (token.value = t)
    const removeToken = () => {
      token.value = ''
    }
    // 用户
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = () => {
      user.value = ''
    }

    return { token, setToken, removeToken, user, getUser, setUser }
  },
  { persist: true }
)
