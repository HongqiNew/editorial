import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

export default withApiAuthRequired(async (req, res) => {
    const {id} = req.body
    const userId = splitId(getSession(req, res)!.user.sub)
    const option = {
        id,
        userId, // 只能删除自己的评论
    }

    const { error } = await supabaseAdmin
        .from('comment')
        .delete()
        .match(option)

    if (error) {
        res.status(500).json({ success: false })
    }
    else {
        res.status(200).json({ success: true })
    }
})
