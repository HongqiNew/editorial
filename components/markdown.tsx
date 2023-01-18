import { useEffect, useState } from 'react'
import Typo from '../styles/typo.module.css'
import markdown, { routerifyMarkdownLinks, markdownWithHtml, getMarkdownScripts, displayMarkdownImageAlts } from '../utils/md'

type MarkdownProps = {
    children: string
}

const Markdown = ({ children }: MarkdownProps) => {
    useEffect(() => {
        routerifyMarkdownLinks()
    }, [])
    return (
        <span
            style={{ whiteSpace: 'normal' }}
            dangerouslySetInnerHTML={{ __html: `${markdown.render(children)}` }}
            className={Typo.typoComment}
        ></span>
    )
}

export const TrustedMarkdown = ({ children }: MarkdownProps) => {
    const html = markdownWithHtml.render(children)
    useEffect(() => {
        routerifyMarkdownLinks()
        displayMarkdownImageAlts()
        try {
            eval.call(window, getMarkdownScripts())
        } catch (error) { }
    }, [children])

    return (
        <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={Typo.typo}
        ></div>
    )
}

export default Markdown
