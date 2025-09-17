/*
 * @Author: 刘威 893624020@qq.com
 * @Date: 2025-09-09 17:25:08
 * @LastEditors: 刘威 893624020@qq.com
 * @LastEditTime: 2025-09-17 11:27:10
 * @FilePath: \codeExample\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/styles/variables.scss'

import { InstallCodeMirror } from "codemirror-editor-vue3"; 

import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(InstallCodeMirror)
app.mount('#app')