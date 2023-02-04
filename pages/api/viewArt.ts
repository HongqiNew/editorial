import { NextApiRequest, NextApiResponse } from 'next'
import supabaseAdmin from './utils/_supabaseClient'

const viewArt = async (req: NextApiRequest, res: NextApiResponse) => {
    const { artId } = req.body
    const { error } = await supabaseAdmin
        .rpc('view_art', { row_id: artId })
    res.status(error ? 500 : 200).json({ success: !error })
}

export default viewArt
