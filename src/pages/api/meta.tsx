

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
    } else if (req.method === "PUT") {
        const rand = Math.floor(Math.random() * 10000);
        const blog = req.body as blogType;
        const { id, name, user_id } = blog;
        const newName = name || `newblog${rand}`;
        if (!(name && user_id)) { res.status(400).json({ error: `no blog recieved:${req.body}` }); return await prisma.$disconnect(); };
        try {

            const getBlog = await prisma.blog.findUnique({
                where: { id, user_id, name }
            });
            if (getBlog) {

                const metaBlog = await prisma.blog.update({
                    where: { id, user_id, name },
                    data: {
                        title: blog.title || null,
                        desc: blog.desc,
                        eleId: blog.eleId || null,
                        class: blog.class || null,
                        inner_html: blog.inner_html || null,
                        cssText: blog.cssText || null,
                        imgKey: blog.imgKey || null,
                        imgBgKey: blog.imgBgKey || null,
                        show: blog.show,
                        username: blog.username || null,
                        attr: blog.attr ? blog.attr : "circle"

                    }
                });
                if (!metaBlog) { res.status(400).json({ msg: "blog not found" }); await prisma.$disconnect() };
                res.status(200).json(metaBlog);
                await prisma.$disconnect();
            } else {
                const metaBlog = await prisma.blog.create({
                    data: {
                        name: newName,
                        user_id: blog.user_id,
                        title: blog.title || "title",
                        desc: blog.desc || "description",
                        eleId: blog.eleId || null,
                        class: blog.class || null,
                        inner_html: blog.inner_html || null,
                        cssText: blog.cssText || null,
                        imgKey: blog.imgKey || null,
                        imgBgKey: blog.imgBgKey || null,
                        show: blog.show,
                        username: blog.username || null,
                        attr: blog.attr ? blog.attr : "circle",
                        rating: blog.rating || 1,

                    }
                });
                if (!metaBlog) { res.status(400).json({ msg: "blog not found" }); await prisma.$disconnect() };
                res.status(200).json(metaBlog);
                await prisma.$disconnect();
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(500).json({ msg: msg });
            await prisma.$disconnect();

        }
    } else {
        res.status(400).json({ msg: "nothing recieved" })
    }



}