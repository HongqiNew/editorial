import { Paper, SxProps, Theme, Typography, Chip } from '@mui/material'
import Link from 'next/link'
import router from 'next/router'

export type Article = {
    id: number
    title: string
    time: number
    author: string
    md: string
    tags: string[] | null
    cover: string
}


type ArticlePreviewProps = {
    article: Article,
    sx?: SxProps<Theme>
}

const ArticlePreview = ({ article, sx }: ArticlePreviewProps) => {
    return (
        <Paper elevation={5} sx={{
            p: '15px 15px',
            mb: 5,
            ...sx
        }}>
            <Typography variant='h6' sx={{ fontStyle: 'italic' }}>
                <Link href={`/art/${article.id}`}>{article.title}</Link>
            </Typography>
            <Typography>
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
        </Paper>
    )
}

export default ArticlePreview
