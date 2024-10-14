import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getUserImage } from "@/lib/awsFunctions";
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const user_id = req.query.user_id;
        if (!user_id) { res.status(400).json({ msg: ` no user:${user_id}` }); return await prisma.$disconnect() };

        try {
            const user = await prisma.user.findUnique({
                where: { id: user_id as string },
                select: {
                    id: true,
                    email: true,
                    password: false,
                    imgKey: true,
                    bio: true,
                    showinfo: true,
                    name: true,
                    admin: true
                }

            });
            if (!user) { res.status(400).json({ msg: ` no user:${user_id}` }); return await prisma.$disconnect(); }
            let userWithImage = await getUserImage(user as unknown as userType);
            if (user.email === EMAIL || user.email === EMAIL2) {
                userWithImage = { ...userWithImage, admin: true };
            }
            res.status(301).json(userWithImage);
            return await prisma.$disconnect();

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg)
            res.status(400).json({ message: msg })
        } finally {
            await prisma.$disconnect()
        }

    }



}