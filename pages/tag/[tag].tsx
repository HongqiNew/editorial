import supabaseAdmin from '../api/utils/_supabaseClient'
import { GetServerSideProps } from 'next'
import Articles from '../../components/articles'
import Layout from '../../layout'
import { Article } from '../../utils/types'

type TagProps = {
    arts: Article[]
    tag: string
}

const Tag = ({ arts, tag }: TagProps) => {
    return (
        <Layout title={`标签 ${tag}`} description={arts.map(article => article.title).join('\n')}>
                <Articles arts={arts} />
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

export default Tag
