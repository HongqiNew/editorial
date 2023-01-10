import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    await handleLogin(req, res, {
      returnTo: req.query.redirect ? req.query.redirect as string : '/'
    });
  }
});
