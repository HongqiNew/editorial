import { Box, Divider, Pagination, PaginationItem } from '@mui/material'
import { GetServerSideProps } from 'next'
import router from 'next/router'
import Preview from '../components/preview'
import Articles from '../components/articles'
import Layout from '../layout'
import { Article } from '../utils/types'
import supabaseAdmin from './api/utils/_supabaseClient'
import PinIcon from 'mdi-material-ui/PinOutline'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
const Slider = require('react-slick').default

type HomeProps = {
    arts: Article[]
    pinnedArts: Article[]
    page: number
    pageCount: number
}

const Home = ({ arts, pinnedArts, page, pageCount }: HomeProps) => {
    const settings = {
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <Layout title='主页'>
            <Slider {...settings}>
                {
                    pinnedArts.map(art => (
                        <Box key={art.id} sx={{ position: 'relative' }}>
                            <Box sx={{ position: 'absolute', top: -3, zIndex: 1, left: '50%' }}>
                                <PinIcon color='primary' fontSize='large' sx={{ position: 'relative', left: '-50%' }}></PinIcon>
                            </Box>
                            <br></br>
                            <Preview art={art} mediaHeight={{ xs: '30vh', md: '40vh' }} />
                        </Box>
                    ))
                }
            </Slider>
            <br></br>

            <Divider sx={{ opacity: 0.5 }}></Divider>
            <br></br>

            <Articles arts={arts}></Articles>
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
        .select('id,title,cover,pin,visible')
        .eq('visible', true)
        .order('id', { ascending: false })
        .range((page - 1) * artCountPerPage, page * artCountPerPage - 1)

    const pinnedArtsDataPromise = supabaseAdmin
        .from('art')
        .select('id,title,cover,pin')
        .gt('pin', 0)
        .order('pin')

    const [artsData, pinnedArtsData] = await Promise.all([artsDataPromise, pinnedArtsDataPromise])
    const arts = artsData.data
    const pinnedArts = pinnedArtsData.data

    return {
        props: { arts, pinnedArts, page, pageCount }
    }
}

export default Home
