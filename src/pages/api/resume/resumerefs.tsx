import { getErrorMessage } from "@/components/common/errorBoundary";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prismaclient";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string };
        try {
            const references = await prisma.reference.findMany({
                where: { user_id },
                select: {
                    id: true,
                    name: true,
                    res_name_id: true
                }
            });
            if (references) {
                res.status(200).json(references);
                return await prisma.$disconnect();
            } else {
                res.status(400).json({ msg: "could not get" });
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