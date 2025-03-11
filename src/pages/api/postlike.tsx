
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const get_id = Number(req.query.id);
    const likes = Number(req.query.likes);


    if (req.method === "GET") {

        if (get_id && likes) {

            try {
                const post = await prisma.post.update({
                    where: { id: get_id },
                    data: {
                        likes: likes
                    }

                });
                if (post) {
                    res.status(200).json(post);
                    return await prisma.$disconnect();
                } else {
                    res.status(200).json({ msg: "no post" });
                    return await prisma.$disconnect();
                }

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(500).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else {
            res.status(408).json({ msg: "invalid resquest" });
            return await prisma.$disconnect();
        }
    }
}