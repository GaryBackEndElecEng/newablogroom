import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


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
                res.status(200).json({ email: null, name: null });
                return await prisma.$disconnect();
            }

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }
    }
}