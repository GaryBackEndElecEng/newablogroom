
import { NextApiRequest, NextApiResponse } from "next";
import { blogType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        // console.log("BLOG:=>>>", getBlog)

        const { show, id } = getBlog;
        const show_ = Boolean(show)
        if (id) {
            try {
                const blog = await prisma.blog.update({
                    where: { id: getBlog.id },
                    data: {
                        show: !show_,
                    },

                });
                if (blog) {
                    res.status(200).json(blog);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ message: "no body provided" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                res.status(400).json({ message: msg })
                return await prisma.$disconnect();
            };
        } else {
            res.status(400).json({ message: "no ID" });
            return await prisma.$disconnect();
        }
    }
}