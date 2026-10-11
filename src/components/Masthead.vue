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
    <RouterLink to="/" class="brand">
      <span class="brand-cn">学习日志</span>
      <span class="brand-en">Learning&nbsp;Log</span>
    </RouterLink>

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
