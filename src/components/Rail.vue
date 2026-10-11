<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../posts.js'

const route = useRoute()

// 地址栏没写具体哪篇时，默认高亮最新一篇
const activeSlug = computed(() => route.params.slug || posts[0]?.slug || '')
</script>

<template>
  <aside class="rail">
    <p class="rail-label">Index</p>

    <ol v-if="posts.length" class="rail-list">
      <li
        v-for="(p, i) in posts"
        :key="p.slug"
        class="entry"
        :class="{ 'is-active': p.slug === activeSlug }"
        :style="{ '--i': i }"
      >
        <RouterLink :to="`/${p.slug}`">
          <span class="entry-date">{{ p.dateLabel }}</span>
          <span class="entry-title">{{ p.title }}</span>
        </RouterLink>
      </li>
    </ol>

    <p v-else class="rail-empty">还没有任何记录。</p>
  </aside>
</template>
