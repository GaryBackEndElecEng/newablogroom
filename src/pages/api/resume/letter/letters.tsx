import { getErrorMessage } from "@/components/common/errorBoundary";
import { nameLetterType } from "@/components/bio/resume/refTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string }
        try {

            const getLetters = await prisma.letter.findMany({
                where: { user_id },
                select: {
                    id: true,
                    name: true,
                    res_name_id: true
                }
            }) as nameLetterType[];
            if (getLetters) {
                res.status(200).json(getLetters);
                return await prisma.$disconnect();
            } else {
                res.status(400).json({ msg: `could not get letters` });
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
    };
};