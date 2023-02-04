# 《新红旗》社论发布站

![Preview](https://bbvsukzcbmlmapdkuybx.supabase.co/storage/v1/object/public/bed/card.jpg)

## 功能

该站展现给用户的页面有：
- `/?page=`：主页；
- `/art/[id]`：展示 `Markdown` 文章（刊的形式已取消），置有喜欢和分享、评论和统计、繁简转换功能；
- `/tag/[tag]`：展示含有指定标签的文章；
- `/404`：`NOT FOUND`；
- `/500`：`SERVER ERROR`。

所有页面均为服务器端渲染，有黑暗模式。

你可以通过提起 `issues` 来帮助我们改进。

## 实现

技术栈：
- [`Next.js 13`](https://nextjs.org)（`pages` directory）；
- [`Material UI`](https://mui.com)；
- `Serverless`（[`Supabase PostgreSQL`](https://supabase.com) & [`Auth0`](https://auth0.com)）。

`Markdown` 渲染由 `markdown-it` 实现；繁简转换由 `opencc-js` 实现；`PWA` 由 `next-pwa` 实现。

## 部署

~~参见 [部署《新红旗》式的社论发布站》一文](https://newhongqi.org/art/42)。~~

半周年启用的新站暂无自部署支持。如果需要请联系我们。
