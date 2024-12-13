
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        const { id, name, title, desc, user_id, show, username, imgKey, imgBgKey, attr } = getBlog as blogType;
        const ID = id ? Number(id) : 0;
        const isName = name ? name : "newFile";
        if (user_id) {
            if (ID === 0) {
                try {
                    const newBlog = await prisma.blog.create({
                        data: {
                            name: isName,
                            title: title ? title : "No Title",
                            desc: desc ? desc : "blog's description",
                            user_id: user_id,
                            show: show ? show : false,
                            rating: 0,
                            username: username ? username : null,
                            imgKey: imgKey ? imgKey : null,
                            imgBgKey: imgBgKey ? imgBgKey : null,
                            attr: attr ? attr : "none",
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
                res.status(302).json({ msg: `the blog id:${ID} was already created` })
            }

        } else {
            res.status(400).json({ err: "no user_id: blog creation was not created" })
        }
    }
}

