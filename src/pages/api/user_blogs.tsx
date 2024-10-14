import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";


const prisma = new PrismaClient();
// const EMAIL = process.env.EMAIL as string;
// const PASSWORD = process.env.PASSWORD as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userQuery = req.query as { user_id: string };
    // const {  password, } = user_ as userType;

    if (req.method === "GET") {
        const { user_id } = userQuery;

        if (user_id) {

            try {
                const user = await prisma.user.findUnique({
                    where: { id: user_id as string },
                    select: {
                        id: true,
                        blogs: true,
                        email: true,
                        password: false,
                        imgKey: true,
                        image: true,
                        bio: true,
                        showinfo: true,
                        admin: true
                    }

                });
                if (user) {

                    res.status(301).json(user);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: ` no user:${user_id}` });
                    return await prisma.$disconnect();
                }

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `unauthorized-no user found;${user_id}` });
            return await prisma.$disconnect();
        }
    }



}