import { getErrorMessage } from "@/components/common/errorBoundary";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaclient";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { name } = req.query as { name: string };
        try {
            const refs = await prisma.reference.findMany({
                where: { res_name_id: name },
                select: {
                    id: true,
                    name: true,
                    user_id: true,
                    res_name_id: true
                }
            });
            if (refs && refs?.length) {

                res.status(200).json({ nameRef: refs[0], found: true });
                return await prisma.$disconnect();
            } else {
                res.status(200).json({ nameRef: null, found: false });
                return await prisma.$disconnect();
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    } else {
        res.status(404).json({ msg: "not authorized" });
        return await prisma.$disconnect();
    }
};