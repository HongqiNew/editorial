import { Card, CardActionArea, CardContent, Typography, CardMedia, SxProps, Theme } from '@mui/material'
import router from 'next/router'
import { Article } from '../utils/types'

type PreviewProps = {
    art: Article
    sx?: SxProps<Theme>
    mediaHeight?: number | string | object
}

const Preview = ({ art, sx, mediaHeight }: PreviewProps) => {
    const { id, title, cover } = art
    const redirect = () => {
        router.push(`/art/${id}`)
    }
    return (
        <Card sx={{
            boxShadow: 'none',
            ...sx
        }}>
            <CardActionArea onClick={redirect}>
                {
                    cover
                        ?
                        <CardMedia
                            sx={{ maxHeight: '40vh', height: mediaHeight }}
                            component='img'
                            alt={title}
                            image={cover}
                        />
                        :
                        <></>
                }
                <CardContent>
                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Preview
