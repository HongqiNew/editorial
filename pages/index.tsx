import { Box, Pagination, PaginationItem } from '@mui/material'
import { GetServerSideProps } from 'next'
import router from 'next/router'
import Preview from '../components/preview'
import Row from '../components/row'
import Layout from '../layout'
import { Article } from '../utils/types'
import supabaseAdmin from './api/utils/_supabaseClient'

type HomeProps = {
    arts: Article[]
    page: number
    pageCount: number
}

const Home = ({ arts, page, pageCount }: HomeProps) => {
    const tempArt = { id: 111, cover: 'https://i0.wp.com/www.agilenative.com/wp-content/uploads/2017/01/001-Agile-Hello-World.png?w=1745&ssl=1', title: '社论发布站数据结构重新设计，暂时无法使用' } as Article
    return (
        <Layout title='主页'>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4%',
            }}>
                <Preview sx={{ width: '100%' }} art={tempArt} />
            </Box>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4%',
            }}>
                <Row arts={arts.filter((value, index) => index % 3 === 0)} />
                <Row arts={arts.filter((value, index) => index % 3 === 1)} />
                <Row smMarginRight='0' arts={arts.filter((value, index) => index % 3 === 2)} />
            </Box>

            <Box sx={{
                display: { sm: 'none', xs: 'flex' },
                flexDirection: 'column',
                padding: '0 5%',
            }}>
                <Preview art={tempArt} />
                <Row arts={arts} />
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
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const artCountPerPage = 9
    const page = ctx.query.page ? parseInt(ctx.query.page as string) : 1

    const count = (await supabaseAdmin
        .from('art')
        .select('*', { count: 'exact', head: true })).count as number
    const pageCount = Math.ceil(count / artCountPerPage)

    const artsDataPromise = supabaseAdmin
        .from('art')
        .select('id,title,cover')
        .order('id', { ascending: false })
        .range((page - 1) * artCountPerPage, page * artCountPerPage - 1)

    const artsData = await artsDataPromise
    const arts = artsData.data

    return {
        props: { arts, page, pageCount }
    }
}

export default Home
