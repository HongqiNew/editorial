import { Typography, Box, Divider, Chip, Fab } from "@mui/material";
import { GetServerSideProps } from "next";
import Layout from "../../layout";
import { makeMarkdownLinkUseRouterPush, markdownWithHtml } from "../../utils/md";
import styles from '../../styles/Typo.module.css'
import { getSession, Claims } from "@auth0/nextjs-auth0";
import ArticleComments from "../../components/comments";
import supabaseAdmin from "../api/utils/_supabaseClient";
import { Article } from "../../components/art";
import ArticleLikes from "../../components/like";
import { useEffect, useState } from "react";
import router from "next/router";
import chineseConverter from "../../utils/cnconverter";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

type ArtProps = {
    article: Article
    user: Claims | null
    url: string
}

const Art = ({ article, user, url }: ArtProps) => {
    const [text, setText] = useState(markdownWithHtml.render(article.md));
    useEffect(() => {
        setText(markdownWithHtml.render(article.md)) // 触发重新渲染
        makeMarkdownLinkUseRouterPush();
    }, [article]);

    const [isSimp, setIsSimp] = useState(true);
    const convert = () => {
        setText(text => chineseConverter(text, isSimp));
        setIsSimp(isSimp => !isSimp);
    }
    return (
        <Layout title={article.title} description={text} cover={article.cover}>
            <Box sx={{
                ml: { xs: '12%', sm: '18%', md: '20%' },
                mr: { xs: '12%', sm: '18%', md: '20%' }
            }}>
                <Fab onClick={convert} variant="extended" sx={{
                    position:'fixed',
                    top:'85px',
                    right:'10px',
                    opacity: 0.7,
                }}>
                    <ChangeCircleIcon />
                    {isSimp ? '简➢繁' : '繁➣简'}
                </Fab>
                <Typography variant='h4' sx={{
                    opacity: 0.8
                }}>
                    {article.title}
                </Typography>
                <Typography variant='caption'>
                    本文约在 {article.md.length} 字以下，阅读时间需要约 {Math.ceil(article.md.length / 512)} 分钟。
                </Typography>
                <Typography sx={{
                    whiteSpace: 'pre-line',
                }}>
                    作者： {article.author}<br></br>
                    日期： {new Date(article.time).toLocaleDateString()}
                </Typography>
                {
                    article.tags
                        ?
                        <>
                            标签：{article.tags.map((tag) => (
                                <Chip
                                    onClick={() => router.push(`/tag/${tag}`)}
                                    label={`#${tag}`}
                                    key={tag}
                                ></Chip>
                            ))}
                        </>
                        :
                        <></>
                }
                <div
                    className={styles.typo}
                    dangerouslySetInnerHTML={{ __html: text }}
                ></div>
                <Divider sx={{ boxShadow: '3px 3px 3px black' }}></Divider>
                <ArticleLikes url={url} user={user} articleId={article.id}></ArticleLikes>
                <br></br>
                <ArticleComments url={url} user={user} articleId={article.id}></ArticleComments>
                <br></br><br></br>
            </Box>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const id = ctx.query.id as string;
    const article = (await supabaseAdmin
        .from('hongqiart')
        .select()
        .eq('id', id)
        .single())
        .data;
    return article ? {
        props: {
            article,
            user: getSession(ctx.req, ctx.res)?.user ?? null, // undefined 不可序列化
            url: `https://${ctx.req.headers.host}${ctx.resolvedUrl}`
        }
    }
        : {
            notFound: true
        }
}

export default Art;
