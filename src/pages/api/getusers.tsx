
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getUserImage } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { user_id } = req.query as { user_id: string };
        if (!user_id) {

            try {
                const users = await prisma.user.findMany({
                    where: { showinfo: true },
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

                }) as unknown[] as userType[];
                if (!users) { res.status(400).json({ msg: ` no users` }); return await prisma.$disconnect(); };

                const users_ = await Promise.all(
                    users.map(async (user) => {
                        if (user?.imgKey && user?.name) {
                            user = await getUserImage(user as unknown as userType)
                        }
                        return user
                    }) as unknown[] as userType[]
                )
                res.status(301).json(users_);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else {
            try {
                const user = await prisma.user.findUnique({
                    where: { id: user_id, showinfo: true },
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
                if (user) {
                    const user_ = await getUserImage(user as unknown as userType) as unknown as userType;
                    res.status(200).json(user_);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: "no user found" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                return await prisma.$disconnect();
            };
        }

    }



}