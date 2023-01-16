import supabaseAdmin from '../api/utils/_supabaseClient'
import { GetServerSideProps } from 'next'
import { Box } from '@mui/material'
import Row from '../../components/row'
import Layout from '../../layout'
import { Article } from '../../utils/types'

type ArtProps = {
    arts: Article[]
    tag: string
}

const Art = ({ arts, tag }: ArtProps) => {
    return (
        <Layout title={`标签 ${tag}`} description={arts.map(article => article.title).join('\n')}>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4% 0 0'
            }}>
                <Row arts={arts.filter((value, index) => index % 3 === 0)} />
                <Row arts={arts.filter((value, index) => index % 3 === 1)} />
                <Row arts={arts.filter((value, index) => index % 3 === 2)} />
            </Box>
            <Box sx={{
                display: { sm: 'none', xs: 'flex' },
                flexDirection: 'column',
                padding: '0 5%',
            }}>
                <Row arts={arts} />
            </Box>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const tag = ctx.query.tag as string
    const arts = (await supabaseAdmin
        .from('art')
        .select()
        .contains('tags', [tag]))
        .data ?? []
    return {
        props: {
            arts,
            tag
        }
    }
}

export default Art
