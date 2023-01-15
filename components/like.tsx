import { Claims } from '@auth0/nextjs-auth0'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Box, IconButton, Typography } from '@mui/material'
import router from 'next/router'
import { useEffect, useState } from 'react'
import post, { get } from '../utils/api'

type ArticleLikesProps = {
    user: Claims | null
    articleId: number
    url: string
}

const ArticleLikes = ({ user, articleId, url }: ArticleLikesProps) => {
    const [likes, setLikes] = useState(NaN)
    const [liked, setLiked] = useState(false)

    // 获取点赞数及用户是否点赞，并更新 likes 和 liked
    useEffect(() => {
        get('/api/loadLikes', { articleId }).then(res => {
            setLikes(res.count ?? 0)
            setLiked(res.liked)
        })
    }, [])

    const handleLike = () => {
        if (user) {
            setLiked(liked => !liked)
            setLikes(likes => likes + (liked ? -1 : 1))
            post('/api/like', { articleId })
        }
        else {
            router.push(`/api/auth/login?redirect=${url}`)
        }
    }
    return isNaN(likes)
        ?
        <></>
        : (
            <Box>
                <br />
                <IconButton target='_blank' rel='noreferrer' href={`https://twitter.com/compose/tweet?url=${url}`}>
                    <TwitterIcon />
                </IconButton>
                <IconButton onClick={handleLike}>
                    <ThumbUpIcon htmlColor={liked ? 'pink' : undefined} />
                </IconButton>
                <Typography variant='caption'>{likes}</Typography>
            </Box>
        )
}

export default ArticleLikes
