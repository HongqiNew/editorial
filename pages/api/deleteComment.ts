import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

export default withApiAuthRequired(async (req, res) => {
    const id: string = req.body.id
    
    const user = (await getSession(req, res))!.user
    const option = {
        id,
        user_id: splitId(user.sub), // 只能删除自己的评论
    }
    const { error } = await supabaseAdmin
        .from('hongqicom')
        .delete()
        .match(option)

    if (error) {
        res.status(500).json({ success: false })
    }
    else {
        res.status(200).json({ success: true })
    }
})
