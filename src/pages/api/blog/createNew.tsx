
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        const { name, user_id } = getBlog;
        const check = !!(typeof (name) === "string" && user_id);
        if (check) {

            try {
                const newBlog = await verifyAndCreate({ blog: getBlog });
                if (newBlog) {
                    res.status(200).json(newBlog);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: "new blog was not created" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            };


        } else {
            res.status(400).json({ err: "no user_id or name: blog creation was not created" })
            return await prisma.$disconnect();
        }
    }
};

async function verifyAndCreate({ blog }: { blog: blogType }): Promise<blogType | null> {
    if (!blog) return null;
    const { name, user_id, title, desc, attr, show, rating, username, eleId, cssText, class: _class } = blog;
    try {
        const _blog = await prisma.blog.findMany({
            where: { name: name as string, user_id },
        });
        if (!(_blog && _blog[0])) {
            const createNew = await prisma.blog.create({
                data: {
                    name: name as string,
                    user_id,
                    title: title || "title",
                    desc: desc || "description",
                    attr: attr || "square",
                    show: show || false,
                    rating: rating || 0,
                    username: username,
                    eleId: eleId,
                    cssText: cssText,
                    class: _class
                }
            });
            if (createNew) {
                return createNew as unknown as blogType;
            };
        } else {
            return blog as unknown as blogType;
        }
        return null;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        return null
    }


    return null;
}

