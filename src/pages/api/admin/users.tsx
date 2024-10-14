import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getUserImage } from "@/lib/awsFunctions";
// import { hashComp } from "@/lib/ultils/bcrypt";

const prisma = new PrismaClient();
const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
// const PASSWORD = process.env.PASSWORD as string;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        const { email, id } = req.query as unknown as userType;
        if (email) {

            try {
                const user = await prisma.user.findUnique({
                    where: { id },
                });
                if (user && (user.email === EMAIL || user.email === EMAIL2)) {

                    const users = await prisma.user.findMany({
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            image: true,
                            imgKey: true,
                            bio: true,
                            showinfo: true,
                            blogs: true,
                            accounts: true,
                            sessions: true
                        }
                    });
                    if (users) {
                        const imgUsers = await Promise.all(users.map(async (user) => {
                            return await getUserImage(user as unknown as userType) as unknown as userType;
                        }));

                        res.status(200).json({ users: imgUsers });
                    } else {
                        res.status(400).json({ msg: "no users" })
                    }

                } else {
                    res.status(400).json({ msg: `unauthorized` });
                    return await prisma.$disconnect();
                }

            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `unauthorized` });
            return await prisma.$disconnect();
        }
    }
    if (req.method === "DELETE") {
        const { adminemail, adminId, delete_id } = req.query as unknown as { adminemail: string, adminId: string, delete_id: string };
        if (adminemail) {

            try {
                const adminUser = await prisma.user.findUnique({
                    where: { id: adminId },
                });
                if (!adminUser) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect() }
                if (!(adminUser.email === EMAIL || adminUser.email === EMAIL2)) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect(); }
                //safe
                // console.log("user.id", delete_id)
                const user = await prisma.user.delete({
                    where: {
                        id: delete_id as string,
                    }
                });
                // console.log("user", user)
                if (user) {
                    if (user.imgKey) {
                        await prisma.deletedImg.update({
                            where: { imgKey: user.imgKey },
                            data: {
                                del: true
                            }
                        });
                    }

                    res.status(200).json({ id: user.id });
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ msg: "no users" });
                    return await prisma.$disconnect();
                }



            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                return await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: `unauthorized` });
            return await prisma.$disconnect();
        }
    }



}