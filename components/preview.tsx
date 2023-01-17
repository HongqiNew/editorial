import { Card, CardActionArea, CardContent, Typography, CardMedia, SxProps, Theme, Link } from '@mui/material'
import router from 'next/router'
import { Article } from '../utils/types'

type PreviewProps = {
    art: Article
    sx?: SxProps<Theme>
}

const Preview = ({ art, sx }: PreviewProps) => {
    const { id, title, cover } = art
    const redirect = () => {
        router.push(`/art/${id}`)
    }
    return (
        <Card sx={{
            boxShadow: 'none',
            ...sx
        }}>
            <CardActionArea sx={{ height: '100%' }} onClick={redirect}>
                {
                    cover
                        ?
                        <CardMedia
                            sx={{ maxHeight: '50vh' }}
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
