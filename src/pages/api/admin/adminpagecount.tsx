import { getErrorMessage } from "@/lib/errorBoundaries";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { pageCountType } from "@/components/editor/Types";

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

const prisma = new PrismaClient();
//--------( /API/BLOG/ID ) OR ( /API/BLOG/USER_ID )---------///
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string };

        if (!user_id) res.status(400).json({ msg: "query has no user id" });
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });
        if (!user) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect() };
        if (!(user && (user.email === EMAIL || user.email === EMAIL2))) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect() };
        //SAFE

        try {
            const pageCounts = await prisma.pageCount.findMany();
            res.status(200).json(pageCounts as unknown as pageCountType[]);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
        } finally {
            await prisma.$disconnect();
        }
    }
}