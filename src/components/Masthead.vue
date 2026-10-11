<script setup>
import { ref } from 'vue'
import { posts } from '../posts.js'

const theme = ref(document.documentElement.dataset.theme || 'light')

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  localStorage.setItem('theme', theme.value)
}
</script>

<template>
  <header class="masthead">
    <!-- 左半边捆成一组。.masthead 用的是 space-between —— 子元素有几个，
         它就把空当分成几份。About 之前是第三个子元素，所以被摊到了正中间。
         ⚠️ 这不是「间距没调好」，是「分组分错了」：站名和导航本来就是一伙的。 -->
    <nav class="masthead-nav">
      <RouterLink to="/" class="brand">
        <span class="brand-cn">学习日志</span>
        <span class="brand-en">Learning&nbsp;Log</span>
      </RouterLink>

      <!-- 直接复用 .brand-cn / .brand-en，不新写一套样式。
           同一个站里，同一类字就该长同一个样子 —— 而且以后改字体只改一处。 -->
      <RouterLink to="/about" class="brand">
        <span class="brand-cn">关于我的</span>
        <span class="brand-en">About&nbsp;Me</span>
      </RouterLink>
    </nav>

    <div class="masthead-meta">
      <span><b>{{ posts.length }}</b> 篇</span>
      <span class="stat-sep"></span>
      <span class="since">Since 2026.10.10</span>
      <button
        class="theme-btn"
        type="button"
        :aria-label="theme === 'dark' ? '切换到日间模式' : '切换到夜间模式'"
        :title="theme === 'dark' ? '日间模式' : '夜间模式'"
        @click="toggleTheme"
      >
        {{ theme === 'dark' ? '☀' : '☾' }}
      </button>
    </div>
  </header>
</template>
