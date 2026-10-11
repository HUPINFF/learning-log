/**
 * 文章全部来自 src/../posts/*.md
 *
 * import.meta.glob 是 Vite 提供的：它在「构建时」把 posts 目录扫一遍，
 * 把每个 md 文件的内容当成字符串塞进来。
 * 所以新增文章 = 新增一个 md 文件，不需要在任何地方登记。
 */

const files = import.meta.glob('../posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const WEEKDAYS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/** 从 markdown 原文里提出标题、摘要、字数 */
function parse(raw, slug) {
  const lines = raw.replace(/\r\n/g, '\n').split('\n')

  // 标题 = 第一个 "# xxx" 行；正文 = 它之后的所有内容
  let title = ''
  let cut = -1
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+(.+?)\s*$/)
    if (m) {
      title = m[1]
      cut = i
      break
    }
  }
  const body = cut >= 0 ? lines.slice(cut + 1).join('\n') : raw

  // 粗略统计正文字数（去掉代码块和 markdown 记号）
  const plain = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~\-[\]()!|]/g, '')
    .replace(/\s+/g, '')

  const date = new Date(`${slug}T00:00:00`)

  return {
    slug,
    date: slug,
    dateLabel: slug.replace(/-/g, '.'),
    weekday: Number.isNaN(date.getTime()) ? '' : WEEKDAYS[date.getDay()],
    title: title || slug,
    body,
    excerpt: plain.slice(0, 68),
    chars: plain.length,
    minutes: Math.max(1, Math.round(plain.length / 350)),
  }
}

export const posts = Object.entries(files)
  .map(([path, raw]) => parse(raw, path.split('/').pop().replace(/\.md$/, '')))
  .sort((a, b) => (a.slug < b.slug ? 1 : a.slug > b.slug ? -1 : 0))

export const latest = posts[0] || null

export function findPost(slug) {
  return posts.find((p) => p.slug === slug) || null
}
