# 学习日志

一个计算机学生的日常学习记录。每天写：**今天做了什么 / 卡在哪了 / 搞懂了一个什么概念**。

---

## 每天怎么加一篇

**只需要做一件事：在 `posts/` 里新建一个文件。**

```
posts/2026-10-12.md
```

内容格式：

```markdown
# 第二天的标题

正文随便写。

## 可以有小标题

- 列表也行
- 代码块、引用、表格都支持
```

就这些。文件名就是日期（`YYYY-MM-DD.md`，**顺序靠文件名排序，所以必须叫这个格式**），
第一行 `# 标题` 就是标题，其余全是正文。

保存后页面自动多一条记录——**不需要在任何地方登记**。

> 原理：Vite 的 `import.meta.glob` 在构建时扫描 `posts/` 目录，见 [src/posts.js](src/posts.js)。

---

## 改「关于我」页

自我介绍正文在根目录的 **`about.md`**（不在 `posts/` 里），改完保存页面就变。

页面下方那两块「网站初衷」和「联系方式」写在 [src/components/About.vue](src/components/About.vue)。

页脚那行「最近更新」的日期**不是手写的**——它从最新那篇文章推导，见 [src/components/SiteFooter.vue](src/components/SiteFooter.vue)。写死就会有第二个真相，哪天忘了改就一直在撒谎。

---

## 本地跑起来

```bash
npm install     # 第一次跑之前执行一次
npm run dev     # 开发模式，改文件浏览器自动刷新
```

打开终端里显示的地址（一般是 http://localhost:5173）。

打包预览（模拟上线后的样子）：

```bash
npm run build
npm run preview
```

---

## 部署到 GitHub Pages

配置在 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)，已经弄好了。

**你只需要做一件事：`git push`。** 推上去之后 Actions 自动 build + 发布，一两分钟后线上就是最新的。

线上地址：**https://hupinff.github.io/learning-log/**

> 第一次要确认仓库 **Settings → Pages → Source** 选的是 **GitHub Actions**。
> workflow 里有一步会顺手打开它，万一那步没成功，手动点一下就行，之后不用再管。

### 为什么不是 Vercel

`*.vercel.app` 在中国大陆是被针对性阻断的：TLS 握手时看到这个域名就当场重置连接 ——
实测即使把真实 IP 直接填进 `--resolve`，也在 **0.16 秒**被掐断。挂加速器则换成另一种死法：
请求经由加速节点出去，Vercel 看到的是机房 IP，直接 `403` + `X-Vercel-Mitigated: deny`。

站本身完全没问题（check-host 从 8 个国家访问全部 `200 OK`），问题在于**国内打不开**。
简历上放一个国内点不开的链接，比不放还伤，所以换到实测可直连的 GitHub Pages。

换过来的成本是零：`base: './'` 和 hash 路由这两条早就把「部署到子路径」这件事解决了，
项目站点的 `/learning-log/` 前缀自动就对，不用改任何配置。

---

## 目录结构

```
about.md             ← 「关于我」页的正文
posts/               ← 你写的东西全在这里，一个日期一个文件
.github/
  workflows/
    deploy.yml       ← 部署：push 到 main 就自动 build + 发布到 GitHub Pages
src/
  posts.js           ← 扫描 posts/、解析标题和日期
  router.js          ← 路由（用 hash 模式，部署到哪都不用额外配置）
  style.css          ← 所有样式
  App.vue            ← 页面骨架（顶栏 + RouterView）
  components/
    Masthead.vue     ← 顶栏（站名 + 导航 + 篇数 + 昼夜切换）
    MainLayout.vue   ← 布局路由：左边时间轴 + 右边正文
    Rail.vue         ← 左侧那条时间轴
    Reader.vue       ← 右侧正文渲染
    About.vue        ← 「关于我」页
    SiteFooter.vue   ← 页脚（最近更新）
```

---

## 已知取舍

- **不用中文 webfont**：一套中文字体动辄 5–15MB，为了好看让每个访客下载这么多不值。改用系统字体栈，把辨识度做在排版和动效上。想换字体，加一行 `@fontsource/...` 即可。
- **hash 路由**（地址里有 `#`）：换来的是扔到任何静态托管都能直接跑，不用配 SPA 回退规则。
- **`dist/` 和 `node_modules/` 不进 git**，见 `.gitignore`。
- **手机上索引栏不吸顶**：吸顶时它加上顶栏会常驻吃掉 195px——一块手机屏幕的 23%，
  而且半透明毛玻璃会让正文从底下透上来，在交界处把字切成两半。
  改成跟着内容滚走后，阅读区从 649px 回到 786px；代价是想切换文章要滚回顶部。
  手机上「打开 → 读」才是主路径，这个代价值。
