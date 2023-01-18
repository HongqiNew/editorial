import MarkdownIt from 'markdown-it'
import MarkdownItAnchor from 'markdown-it-anchor'
import router from 'next/router'
import MarkdownItTocDoneRight from 'markdown-it-toc-done-right'
import MarkdownItPangu from 'markdown-it-pangu-ts'
import Token from 'markdown-it/lib/token'

// 标记 ID，方便识别并附加 onclick 事件
const MarkdownItLink = (tokens: Token[], idx: number) => {
    const hrefIndex = tokens[idx].attrIndex('href')
    if (hrefIndex !== -1) {
        tokens[idx].attrPush(['id', 'Markdown Link'])
    }
}

// 遍历链接，在 Markdown 转换的链接中使用 router.push() 跳转，避免重新加载页面
export const routerifyMarkdownLinks = () => {
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

// 标记 ID，方便识别并执行
const MarkdownItScript = (tokens: Token[], idx: number) => {
    if (tokens[idx].content.startsWith('<script>')) {
        tokens[idx].content.replace('<script>', "<script id='Markdown Script'>")
    }
}

// 图片懒加载
const MarkdownItImage = (tokens: Token[], idx: number) => {
    tokens[idx].attrPush(['loading', 'lazy'])
}

// 获取所有 Markdown 中的脚本以供加载完成调用（Next.js 无法在路由后自动执行 script 标签）
export const getMarkdownScripts = () => {
    const scripts = document.scripts
    const markdownScripts = []
    for (let index = 0; index < scripts.length; index++) {
        const item = scripts.item(index)
        if (item && item.id === 'Markdown Script') {
            item.id = 'Executing Markdown Script'
            markdownScripts.push(item.innerHTML)
        }
    }
    return markdownScripts.join(';')
}

// 显示块级图片说明文本
export const displayMarkdownImageAlts = () => {
    const imageContainers = document.getElementsByClassName('image-container')
    for (let index = 0; index < imageContainers.length; index++) {
        const imageContainer = imageContainers.item(index) as HTMLDivElement
        const image = imageContainer?.children.item(0) as HTMLImageElement
        const alt = image.getAttribute('alt')
        if (alt && !imageContainer.children.item(1)) {
            const p = document.createElement('p')
            p.setAttribute('style', 'font-style: italic; color: grey; font-size: small; text-align: center;')
            p.innerText = alt
            imageContainer.append(p)
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

const markdown: MarkdownIt = MarkdownIt()
    .use(require('markdown-it-for-inline'), 'url_next', 'link_open', MarkdownItLink)

export const markdownWithHtml: MarkdownIt = MarkdownIt({ html: true, breaks: true })
    .use(MarkdownItPangu)
    .use(MarkdownItAnchor)
    .use(MarkdownItTocDoneRight)
    .use(require('markdown-it-for-inline'), 'url_next', 'link_open', MarkdownItLink)
    .use(require('markdown-it-for-inline'), 'lazyload_next', 'image', MarkdownItImage)
    .use(require('markdown-it-for-inline'), 'block_script_next', 'html_block', MarkdownItScript)
    .use(require('markdown-it-block-image'), {
        outputContainer: 'center',
        containerClassName: 'image-container'
    })

export default markdown
