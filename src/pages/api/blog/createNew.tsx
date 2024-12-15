
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        const id = getBlog && Number(getBlog.id) ? getBlog.id : 0
        const isName = getBlog.name ? getBlog.name : "newFile";
        if (getBlog && getBlog.user_id) {
            if (id === 0) {
                try {
                    const newBlog = await prisma.blog.create({
                        data: {
                            name: isName,
                            title: getBlog.title ? getBlog.title : "No Title",
                            desc: getBlog.desc ? getBlog.desc : "blog's description",
                            user_id: getBlog.user_id,
                            show: false,
                            rating: 0,
                            username: getBlog.username ? getBlog.username : null,
                            imgKey: null,
                            imgBgKey: null,
                            attr: "square",
                            img: null,
                            eleId: getBlog.eleId ? getBlog.eleId : null,
                            class: getBlog.class ? getBlog.class : null,
                            inner_html: getBlog.inner_html ? getBlog.inner_html : null,
                            cssText: getBlog.cssText ? getBlog.cssText : null,
                        }
                    });
                    if (newBlog) {
                        res.status(200).json(newBlog);
                    } else {
                        res.status(400).json({ msg: "new blog was not created" });
                    }
                } catch (error) {
                    const msg = getErrorMessage(error);
                    console.log("error: ", msg)
                    res.status(400).json({ message: msg })
                } finally {
                    await prisma.$disconnect()
                }
            } else {
                res.status(302).json({ msg: `the blog id:${id} was already created` })
            }

        } else {
            res.status(400).json({ err: "no user_id: blog creation was not created" })
        }
    }
}

