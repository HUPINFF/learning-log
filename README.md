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

## 部署到 Vercel

1. 把这个文件夹推到 GitHub
2. 打开 [vercel.com](https://vercel.com) → Add New → Project → 选中这个仓库
3. Framework Preset 选 **Vite**（一般会自动识别），Build Command `npm run build`，Output Directory `dist`
4. Deploy

之后**每次 `git push` 都会自动重新部署**。写完一篇 → push → 几十秒后线上就更新了。

---

## 目录结构

```
posts/               ← 你写的东西全在这里，一个日期一个文件
src/
  posts.js           ← 扫描 posts/、解析标题和日期
  router.js          ← 路由（用 hash 模式，部署到哪都不用额外配置）
  style.css          ← 所有样式
  App.vue            ← 页面骨架
  components/
    Masthead.vue     ← 顶栏（篇数 + 昼夜切换）
    Rail.vue         ← 左侧那条时间轴
    Reader.vue       ← 右侧正文渲染
```

---

## 已知取舍

- **不用中文 webfont**：一套中文字体动辄 5–15MB，为了好看让每个访客下载这么多不值。改用系统字体栈，把辨识度做在排版和动效上。想换字体，加一行 `@fontsource/...` 即可。
- **hash 路由**（地址里有 `#`）：换来的是扔到任何静态托管都能直接跑，不用配 SPA 回退规则。
- **`dist/` 和 `node_modules/` 不进 git**，见 `.gitignore`。
