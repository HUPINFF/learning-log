import { createRouter, createWebHashHistory } from 'vue-router'
import Reader from './components/Reader.vue'

/**
 * 用 hash 路由（地址里带 #）而不是 history 路由。
 *
 * 区别：history 路由访问 /p/2026-10-11 这种地址，服务器必须配置
 * "找不到就返回 index.html"，否则刷新页面直接 404。
 * hash 路由把这一层交给浏览器，扔到 Vercel / Netlify / GitHub Pages
 * 任何一个静态托管上都能直接用，不用写任何部署配置。
 *
 * 代价是地址里多个 #，首页地址不受影响。
 */
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: Reader, props: { slug: null } },
    { path: '/:slug', name: 'post', component: Reader, props: true },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
