<script setup>
import { latest } from '../posts.js'
</script>

<template>
  <!--
    日期不是写死的，是从 posts.js 里「最新那一篇」读出来的。

    为什么不写死？写死就有了第二个真相：你哪天忘了改，页脚就会一直撒谎，
    而且不报错。从 latest 推导，就永远不可能和实际内容对不上。

    v-if 兜住「一篇都还没写」的情况 —— 那时候根本没有「最近更新」可言。
  -->
  <footer v-if="latest" class="site-footer">
    <span class="site-footer-label">最近更新</span>
    <span class="site-footer-date">{{ latest.dateLabel }}</span>
  </footer>
</template>
