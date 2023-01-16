import { Box } from '@mui/material'
import { Article } from '../utils/types'
import Preview from './preview'

type RowProps = {
    arts: Article[]
    smMarginRight?: string
}

const Row = ({ arts, smMarginRight }: RowProps) => {
    return (
        <Box sx={{
            marginRight: { sm: smMarginRight ?? '30px', xs: '0' },
            maxWidth: { sm: '31.3%', xs: 'unset' }
        }}>
            {
                arts.map(art => (
                    <Preview key={art.id} art={art} />
                ))
            }
        </Box>
    )
}

export default Row
