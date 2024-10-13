// import { formContextKey } from 'element-plus'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
// 将pinia使用和按需导出都封装和简化
export * from './modules/user'
