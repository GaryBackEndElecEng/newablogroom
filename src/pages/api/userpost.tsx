import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { postType, userType } from "@/components/editor/Types";
import prisma from "@/prisma/prismaclient";


// const EMAIL = process.env.EMAIL as string;
// const PASSWORD = process.env.PASSWORD as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string };

        if (user_id) {

            try {
                const posts = await prisma.post.findMany({
                    where: {
                        userId: user_id
                    }
                });
                if (posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(400).json({ msg: "no post found" })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json(msg);

            } finally {
                return await prisma.$disconnect();
            }
        } else {
            res.status(400).json({ msg: "No ID: unauthorized" });
            return await prisma.$disconnect();
        }
    } else if (req.method === "DELETE") {
        const get_id = Number(req.query.id);
        if (get_id) {

            try {
                const post_del = await prisma.post.delete({
                    where: {
                        id: get_id
                    }
                });
                if (post_del) {
                    await markDelete({ imgKey: post_del.imageKey })
                    res.status(200).json(post_del);
                } else {
                    res.status(400).json({ msg: "no post deleted" })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json(msg);

            } finally {
                return await prisma.$disconnect();
            }
        } else {
            res.status(400).json({ msg: "no ID, delete failed" });
            return await prisma.$disconnect();
        }
    } else {
        res.status(400).json({ msg: "unauthorized" });
        return await prisma.$disconnect();
    }




}

async function markDelete(item: { imgKey: string | null }) {
    const { imgKey } = item;
    if (!imgKey) return
    try {
        await prisma.deletedImg.update({
            where: {
                imgKey: imgKey
            },
            data: {
                del: true
            }
        });
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg)
    } finally {
        return await prisma.$disconnect();
    }
}