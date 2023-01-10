import { Claims } from "@auth0/nextjs-auth0";
import { Button, Paper, IconButton, Typography, Link } from "@mui/material";
import styles from "../styles/Typo.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import post, { get } from "../utils/api";
import markdown, { makeMarkdownLinkUseRouterPush } from "../utils/md";
import CommentInput from "./input";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";

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
        = useState(new Array());
    const [hasCommentsLoaded, setHasCommentsLoaded] = useState(false);
    const [userComment, setUserComment] = useState('');

    const loadComments = async () => {
        setHasCommentsLoaded(true);
        const data: Comment[] | [] = (await get('/api/loadComments', { articleId })) ?? [];
        setComments(data);
        setTimeout(() => {
            makeMarkdownLinkUseRouterPush();
        });
    }

    const replyComment = (text: string) => {
        const quote = text.split('\n').map((line) => `> ${line}`).join('\n');
        // 在每一行前加上引用符“>”
        setUserComment(`${quote}\n\n`);
    }
    const deleteComment = async (id: string) => {
        await post('/api/deleteComment', { id });
        setComments(comments.filter((comment) => comment.id !== id));
    }

    return (
        <>
            {
                user
                    ?
                    <CommentInput
                        label='评论'
                        rows={5}
                        value={userComment}
                        setValue={setUserComment}
                        url={`/api/comment`}
                        errorChecker={value => value.length === 0}
                        placeholder='纯文本也属于 Markdown。'
                        description={<>
                            对本文评论请使用 <Link href='/art/2' target='_blank' rel='noreferrer'>Markdown</Link> 语法。如果你不知道什么是 Markdown，请直接键入你的评论即可。<Link href='https://pandao.github.io/editor.md/' target='_blank' rel='noreferrer'>这里</Link>有一个在线 Markdown 编辑器，它的界面有中文翻译且完全<Link href='https://github.com/pandao/editor.md' target='_blank' rel='noreferrer'>开源</Link>。
                        </>}
                        body={{
                            articleId
                        }}>
                    </CommentInput>
                    :
                    <Button variant='outlined' color='error' fullWidth href={`/api/auth/login?redirect=${url}`}>登录以评论</Button>
            }
            <br></br>
            <br></br>
            <Button variant='outlined' color={hasCommentsLoaded ? 'warning' : 'error'} fullWidth onClick={loadComments}>
                {hasCommentsLoaded ? '刷新评论' : '加载评论'}
            </Button>
            {
                comments.map((comment, index) => (
                    <Paper elevation={3} key={index} className={styles.typo} sx={{
                        padding: '10px 10px 0 10px',
                        whiteSpace: 'pre-line',
                        position: 'relative',
                        marginTop: 4,
                    }}>
                        <IconButton sx={{ position: 'absolute', right: 0, top: 0 }} onClick={() => replyComment(comment.text)}><ReplyIcon /></IconButton>
                        {
                            comment.isMe
                                ?
                                <IconButton sx={{ position: 'absolute', right: 40, top: 0 }} onClick={() => deleteComment(comment.id)}><DeleteIcon /></IconButton>
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

export default ArticleComments;
