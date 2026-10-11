<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { posts } from '../posts.js'

const route = useRoute()

// 高亮哪一条，分三种情况：
//   有 slug 参数      → 就是那一篇
//   首页（Reader 显示的是最新一篇） → 最新一篇
//   其它页面（比如 /about）        → 谁都不高亮
const activeSlug = computed(() =>
  route.params.slug || (route.name === 'home' ? posts[0]?.slug || '' : '')
)



// 【事实】搜索框里打的字。用户打什么就是什么，没人能替它算出来 → ref
const query = ref('')

// 归一化：把日期里的 . - / 三种分隔符全部删掉。
// 页面上显示的是 2026.10.11（点），用户也可能照着 slug 打 2026-10-11（杠），
// 所以两边都归一化后再比 —— ⚠️ 只归一化一边 = 永远搜不到，而且不报错。
const norm = (s) => s.replace(/[.\-/]/g, '')

// 【结论】过滤后的列表。完全由「query + posts」决定 → computed
// 不用写 watch 手动同步：函数体里读了谁，computed 就自动盯住谁。
// 也不需要写「没输入就显示全部」——空字符串是任何字符串的子串，
// norm('') === ''，''.includes 永远为 true，这一条是白送的。
const filtered = computed(() => {
  const q = norm(query.value)
  const kw = query.value.trim().toLowerCase()
  return posts.filter((p) => norm(p.dateLabel).includes(q) || p.title.toLowerCase().includes(kw))
})
</script>

<template>
  <aside class="rail">
    <p class="rail-label">Index</p>

    <input
      v-model="query"
      class="rail-search"
      type="search"
      placeholder="搜日期，如 10-11"
      aria-label="按日期搜索"
    />

    <ol v-if="filtered.length" class="rail-list">
      <li
        v-for="(p, i) in filtered"
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

    <!-- 两种「空」是两回事，必须分开：搜不到 ≠ 一篇都没写 -->
    <p v-else-if="posts.length" class="rail-empty">没有匹配的日期。</p>
    <p v-else class="rail-empty">还没有任何记录。</p>
  </aside>
</template>
