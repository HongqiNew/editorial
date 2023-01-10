import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import splitId from "./utils/_splitId";
import supabaseAdmin from "./utils/_supabaseClient";

export default withApiAuthRequired(async (req, res) => {
    const text: string = req.body.value;
    const article: string = req.body.articleId;
    
    const user = getSession(req, res)!.user;
    if (!text || text === '') {
        res.status(400).json({ success: false });
        return;
    }
    const { error } = await supabaseAdmin
        .from('hongqicom')
        .insert({
            text,
            article,
            user_name: user.name,
            user_id: splitId(user.sub),
        }, {
            returning: 'minimal',
        });

    if (error) {
        res.status(500).json({ success: false });
    }
    else {
        res.status(200).json({ success: true });
    }
})
