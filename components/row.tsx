import { Box } from '@mui/material'
import ArticlePreview, { Article } from './art'
import CollectionPreview, { Collection } from './col'

type CollectionRowProps = {
    collections: Collection[]
    smMarginRight?: string
}

export const CollectionRow = ({ collections, smMarginRight }: CollectionRowProps) => {
    return (
        <Box sx={{
            marginRight: { sm: smMarginRight ?? '3%', xs: '0' },
            maxWidth: { sm: '31.3%', xs: 'unset' }
        }}>
            {
                collections.map(col => (
                    <CollectionPreview collection={col} key={col.id} />
                ))
            }
        </Box>
    )
}

type ArticleRowProps = {
    articles: Article[]
}

export const ArticleRow = ({ articles }: ArticleRowProps) => {
    return (
        <Box sx={{
            marginLeft: { sm: '4%', xs: '0' },
            width: { sm: '50%', xs: 'unset' }
        }}>
            {
                articles.map(art => (
                    <ArticlePreview article={art} key={art.id} />
                ))
            }
        </Box>
    )
}
