import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { onChangeVerifyType, userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
const adminEmail = EMAIL ? EMAIL : EMAIL2;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, tel } = req.body as onChangeVerifyType;



    if (req.method === "POST") {
        if (!(name && email && tel)) { res.status(400).json({ msg: "unauthrized" }); return await prisma.$disconnect(); };
        const admin = await prisma.user.findUnique({
            where: { email: adminEmail }
        });
        if (!(admin)) { res.status(400).json({ Msg: " Administrator has not registered yet: no admin account" }); return await prisma.$disconnect() }
        try {
            const response = await prisma.message.create({
                data: {
                    user_id: admin.id,
                    name: name,
                    email: email,
                    rate: 0,
                    msg: "request password reset",
                    secret: true,
                    sent: false
                },
                select: {
                    name: true,
                    email: true,
                    msg: true,
                    secret: true,
                    sent: true,
                }
            });
            res.status(200).json(response);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(400).json({ message: msg });
            return await prisma.$disconnect();
        }
    } else {
        res.status(400).json({ msg: "unauthrized" })
    }

}