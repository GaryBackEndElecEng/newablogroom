import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { blogType } from "@/components/editor/Types";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const userQuery = req.query as { user_id: string };
        const { user_id } = userQuery;

        if (user_id) {

            try {
                const blogs = await prisma.blog.findMany({
                    where: { user_id: user_id as string },


                });
                if (blogs) {
                    res.status(200).json(blogs as unknown[] as blogType[]);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: ` no blogs found-something went wrong` });
                    return await prisma.$disconnect();
                }

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else {
            res.status(400).json({ msg: `unauthorized-no ID` });
            return await prisma.$disconnect();
        }
    }



}