import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

const loadLikes = async (req: NextApiRequest, res: NextApiResponse) => {
    const { artId } = req.body

    // 总获赞数
    const { count } = await supabaseAdmin
        .from('like')
        .select('*', { count: 'exact', head: true })
        .match({
            artId
        })

    const session = getSession(req, res)
    // 用户是否点赞，默认为 false
    let liked = false
    if (session) {
        const userId = splitId(session.user.sub)
        // 已登录，另外查询
        const userLikeCount = (await supabaseAdmin
            .from('like')
            .select('artId', { count: 'exact', head: true })
            .match({
                artId,
                userId
            }))
            .count
        liked = userLikeCount !== 0
    }

    res.status(200).json({ count, liked })
}

export default loadLikes
