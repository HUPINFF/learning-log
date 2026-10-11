import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import './style.css'

// 主题：先读本地存的，没有再跟随系统
const saved = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light')

createApp(App).use(router).mount('#app')
