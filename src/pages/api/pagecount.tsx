import { getErrorMessage } from "@/lib/errorBoundaries";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { pageCountType } from "@/components/editor/Types";
import prisma from "@/prisma/prismaclient";

//--------( /API/BLOG/ID ) OR ( /API/BLOG/USER_ID )---------///
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { name, blog_id, post_id, count } = req.body as pageCountType;
        if (!req.body) return res.status(400).json({ msg: " missing req.body" })
        try {
            const pageCount = await prisma.pageCount.upsert({
                where: { name: name },
                create: {
                    name: name,
                    blog_id: blog_id ? blog_id : null,
                    post_id: post_id ? post_id : null,
                    count: count ? count : 1
                },
                update: {
                    count: count ? count : 1
                }
            });
            if (pageCount) {
                res.status(200).json(pageCount);
                return await prisma.$disconnect();
            } else {
                res.status(400).json({ msg: "page count not updated" })
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        const { name, blog_id, post_id } = req.query as { name: string, blog_id: string | undefined, post_id: string | undefined };
        const getBlog_id = blog_id && !isNaN(parseInt(blog_id)) ? parseInt(blog_id) : undefined;
        const getPost_id = post_id && !isNaN(parseInt(post_id)) ? parseInt(post_id) : undefined;
        if (!name) res.status(400).json({ msg: "query has no name" });
        try {
            const pageCount = await prisma.pageCount.findUnique({
                where: { name: name }
            });
            if (!pageCount) {
                const getPage = await prisma.pageCount.create({
                    data: {
                        name: name,
                        blog_id: getBlog_id ? getBlog_id : undefined,
                        post_id: getPost_id ? getPost_id : undefined,
                        count: 1
                    }
                });
                if (!getPage) { res.status(400).json({ msg: " not created" }) }
                else { res.status(200).json(getPage) };
            } else {
                const getPage = await prisma.pageCount.update({
                    where: { id: pageCount.id },
                    data: {
                        count: pageCount.count + 1,
                    }
                });
                if (getPage) { res.status(200).json(getPage) }
                else { res.status(400).json({ msg: " not updated" }) }
            };

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === "DELETE") {
        const { id } = req.query as { id: string };
        if (!id) { res.status(400).json({ msg: "no ID,,try again" }); return await prisma.$disconnect() };
        try {
            const pg = await prisma.pageCount.delete({ where: { id: parseInt(id) } });
            if (!pg) { res.status(400).json({ msg: "could not find" }); return await prisma.$disconnect() };
            res.status(200).json({ id: pg.id });
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(500).json({ msg: "something went wrong" });
            return await prisma.$disconnect();
        }
    }
}