import { getErrorMessage } from "@/lib/errorBoundaries";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { blogType } from "@/components/editor/Types";
import { findCountKeys, generateMarkImgkey } from "@/lib/ultils/functions";
import prisma from "@/prisma/prismaclient";

//--------( /API/BLOG/ID ) OR ( /API/BLOG/USER_ID )---------///
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string };
    const id_num = Number(id);
    // console.log("blog:id", id_num)
    if (req.method === "GET") {
        if (id_num && !isNaN(id_num)) {
            try {
                const blog = await prisma.blog.findUnique({
                    where: { id: id_num },
                    include: {
                        selectors: {
                            include: {
                                colAttr: true,
                            }
                        },
                        messages: true,
                        elements: true,
                        codes: {
                            include: {
                                linecode: true
                            }
                        },
                        pageCounts: true,
                        charts: true
                    }
                });
                if (!blog) { res.status(400).json({ msg: "no page" }); return await prisma.$disconnect(); }
                await findCountKeys(blog as unknown as blogType);
                res.status(200).json(blog);
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(500).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `could not find post: id:${id_num}` })
        }
    }
    if (req.method === "DELETE") {
        if (id) {
            try {
                const blogImgKey = await prisma.blog.findUnique({
                    where: { id: parseInt(id as string) }
                });
                const imgKeys: { level: string, imgKey: string }[] = generateMarkImgkey(blogImgKey as blogType | null);
                // console.log("blog/id:delete:imgKeys", imgKeys)//SHOWING []
                if (imgKeys && imgKeys.length > 0) {
                    await Promise.all(imgKeys.map(async (item) => {
                        if (item) {

                            await prisma.deletedImg.update({
                                where: { imgKey: item.imgKey },
                                data: {
                                    del: true
                                }
                            });
                        }
                    }));
                }
                await prisma.blog.delete({
                    where: { id: parseInt(id as string) }
                });
                res.status(200).json({ id: id });
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(500).json({ message: msg });
            } finally {
                await prisma.$disconnect();
            }
        }
    }

}