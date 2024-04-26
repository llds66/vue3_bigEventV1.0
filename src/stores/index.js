// 统一管理
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(persist)
export default pinia

import { useUserStore } from './modules/user'
export { useUserStore }
// 或者导出=>按需导入导出
// export * from './modules/user'
