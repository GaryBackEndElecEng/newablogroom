import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body as userType;
    const { msg_id } = req.query as { msg_id: string };



    if (req.method === "POST") {
        if (!id) { return res.status(400).json({ msg: "unauthrized: no id" }) };
        const user = await prisma.user.findUnique({
            where: { id: id as string }
        });
        if (!(user && (user.email === EMAIL || user.email === EMAIL2))) { res.status(400).json({ Msg: " not authorized: not admin" }); return await prisma.$disconnect() }
        if (id) {

            try {
                const usersMsgs = await prisma.message.findMany({
                    select: {
                        id: true,
                        user_id: true,
                        name: true,
                        email: true,
                        msg: true,
                        rate: true,
                        blog_id: true,
                        secret: true,
                        sent: true,
                    }
                });
                res.status(200).json(usersMsgs);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            }
        }

    }
    else if (req.method === "DELETE") {
        //delete message
        if (!msg_id) { res.status(400).json({ Msg: " no msg id" }); return await prisma.$disconnect() };
        try {
            const delMsg = await prisma.message.delete({
                where: { id: parseInt(msg_id) }
            });
            if (!delMsg) { res.status(302).json({ id: null }); return await prisma.$disconnect(); }
            res.status(200).json({ id: delMsg.id });
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect()
        }

    }

    await prisma.$disconnect();
}