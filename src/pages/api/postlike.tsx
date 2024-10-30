import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { postType } from "@/components/editor/Types";


const prisma = new PrismaClient();
// const EMAIL = process.env.EMAIL as string;
// const PASSWORD = process.env.PASSWORD as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const get_id = Number(req.query.id);
    const likes = Number(req.query.likes);


    if (req.method === "GET") {

        if (get_id) {

            try {
                const post = await prisma.post.update({
                    where: { id: get_id },
                    data: {
                        likes: likes + 1
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
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            } finally {
                return await prisma.$disconnect()
            }
        } else {
            res.status(200).json({ msg: "no posts" });
            return await prisma.$disconnect();
        }
    }
}