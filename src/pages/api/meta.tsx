

import { NextApiRequest, NextApiResponse } from "next";
import { blogType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //  THIS SAVES MESSAGES AND , IF BLOG_ID && RATE UPDATES BLOG RATE
    if (req.method === "GET") {
        const { blogs, users } = req.query;
        if (!(blogs || users)) { res.status(400).json({ msg: "nothing recieved" }); return await prisma.$disconnect() };
        if (users === "users") {
            try {
                const users_ = await prisma.user.findMany({
                    select: {
                        name: true,
                        email: true,
                        imgKey: true,
                        image: true
                    }
                });
                res.status(200).json(users_);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            }
        }
        if (blogs === "blogs") {
            try {
                const blogs_ = await prisma.blog.findMany({
                    select: {
                        id: true,
                        name: true,
                        desc: true,
                        user_id: true,
                        img: true,
                        imgKey: true,
                        rating: true,
                        attr: true
                    }
                });

                res.status(200).json(blogs_);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            }
        }
    };


    if (req.method === "PUT") {
        const blog = req.body as blogType;
        if (!(blog?.id)) { res.status(400).json({ error: `no blog recieved:${req.body}` }); return await prisma.$disconnect(); };
        try {
            const metaBlog = await prisma.blog.update({
                where: { id: blog.id, user_id: blog.user_id },
                data: {
                    name: blog.name,
                    title: blog.title ? blog.title : null,
                    desc: blog.desc,
                    img: null,
                    eleId: blog.eleId ? blog.eleId : null,
                    class: blog.class ? blog.class : null,
                    inner_html: blog.inner_html ? blog.inner_html : null,
                    cssText: blog.cssText ? blog.cssText : null,
                    imgKey: blog.imgKey ? blog.imgKey : null,
                    imgBgKey: blog.imgBgKey ? blog.imgBgKey : null,
                    show: blog.show,
                    username: blog.username ? blog.username : null,
                    attr: blog.attr ? blog.attr : "circle"

                }
            });
            if (!metaBlog) { res.status(400).json({ msg: "blog not found" }) };
            res.status(200).json(metaBlog);
            await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(500).json({ msg: msg });
            await prisma.$disconnect();

        }
    }



}