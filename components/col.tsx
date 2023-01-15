import { Card, CardActionArea, CardContent, Typography, CardMedia, SxProps, Theme, Link } from '@mui/material'
import router from 'next/router'

export type Collection = {
    id: number
    title: string
    time: number
    preview: string
    articals: string[]
    download: string | undefined
}

type CollectionPreviewProps = {
    collection: Collection
    sx?: SxProps<Theme>
}

const CollectionPreview = ({ collection, sx }: CollectionPreviewProps) => {
    const redirect = () => {
        router.push(`/col/${collection.id}`)
    }
    return (
        <Card raised sx={{
            mb: 5,
            ...sx
        }}>
            <CardActionArea sx={{ height: '100%' }} onClick={redirect}>
                <CardContent>
                    <Typography variant='h5'>
                        {collection.title}
                    </Typography>
                    <Typography variant='body2'>
                        {new Date(collection.time).toLocaleDateString()}
                    </Typography>
                    {
                        collection.download
                            ?
                            <Typography variant='body2'>
                                <Link href={collection.download} target='_blank' rel='noreferrer'>下载本刊</Link>（中国大陆可能不可用）
                            </Typography>
                            :
                            <></>
                    }
                </CardContent>
                <CardMedia
                    component='img'
                    alt={collection.title}
                    image={collection.preview}
                />
            </CardActionArea>
        </Card>
    )
}

export default CollectionPreview
