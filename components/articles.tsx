import { Box, Grid } from '@mui/material'
import { Article } from '../utils/types'
import Preview from './preview'

type ArticlesProps = {
    arts: Article[]
}

const Articles = ({ arts }: ArticlesProps) => {
    return (
            <Grid container spacing={2}>
                {
                    arts.map(art => (
                        <Grid item key={art.id} xs={12} md={4}>
                            <Preview key={art.id} art={art} />
                        </Grid>
                    ))
                }
            </Grid>
    )
}

export default Articles
