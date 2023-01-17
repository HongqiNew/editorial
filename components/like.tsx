import { Claims } from '@auth0/nextjs-auth0'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkIcon from '@mui/icons-material/Link'
import { Box, IconButton, Typography } from '@mui/material'
import router from 'next/router'
import { useEffect, useState } from 'react'
import post, { get } from '../utils/api'

type ArticleLikesProps = {
    user: Claims | null
    artId: number
    url: string
}

const ArticleLikes = ({ user, artId, url }: ArticleLikesProps) => {
    const [likes, setLikes] = useState(NaN)
    const [liked, setLiked] = useState(false)

    // 获取点赞数及用户是否点赞，并更新 likes 和 liked
    useEffect(() => {
        get('/api/loadLikes', { artId }).then(res => {
            setLikes(res.count ?? 0)
            setLiked(res.liked)
        })
    }, [artId])

    const handleLike = () => {
        if (user) {
            setLiked(liked => !liked)
            setLikes(likes => likes + (liked ? -1 : 1))
            post('/api/like', { artId })
        }
        else {
            router.push(`/api/auth/login?redirect=${url}`)
        }
    }

    const copyLink = () => {
        navigator.clipboard.writeText(url)
    }

    return isNaN(likes)
        ?
        <></>
        : (
            <Box sx={{
                display: 'flex'
            }}>
                <br />
                <IconButton target='_blank' rel='noreferrer' href={`https://twitter.com/compose/tweet?url=${url}`}>
                    <TwitterIcon color='primary' />
                </IconButton>
                <IconButton onClick={copyLink}>
                    <LinkIcon color='primary' />
                </IconButton>
                <Box flexGrow={1}></Box>
                <Box>
                    <IconButton onClick={handleLike}>
                        {
                            liked
                                ?
                                <FavoriteIcon color='primary' />
                                :
                                <FavoriteBorderIcon color='primary' />
                        }
                    </IconButton>
                    <Typography variant='caption' sx={{ fontWeight: 'bolder' }}>{likes}</Typography>
                </Box>
            </Box>
        )
}

export default ArticleLikes
