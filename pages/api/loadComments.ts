import { getSession } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

const loadComments = async (req: NextApiRequest, res: NextApiResponse) => {
    const { artId } = req.body
    
    const { data, error } = await supabaseAdmin
        .from('comment')
        .select()
        .match({
            artId
        })
        .order('created_at')

    if (error) {
        console.error(error)
        res.status(500).json({ success: false })
    }
    else {
        const session = getSession(req, res)
        res.status(200).json(data.map((comment) => ({
            ...comment,
            time: new Date(comment.created_at).getTime(), // 创建时间转 Javascript 时间戳
            isMe: session ? comment.userId === splitId(session.user.sub).toString() : false, // 判断是否是当前用户
        })))
    }
}

export default loadComments
