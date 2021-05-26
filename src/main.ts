import { createApp } from 'vue'
import App from './App.vue'
// ^2.0.0-rc.5 才支持Vue3
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './routers/index'
import store from './store/index'
const app = createApp(App)

app.use(Antd).use(router).use(store)
app.mount('#app')
