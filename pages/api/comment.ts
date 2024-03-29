import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import splitId from './utils/_splitId'
import supabaseAdmin from './utils/_supabaseClient'

export default withApiAuthRequired(async (req, res) => {
    const { text, artId } = req.body
    const user = getSession(req, res)!.user
    const userId = splitId(user.sub)
    const userPic = user.picture
    const userName = user.name
    if (!text || text === '') {
        res.status(400).json({ success: false })
        return
    }

    const { error } = await supabaseAdmin
        .from('comment')
        .insert({
            text,
            artId,
            userId,
            userName,
            userPic
        }, {
            returning: 'minimal',
        })

    if (error) {
        res.status(500).json({ success: false })
    }
    else {
        res.status(200).json({ success: true })
    }
})
