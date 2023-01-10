import { getSession } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import splitId from "./utils/_splitId";
import supabaseAdmin from "./utils/_supabaseClient";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const article: string = req.body.articleId;
    
    const { data, error } = await supabaseAdmin
        .from('hongqicom')
        .select()
        .match({
            article
        })
        .order('created_at');

    if (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
    else {
        const session = getSession(req, res);
        res.status(200).json(data.map((comment) => ({
            ...comment,
            time: new Date(comment.created_at).getTime(), // 创建时间转 Javascript 时间戳
            user_id: `${(comment.user_id as string).substring(0, 5)}***`, // 截取用户id前5位
            isMe: session ? comment.user_id === splitId(session.user.sub).toString() : false, // 判断是否是当前用户
        })));
    }
}
