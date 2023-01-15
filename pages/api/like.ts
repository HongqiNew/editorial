import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

export default withApiAuthRequired(async (req, res) => {
    const article: string = req.body.articleId
    
    const user = getSession(req, res)!.user
    const option = {
        article,
        user_id: splitId(user.sub),
    }

    // 通过 article 和 user_id 查询是否已经点赞
    const liked = Boolean((await supabaseAdmin
        .from('hongqilike')
        .select()
        .match(option))
        .data
        ?.length)

    if (liked) {
        // 已经点赞，取消
        await supabaseAdmin
            .from('hongqilike')
            .delete()
            .match(option)
    }
    else {
        // 未点赞，点赞
        await supabaseAdmin
            .from('hongqilike')
            .insert(option, {
                returning: 'minimal',
            })
    }

    res.status(200).json({ success: true })
})
