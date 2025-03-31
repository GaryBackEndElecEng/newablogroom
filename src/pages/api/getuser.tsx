import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getUserImage } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { email } = req.query as { email: string };
        if (email) {

            try {
                const user = await prisma.user.findUnique({
                    where: { email: email },
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

                }) as unknown as userType;
                if (!user) { res.status(400).json({ msg: ` no users` }); return await prisma.$disconnect(); };
                if (user.email === EMAIL || user.email === EMAIL2) {
                    user.admin = true;
                };
                const getUser = await getUserImage(user as unknown as userType)
                res.status(301).json(getUser);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(500).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else {
            res.status(404).json({ msg: "unauthorized" });
            return await prisma.$disconnect();
        }

    }



}