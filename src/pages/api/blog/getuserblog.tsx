import { getErrorMessage } from "@/lib/errorBoundaries";
import { NextApiRequest, NextApiResponse } from "next";
import { getBlogImages } from "@/lib/awsFunctions";
import { blogType } from "@/components/editor/Types";
import prisma from "@/prisma/prismaclient";

//--------( /API/BLOG/ID ) OR ( /API/BLOG/USER_ID )---------///
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { blog_id, user_id } = req.query;
    if (req.method === "GET") {
        if (blog_id && user_id) {
            try {
                const blog = await prisma.blog.findUnique({
                    where: { id: parseInt(blog_id as string), user_id: user_id as string },
                    include: {
                        selectors: {
                            include: {
                                colAttr: true,
                            }
                        },
                        elements: true,
                        codes: {
                            include: {
                                linecode: true
                            }
                        },
                        charts: true,
                        pageCounts: true
                    }
                });
                if (blog) {

                    res.status(200).json(blog);

                } else {
                    res.status(500).json({ msg: "did not get blog- something went wrong" })
                }
            } catch (error) {
                const msg = getErrorMessage(error.message);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: "not authorized" });
        }
    }
    if (req.method === "DELETE") {
        if (blog_id && user_id) {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: user_id as string }
                });
                if (user) {

                    const delBlog = await prisma.blog.delete({
                        where: { id: parseInt(blog_id as string) }
                    });
                    res.status(200).json({ id: delBlog.id });
                } else {
                    res.status(400).json({ msg: "not authorized" });
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json({ message: msg });
            } finally {
                await prisma.$disconnect();
            }
        }
    }

}