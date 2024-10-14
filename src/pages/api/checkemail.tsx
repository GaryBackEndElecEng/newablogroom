import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
// const EMAIL = process.env.EMAIL as string;
// const EMAIL2 = process.env.EMAIL2 as string;
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const { email } = req.body as userType;
        if (!(email as string)) { res.status(400).json({ msg: ` no email:${email} recieved` }); return await prisma.$disconnect() };
        try {
            const checkUser = await prisma.user.findUnique({
                where: { email: email as string },
                select: {
                    email: true,
                    name: true,
                }
            });
            if (checkUser) {
                res.status(200).json(checkUser);
                return await prisma.$disconnect();
            } else {
                res.status(200).json(null);
                return await prisma.$disconnect();
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    }
}