import { Typography, Box, Divider, Chip, Fab } from '@mui/material'
import { GetServerSideProps } from 'next'
import Layout from '../../layout'
import { getSession, Claims } from '@auth0/nextjs-auth0'
import ArticleComments from '../../components/comments'
import supabaseAdmin from '../api/utils/_supabaseClient'
import ArticleLikes from '../../components/like'
import { useState } from 'react'
import router from 'next/router'
import chineseConverter from '../../utils/cnconverter'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle'
import { Article } from '../../utils/types'
import Image from 'next/image'
import { TrustedMarkdown } from '../../components/markdown'

type ArtProps = {
    art: Article
    user: Claims | null
    url: string
}

const Art = ({ art, user, url }: ArtProps) => {
    const md = art.md
    const [isSimp, setIsSimp] = useState(true)
    const convert = () => {
        setIsSimp(isSimp => !isSimp)
    }

    return (
        <Layout title={art.title} description={md} cover={art.cover}>
            <Fab onClick={convert} variant='extended' sx={{
                position: 'fixed',
                top: '85px',
                right: '10px',
                opacity: 0.7,
            }}>
                <ChangeCircleIcon />
                {isSimp ? '简➢繁' : '繁➣简'}
            </Fab>

            {
                art.cover
                    ?
                    <Box sx={{ mb: 2, position: 'relative', display: 'grid', width: '100%', aspectRatio: '2' }}>
                        <Image style={{ borderRadius: 30, objectFit: 'cover' }} src={art.cover} alt={art.title} fill sizes='
                            (max-width: 600px) 76vw,
                            (max-width: 900px) 64vw,
                            40vw
                        '></Image>
                    </Box>
                    :
                    <></>
            }

            <Typography variant='h3' sx={{
                fontWeight: 'bolder',
                opacity: 0.9
            }}>
                {art.title}
            </Typography>

            <Typography variant='caption'>
                本文约在 {Math.ceil(art.md.length * 0.9 - (art.md.length * 0.9) % 100)} 字左右，阅读时间需要约 {Math.ceil(art.md.length / 500)} 分钟。
            </Typography>

            <Typography sx={{
                whiteSpace: 'pre-line',
                fontWeight: 'bold'
            }}>
                作者： {art.author}<br></br>
                日期： {new Date(art.time).toLocaleDateString()}
            </Typography>

            {
                art.tags
                    ?
                    <Box sx={{
                        fontWeight: 'bold'
                    }}>
                        标签：{art.tags.map((tag) => (
                            <Chip
                                sx={{ mr: 1 }}
                                onClick={() => router.push(`/tag/${tag}`)}
                                label={`#${tag}`}
                                key={tag}
                            ></Chip>
                        ))}
                    </Box>
                    :
                    <></>
            }

            <TrustedMarkdown>
                {isSimp ? md : chineseConverter(md, true)}
            </TrustedMarkdown>
            <Divider></Divider>

            <ArticleLikes url={url} user={user} artId={art.id}></ArticleLikes>
            <ArticleComments url={url} user={user} artId={art.id}></ArticleComments>
        </Layout >
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const id = ctx.query.id as string
    const art = (await supabaseAdmin
        .from('art')
        .select()
        .eq('id', id)
        .single())
        .data
    return art ? {
        props: {
            art,
            user: getSession(ctx.req, ctx.res)?.user ?? null, // undefined 不可序列化
            url: `https://${ctx.req.headers.host}${ctx.resolvedUrl}`
        }
    }
        : {
            notFound: true
        }
}

export default Art
