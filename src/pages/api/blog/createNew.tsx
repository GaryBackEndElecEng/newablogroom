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
        const { name, title, desc, user_id, inner_html, show, rating, username, imgKey, imgBgKey, attr } = getBlog as blogType;
        // console.log("BLOG:=>>>", getBlog)
        if (user_id) {
            try {
                const blog = await prisma.blog.create({
                    data: {
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

                    let newBlog: blogType = {} as blogType;
                    const updateSelects: selectorType[] = [];
                    const update_elements: elementType[] = [];
                    const update_codes: codeType[] = [];
                    const update_charts: chartType[] = [];
                    const pageCounts: pageCountType[] = [];
                    const messages: messageType[] = [];

                    newBlog = { ...blog, selectors: updateSelects, elements: update_elements, codes: update_codes, charts: update_charts, pageCounts, messages } as unknown as blogType;
                    res.status(200).json(newBlog);
                } else {
                    res.status(400).json({ message: "no body provided" })
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

