import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, elementType, codeType, chartType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import "@aws-sdk/signature-v4-crt";
import { getUserBlogsImgs } from "@/lib/awsFunctions"
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        // console.log("BLOG:=>>>", getBlog)
        if (getBlog.user_id) {
            try {
                const blog = await prisma.blog.create({
                    data: {
                        name: getBlog.name ? getBlog.name : "filename/title",
                        desc: getBlog.desc ? getBlog.desc : "blog's description",
                        user_id: getBlog.user_id as string,
                        img: null,
                        eleId: getBlog.eleId,
                        class: getBlog.class,
                        inner_html: getBlog.inner_html ? getBlog.inner_html : null,
                        cssText: getBlog.cssText,
                        show: getBlog.show ? getBlog.show : false,
                        rating: 0,
                        title: getBlog.title ? getBlog.title : "title",
                        username: getBlog.username ? getBlog.username : null,
                        imgKey: getBlog.imgKey ? getBlog.imgKey : null,
                        attr: getBlog.attr ? getBlog.attr : "none"
                    }
                });
                if (blog) {

                    let newBlog: blogType = {} as blogType;
                    const updateSelects: selectorType[] = [];
                    const update_elements: elementType[] = [];
                    const update_codes: codeType[] = [];
                    const update_charts: chartType[] = [];

                    newBlog = { ...blog, selectors: updateSelects, elements: update_elements, codes: update_codes, charts: update_charts } as unknown as blogType;
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
    } else if (req.method === "GET") {
        //-------------( GETS ALL BLOGS ) -------------//
        try {
            const blogs = await prisma.blog.findMany() as unknown[] as blogType[];
            const blogsWithImgs = await getUserBlogsImgs(blogs);
            res.status(200).json(blogsWithImgs)
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg)
            res.status(400).json({ message: msg })
        } finally {
            await prisma.$disconnect();
        }

    }
}

