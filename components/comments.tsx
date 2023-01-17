import { Claims } from '@auth0/nextjs-auth0'
import { Button, Paper, IconButton, Typography, Grid, Box } from '@mui/material'
import styles from '../styles/Typo.module.css'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import post, { get } from '../utils/api'
import markdown, { makeMarkdownLinkUseRouterPush } from '../utils/md'
import CommentInput from './input'
import ReplyIcon from '@mui/icons-material/Reply'
import DeleteIcon from '@mui/icons-material/Delete'
import { Comment } from '../utils/types'
import Image from 'next/image'

type ArticleCommentsProps = {
    user: Claims | null
    artId: number
    url: string
}

const ArticleComments = ({ user, artId, url }: ArticleCommentsProps) => {
    const [comments, setComments]: [Comment[] | [], Dispatch<SetStateAction<Comment[] | []>>]
        = useState(new Array())
    const [hasCommentsLoaded, setHasCommentsLoaded] = useState(false)
    const [userComment, setUserComment] = useState('')

    const loadComments = async () => {
        setHasCommentsLoaded(true)
        const data: Comment[] | [] = (await get('/api/loadComments', { artId })) ?? []
        setComments(data)
        setTimeout(() => {
            makeMarkdownLinkUseRouterPush()
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { loadComments() }, [artId])

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
                        value={userComment}
                        setValue={setUserComment}
                        url={`/api/comment`}
                        errorChecker={value => value.length === 0}
                        placeholder='可直接发送纯文本。'
                        body={{
                            artId
                        }}></CommentInput>
                    :
                    <Button sx={{ mb: 1 }} variant='outlined' color='primary' fullWidth href={`/api/auth/login?redirect=${url}`}>登录以评论</Button>
            }
            <Button variant='outlined' color='primary' disabled={!hasCommentsLoaded} fullWidth onClick={loadComments}>
                {hasCommentsLoaded ? '刷新评论' : '评论加载中……'}
            </Button>
            {
                comments.map((comment, index) => (
                    <Paper elevation={0} key={index} className={styles.typo} sx={{
                        padding: 2,
                        whiteSpace: 'pre-line',
                        position: 'relative',
                        marginTop: 4,
                    }}>
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Box sx={{ mr: 2, minWidth: 50 }}>
                                <Image width={50} height={50} src={comment.userPic} alt='头像' style={{
                                    borderRadius: 50,
                                }}></Image>
                            </Box>
                            <Box>
                                <IconButton color='primary' sx={{ position: 'absolute', right: 0, top: 0 }} onClick={() => replyComment(comment.text)}><ReplyIcon /></IconButton>
                                {
                                    comment.isMe
                                        ?
                                        <IconButton color='primary' sx={{ position: 'absolute', right: 40, top: 0 }} onClick={() => deleteComment(comment.id)}><DeleteIcon /></IconButton>
                                        :
                                        <></>
                                }

                                <Typography variant='body1' sx={{ fontWeight: 'bold', mb: '0 !important' }} color='primary'>
                                    {comment.userName} &nbsp;&nbsp;&nbsp;
                                    <Typography variant='caption' color='secondary'>
                                        {new Date(comment.time).toLocaleString()}
                                    </Typography>
                                </Typography>
                                <span
                                    style={{ whiteSpace: 'normal' }}
                                    className={styles.typoComment}
                                    dangerouslySetInnerHTML={{ __html: markdown.render(comment.text) }}
                                ></span>
                            </Box>
                        </Box>
                    </Paper>
                ))
            }
        </>
    )
}

export default ArticleComments
