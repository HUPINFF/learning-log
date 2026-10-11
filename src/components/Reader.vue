<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { findPost, latest } from '../posts.js'
import SiteFooter from './SiteFooter.vue'

marked.setOptions({ gfm: true, breaks: false })

const route = useRoute()
const root = ref(null)
const progress = ref(0)

const slug = computed(() => route.params.slug || latest?.slug || null)
const post = computed(() => (slug.value ? findPost(slug.value) : null))
const html = computed(() => (post.value ? marked.parse(post.value.body) : ''))

/* ---- 阅读进度 ---- */
function updateProgress() {
  const total = document.documentElement.scrollHeight - window.innerHeight
  progress.value = total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0
}

/* ---- 渲染后处理：外链新窗口打开 ---- */
function decorate() {
  root.value?.querySelectorAll('a[href^="http"]').forEach((a) => {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  })
  updateProgress()
}

watch(post, () => nextTick().then(decorate))

watch(
  post,
  (p) => {
    document.title = p ? `${p.title} · 学习日志` : '学习日志'
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  decorate()
})

onUnmounted(() => window.removeEventListener('scroll', updateProgress))
</script>

<template>
  <div v-if="post" class="progress" :style="{ width: progress + '%' }"></div>

  <article v-if="post" :key="post.slug" ref="root">
    <header class="post-head">
      <div class="post-meta">
        <span class="date">{{ post.dateLabel }}</span>
        <span>{{ post.weekday }}</span>
        <span>约 {{ post.minutes }} 分钟</span>
        <span>{{ post.chars }} 字</span>
      </div>
      <h1 class="post-title">{{ post.title }}</h1>
    </header>

    <div class="post-rule"></div>

    <div class="prose" v-html="html"></div>

    <!-- 放在 <article> 里面，才吃得到它的 43rem 正文宽度 -->
    <SiteFooter />
  </article>

  <section v-else class="empty">
    <h1>还没有任何记录</h1>
    <p>
      在 <code>posts/</code> 目录里新建一个 <code>2026-10-11.md</code> 这样的文件，
      第一行写 <code># 标题</code>，下面写正文，保存。页面会自动多出一条记录。
    </p>
  </section>
</template>
