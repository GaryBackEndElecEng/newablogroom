import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { postType } from "@/components/editor/Types";
import prisma from "@/prisma/prismaclient";


// const EMAIL = process.env.EMAIL as string;
// const PASSWORD = process.env.PASSWORD as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const get_id = Number(req.query.id);
    const { id, title, content, link, imageKey, published, userId, likes, image } = req.body as postType;
    const ID = id ? id : 0;


    if (req.method === "POST") {

        if (userId) {

            try {
                const post = await prisma.post.upsert({
                    where: { id: ID },
                    create: {
                        title,
                        content,
                        imageKey,
                        published,
                        userId,
                        link,
                        likes,
                        image
                    },
                    update: {
                        title,
                        content,
                        imageKey,
                        published,
                        link,
                        likes,
                        image
                    }

                });
                if (post) {
                    res.status(200).json(post);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: ` not created/updated:${userId}` });
                    return await prisma.$disconnect();
                }

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `unauthorized-no user found;${userId}` });
            return await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        if (get_id) {

            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: get_id
                    },
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        link: true,
                        image: true,
                        imageKey: true,
                        published: true,
                        date: true,
                        userId: true,
                        likes: true
                    }
                });
                if (post) {
                    res.status(200).json(post);
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
            try {
                const posts = await prisma.post.findMany({
                    where: {
                        published: true
                    },
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        link: true,
                        image: true,
                        imageKey: true,
                        published: true,
                        date: true,
                        userId: true,
                        likes: true
                    }
                });
                if (posts) {
                    res.status(200).json(posts);
                } else {
                    res.status(400).json({ msg: "no posts" })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json(msg);

            } finally {
                return await prisma.$disconnect();
            }
        }
    } else if (req.method === "DELETE" && get_id) {
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
    }



}

async function markDelete(item: { imgKey: string | null }) {
    const { imgKey } = item;
    if (!imgKey) return
    try {

        const isImg = await prisma.deletedImg.update({
            where: {
                imgKey: imgKey
            },
            data: {
                del: true
            }
        });
        if (!isImg) return
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg)
    } finally {
        return await prisma.$disconnect();
    }
}