import { NextApiRequest, NextApiResponse } from 'next'
import supabaseAdmin from './utils/_supabaseClient'

// 提交到 Google Search Console
const sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
    const prefix = 'https://newhongqi.org'
    let paths = ['/']

    const artsData = (await supabaseAdmin.from('art').select('id')).data as { id: number }[]
    const artsPaths = artsData.map(article => `/art/${article.id}`)
    const collectionsData = (await supabaseAdmin.from('hongqicol').select('id')).data as { id: number }[]
    const collectionsPaths = collectionsData.map(collection => `/col/${collection.id}`)

    paths = paths.concat(artsPaths).concat(collectionsPaths).map(path => `${prefix}${path}`)
    // 含主页与所有文章和刊物
    res.status(200).send(paths.join('\n'))
}

export default sitemap
