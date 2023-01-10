import supabaseAdmin from "../api/utils/_supabaseClient";
import { Article } from "../../components/art";
import Layout from "../../layout";
import { GetServerSideProps } from "next";
import { Box } from "@mui/material";
import { ArticleRow } from "../../components/row";

type ArtProps = {
    articles: Article[]
    tag: string
}

const Art = ({ articles, tag }: ArtProps) => {
    return (
        <Layout title={`标签 ${tag}`} description={articles.map(article => article.title).join('\n')}>
            <Box sx={{
                display: { sm: 'flex', xs: 'none' },
                padding: '0 4% 0 0'
            }}>
                <ArticleRow articles={articles.filter((value, index) => index % 3 === 0)} />
                <ArticleRow articles={articles.filter((value, index) => index % 3 === 1)} />
                <ArticleRow articles={articles.filter((value, index) => index % 3 === 2)} />
            </Box>
            <Box sx={{
                display: { sm: 'none', xs: 'flex' },
                flexDirection: 'column',
                padding: '0 5%',
            }}>
                <ArticleRow articles={articles} />
            </Box>

            <br></br>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    const tag = ctx.query.tag as string;
    const articles = (await supabaseAdmin
        .from('hongqiart')
        .select()
        .contains('tags', [tag]))
        .data ?? [];
    return {
        props: {
            articles,
            tag
        }
    }
}

export default Art;
