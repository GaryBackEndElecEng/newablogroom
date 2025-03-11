import { NextApiRequest, NextApiResponse } from "next";
import { getToken, } from "next-auth/jwt";
const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
    // const token = await getToken({ req })
    if (req.method === "GET") {
        const token = await getToken({ req, secret })
        res.status(200).json({ token });
    }
    res.end()
}