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

                });
                if (!users) { res.status(400).json({ msg: ` no users` }); return await prisma.$disconnect(); };
                let users_ = users as unknown as userType[];
                users_ = await Promise.all(
                    users.map(async (user) => {
                        let _user: userType = user as unknown as userType;
                        if (user && user.imgKey && user.name) {
                            _user = await getUserImage(user as unknown as userType) as unknown as userType
                        }
                        return _user
                    })
                )
                res.status(301).json(users_);

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
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
                } else {
                    res.status(400).json({ msg: "no user found" });
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
            } finally {
                await prisma.$disconnect();
            }
        }

    }



}