import { Box, Pagination, PaginationItem } from '@mui/material'
import { GetServerSideProps } from 'next'
import router from 'next/router'
import CollectionPreview, { Collection } from '../components/col'
import { CollectionRow } from '../components/row'
import Layout from '../layout'
import supabaseAdmin from './api/utils/_supabaseClient'

type HomeProps = {
    collections: Collection[]
    topCollection: Collection
    page: number
    pageCount: number
}

const Home = ({ collections, topCollection, page, pageCount }: HomeProps) => {
    return (
        <Layout title='主页'>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4%',
            }}>
                <CollectionPreview sx={{ width: '100%' }} collection={topCollection} />
            </Box>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4%',
            }}>
                <CollectionRow collections={collections.filter((value, index) => index % 3 === 0)} />
                <CollectionRow collections={collections.filter((value, index) => index % 3 === 1)} />
                <CollectionRow smMarginRight='0' collections={collections.filter((value, index) => index % 3 === 2)} />
            </Box>

            <Box sx={{
                display: { sm: 'none', xs: 'flex' },
                flexDirection: 'column',
                padding: '0 5%',
            }}>
                <CollectionPreview collection={topCollection} />
                <CollectionRow collections={collections} />
            </Box>
            <br></br>

            <Pagination
                sx={{ display: 'flex', justifyContent: 'center' }}
                size='large'
                variant='outlined'
                color='primary'
                page={page}
                count={pageCount}
                renderItem={(item) => (
                    <PaginationItem
                        {...item}
                        onClick={() => router.push(`?page=${item.page}`)}
                    />
                )}
            ></Pagination>
            <br></br>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const collectionNumPerPage = 9
    const firstCollectionId = 10
    const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1
    // 取回最新刊物 ID
    const lastCollectionId = (await supabaseAdmin
        .from('hongqicol')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
        .single())
        .data
        .id
    const searchStartId = lastCollectionId - (page - 1) * collectionNumPerPage

    // 取回含文章的刊物
    const collectionsDataPromise = supabaseAdmin
        .from('hongqicol')
        .select('id,time,title,preview')
        .not('articles', 'is', null)
        .not('id', 'eq', 0)
        .lte('id', searchStartId)
        .order('id', { ascending: false })
        .limit(collectionNumPerPage)

    // 取回置顶刊
    const topCollectionDataPromise = supabaseAdmin
        .from('hongqicol')
        .select('id,time,title,preview')
        .eq('id', 0)
        .single()

    // 等待所有 Promise 完成并取出数据
    const [collectionsData, topCollectionData] = await Promise.all([
        collectionsDataPromise,
        topCollectionDataPromise,
    ])
    const collections = collectionsData.data
    const topCollection = topCollectionData.data

    // 总页数 = 刊物数 / 每页刊物数（进一）
    // 刊物数 ≈ 最后一刊 ID - 第一刊 ID + 1 （植树问题）
    const pageCount = Math.ceil((lastCollectionId - firstCollectionId + 1) / collectionNumPerPage)

    return {
        props: { collections, topCollection, page, pageCount }
    }
}

export default Home
