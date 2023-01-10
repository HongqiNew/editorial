import { Box, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import Layout from "../../layout";
import ArticlePreview, { Article } from "../../components/art";
import CollectionPreview, { Collection } from "../../components/col";
import supabaseAdmin from "../api/utils/_supabaseClient";

type ColProps = {
    collection: Collection
    articles: Article[]
}

const Col = ({ collection, articles }: ColProps) => {
    return (
        <Layout title={collection.title} cover={collection.preview} description={articles.map(article => article.title).join('\n')}>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                pl: '5%',
                pr: '5%',
            }}>
                <Box><CollectionPreview collection={collection} /></Box>
                <Box sx={{
                    borderLeft: '5px ridge pink',
                    pl: '5%',
                    ml: 'calc(5% + 10px)',
                    minWidth: '30%',
                }}>
                    <Typography variant='h4'>
                        本刊文章一览
                    </Typography>
                    <br></br>
                    {articles.map(article => (
                        <ArticlePreview key={article.id} article={article}></ArticlePreview>
                    ))}
                </Box>
            </Box>

            <Box sx={{
                display: { xs: 'flex', sm: 'none' },
                flexDirection: 'column',
                pl: '5%',
                pr: '5%',
            }}>
                <CollectionPreview collection={collection} />
                <Box sx={{
                    borderTop: '5px ridge pink',
                }}>
                    <br></br>
                    <Typography variant='h4'>
                        本刊文章一览
                    </Typography>
                    <br></br>
                    {articles.map(article => (
                        <ArticlePreview key={article.id} article={article}></ArticlePreview>
                    ))}
                </Box>
            </Box>

            <br></br>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const id = ctx.query.id as string;
    const collection = (await supabaseAdmin
        .from('hongqicol')
        .select()
        .eq('id', id)
        .single())
        .data;
    // 取回 ID 匹配的一刊

    const articleIds: number[] | null = collection?.articles;
    if (articleIds) {
        const alone: boolean = collection?.alone; // 是否是单独文章

        if (alone) {
            // 直接跳转相应文章
            return {
                redirect: {
                    destination: `/art/${articleIds[0]}`,
                    permanent: true
                }
            }
        }

        // 取回 ID 匹配的一刊的多篇文章信息
        const articles: Article[] | null = (await supabaseAdmin
            .from('hongqiart')
            .select('id,title,time,author,tags')
            .in('id', articleIds))
            .data;
        // 按在 ID 列表中的顺序排序
        articles?.sort((a, b) => articleIds.indexOf(a.id) - articleIds.indexOf(b.id));

        return {
            props: {
                collection,
                articles
            }
        }
    }
    else {
        return {
            notFound: true
        }
    }
}

export default Col;
