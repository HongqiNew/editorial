import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

const loadLikes = async (req: NextApiRequest, res: NextApiResponse) => {
    const article: string = req.body.articleId
    
    // 总获赞数
    const { count } = await supabaseAdmin
        .from('hongqilike')
        .select('*', { count: 'exact', head: true })
        .match({
            article
        })

    const session = await getSession(req, res)
    // 用户是否点赞，默认为 false
    let liked = false
    if (session) {
        // 已登录，另外查询
        const userLikeCount = (await supabaseAdmin
            .from('hongqilike')
            .select('article', { count: 'exact', head: true })
            .match({
                article,
                user_id: splitId(session.user.sub)
            }))
            .count
        liked = userLikeCount !== 0
    }

    res.status(200).json({ count, liked })
}

export default loadLikes
