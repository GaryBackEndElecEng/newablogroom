import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


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
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: "no post found" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json(msg);
                return await prisma.$disconnect();

            };
        } else {
            res.status(400).json({ msg: "No ID: unauthorized" });
            return await prisma.$disconnect();
        };
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
                    await markDelete({ imgKey: post_del.imageKey });
                    res.status(200).json(post_del);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: "no post deleted" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json(msg);
                return await prisma.$disconnect();
            };

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
        console.error(msg);
        return await prisma.$disconnect();
    };
}