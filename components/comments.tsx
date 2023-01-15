import { Claims } from '@auth0/nextjs-auth0'
import { Button, Paper, IconButton, Typography } from '@mui/material'
import styles from '../styles/Typo.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import post, { get } from '../utils/api'
import markdown, { makeMarkdownLinkUseRouterPush } from '../utils/md'
import CommentInput from './input'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteIcon from '@mui/icons-material/Delete'

export type Comment = {
    id: string
    time: number
    user_id: string
    user_name: string
    article: number
    text: string
    isMe: boolean
}

type ArticleCommentsProps = {
    user: Claims | null
    articleId: number
    url: string
}

const ArticleComments = ({ user, articleId, url }: ArticleCommentsProps) => {
    const [comments, setComments]: [Comment[] | [], Dispatch<SetStateAction<Comment[] | []>>]
        = useState(new Array())
    const [hasCommentsLoaded, setHasCommentsLoaded] = useState(false)
    const [userComment, setUserComment] = useState('')

    const loadComments = async () => {
        setHasCommentsLoaded(true)
        const data: Comment[] | [] = (await get('/api/loadComments', { articleId })) ?? []
        setComments(data)
        setTimeout(() => {
            makeMarkdownLinkUseRouterPush()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { loadComments() }, [articleId])

    const replyComment = (text: string) => {
        const quote = text.split('\n').map((line) => `> ${line}`).join('\n')
        // 在每一行前加上引用符“>”
        setUserComment(`${quote}\n\n`)
    }
    const deleteComment = async (id: string) => {
        await post('/api/deleteComment', { id })
        setComments(comments.filter((comment) => comment.id !== id))
    }

    return (
        <>
            {
                user
                    ?
                    <CommentInput
                        rows={5}
                        value={userComment}
                        setValue={setUserComment}
                        url={`/api/comment`}
                        errorChecker={value => value.length === 0}
                        placeholder='可直接发送纯文本。'
                        body={{
                            articleId
                        }}>
                    </CommentInput>
                    :
                    <Button variant='outlined' color='primary' fullWidth href={`/api/auth/login?redirect=${url}`}>登录以评论</Button>
            }
            <br></br>
            <br></br>
            <Button variant='outlined' color='primary' disabled={!hasCommentsLoaded} fullWidth onClick={loadComments}>
                {hasCommentsLoaded ? '刷新评论' : '评论加载中……'}
            </Button>
            {
                comments.map((comment, index) => (
                    <Paper elevation={0} key={index} className={styles.typo} sx={{
                        padding: '10px 10px 0 10px',
                        whiteSpace: 'pre-line',
                        position: 'relative',
                        marginTop: 4,
                    }}>
                        <IconButton color='primary' sx={{ position: 'absolute', right: 0, top: 0 }} onClick={() => replyComment(comment.text)}><ReplyIcon /></IconButton>
                        {
                            comment.isMe
                                ?
                                <IconButton color='primary' sx={{ position: 'absolute', right: 40, top: 0 }} onClick={() => deleteComment(comment.id)}><DeleteIcon /></IconButton>
                                :
                                <></>
                        }
                        <Typography variant='caption'>
                            {new Date(comment.time).toLocaleString()}
                        </Typography>
                        <Typography variant='body1'>
                            {comment.user_name}（ID：{comment.user_id}）
                        </Typography>
                        <span
                            className={styles.typoComment}
                            dangerouslySetInnerHTML={{ __html: markdown.render(comment.text) }}
                        ></span>
                    </Paper>
                ))
            }
        </>
    )
}

export default ArticleComments
