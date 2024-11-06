
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getUserImage } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";


export type passwordType = { passNew: string, passOld: string } | null;
export type emailType = { emailNew: string, emailOld: string } | null;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        //{user,passwords,emails:null}<= recieved
        const reciever = req.body as userType;
        const { email } = reciever as userType

        if (email) {
            try {
                const getUser = await prisma.user.findUnique({
                    where: { email: email },
                    select: {
                        password: false,
                        email: true,
                        bio: true,
                        imgKey: true,
                        id: true,
                        showinfo: true,
                        name: true,
                        username: true,
                    }
                });
                if (getUser) {
                    res.status(200).json(getUser);
                } else {
                    res.status(400).json({ msg: "unauthorized user" });
                    console.error("unmatched password")
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(400).json({ msg });
            } finally {
                await prisma.$disconnect();
            }
        } else {
            res.status(400).json({ msg: "unauthorized" });
        }


    }
    if (req.method === "GET") {
        const email = req.query.email as string;
        if (!email) return res.status(400).json({ msg: "unauthorized" });
        try {
            const user = await prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    image: true,
                    imgKey: true,
                    bio: true,
                    showinfo: true,
                    admin: true,
                    username: true
                }
            });
            if (user) {
                const userImage = await getUserImage(user as unknown as userType)
                res.status(200).json(userImage)
            } else {
                res.status(400).json({ msg: "unauthorized user" });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(400).json({ msg });
        } finally {
            return await prisma.$disconnect();
        }
    }



}