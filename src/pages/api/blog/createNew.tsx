import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, elementType, codeType, chartType, pageCountType, messageType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import "@aws-sdk/signature-v4-crt";
import { getUserBlogsImgs } from "@/lib/awsFunctions"
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        const { id, name, title, desc, user_id, show, username, imgKey, imgBgKey, attr } = getBlog as blogType;
        const ID = id ? Number(id) : 0;
        const isName = name ? name : "newFile";
        if (user_id) {
            try {
                const blog = await prisma.blog.upsert({
                    where: { user_id: user_id, id: ID, name: isName },
                    create: {
                        name: name ? name : "filename/title",
                        title: title ? title : "Insert Title please",
                        desc: desc ? desc : "blog's description",
                        user_id: user_id,
                        show: show ? show : false,
                        rating: 0,
                        username: username ? username : null,
                        imgKey: imgKey ? imgKey : null,
                        imgBgKey: imgBgKey ? imgBgKey : null,
                        attr: attr ? attr : "none",
                    },
                    update: {
                        name: name ? name : "filename/title",
                        title: title ? title : "Insert Title please",
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
                if (blog) {
                    res.status(200).json(blog)
                } else {
                    res.status(400).json({ msg: "blog was not created" })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ err: "no user_id: blog creation was not created" })
        }
    }
}

