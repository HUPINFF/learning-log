<template>
  <main class="page">
    <header class="post-head">
      <div class="post-meta">
        <span class="date">ABOUT</span>
        <span>关于我</span>
      </div>
      <h1 class="post-title">胡品</h1>
    </header>

    <div class="post-rule"></div>

    <div class="prose" v-html="html"></div>

    <!-- 放在 .page 里面，才能白蹭到它的居中 + 43rem 正文宽度 -->
    <section class="note">
      <p class="note-label">网站初衷</p>
      <!-- .note-body 是个容器，里面想放几段放几段 -->
      <div class="note-body">
        <p>记录我自己的每天学习，分享思考，分享项目，沉淀经验</p>
        <p>记录自己生活，日常感悟</p>
        <p>获得广大好友和网友们的支持，交流和建议</p>
      </div>
    </section>

    <section class="note">
      <p class="note-label">联系方式</p>
      <!-- 用 dl：dt 是"标签"，dd 是"值"，天生就是干这个的 -->
      <dl class="contact">
        <dt>Email</dt>
        <dd>
          <a href="mailto:sihshsnsjahzms@gmail.com">sihshsnsjahzms@gmail.com</a>
        </dd>

        <dt>GitHub</dt>
        <dd>
          <a href="https://github.com/HUPINFF" target="_blank" rel="noopener noreferrer">
            github.com/HUPINFF
          </a>
        </dd>

        <dt>WX</dt>
        <dd>
          <a href="https://wx.qq.com/">study-js255</a>
        </dd>
      </dl>
    </section>

    <!-- 和上面两个 .note 一样，留在 .page 这个框里 -->
    <SiteFooter />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import aboutRaw from '../../about.md?raw'
import SiteFooter from './SiteFooter.vue'

const html = computed(() => marked.parse(aboutRaw))
</script>
