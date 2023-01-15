import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import router from 'next/router'

// 标记 ID，方便识别并附加 onclick 事件
const MarkdownItLink = (tokens: any, idx: any) => {
  const hrefIndex = tokens[idx].attrIndex('href')
  if (hrefIndex !== -1) {
    tokens[idx].attrPush(['id', 'Markdown Link'])
  }
}

// 遍历链接，在 Markdown 转换的链接中使用 router.push() 跳转，避免重新加载页面
export const makeMarkdownLinkUseRouterPush = () => {
  const links = document.links
  for (let index = 0; index < links.length; index++) {
    const item = links.item(index)
    if (item && item.id === 'Markdown Link') {
      item.onclick = () => {
        router.push(item.href)
        return false
      }
    }
  }
}

/**
 * 一律开启 { breaks: true }，通过遇到 \n 转为 <br /> 避免 CSS 中 pre-line 的使用
 *
 * markdownWithHtml 有 XSS 隐患，只对受信任源使用
 *
 * MarkdownItAnchor 扩展为标题提供锚点，由于留言只需要让读者可以快速跳转到文章部分
 * 而基本没有新建立可跳转部分的需求，为了避免污染文档的标题 ID，默认不开启 MarkdownItAnchor
 */

const markdown: MarkdownIt = MarkdownIt({ breaks: true })
  .use(
    require('markdown-it-for-inline'),
    'url_next',
    'link_open',
    MarkdownItLink,
  )

export const markdownWithHtml: MarkdownIt = MarkdownIt({
  html: true,
  breaks: true,
})
  .use(MarkdownItAnchor)
  .use(
    require('markdown-it-for-inline'),
    'url_next',
    'link_open',
    MarkdownItLink,
  )
  .use(require('markdown-it-pangu'))
  .use(require('markdown-it-block-image'), {
    outputContainer: 'center',
  })

export default markdown
