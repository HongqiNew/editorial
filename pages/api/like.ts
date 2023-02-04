import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

export default withApiAuthRequired(async (req, res) => {
    const { artId } = req.body
    const userId = splitId(getSession(req, res)!.user.sub)
    const option = {
        artId,
        userId,
    }

    // 通过 artId 和 userId 查询是否已经点赞
    const liked = Boolean((await supabaseAdmin
        .from('like')
        .select()
        .match(option))
        .data
        ?.length)

    if (liked) {
        // 已经点赞，取消
        await supabaseAdmin
            .from('like')
            .delete()
            .match(option)
    }
    else {
        // 未点赞，点赞
        await supabaseAdmin
            .from('like')
            .insert(option, {
                returning: 'minimal',
            })
    }

    res.status(200).json({ success: true })
})
