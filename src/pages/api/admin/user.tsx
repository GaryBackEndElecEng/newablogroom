import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { genHash } from "@/lib/ultils/bcrypt";
import { getUserImage, } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";


const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;
// const PASSWORD = process.env.PASSWORD as string;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user_, adminEmail, adminId } = req.body as { user_: userType, adminEmail: string, adminId: string };
    const { email, password, name, image, imgKey, bio, id, showinfo, username } = user_;

    let admin = false;
    if ((adminEmail === EMAIL) || (adminEmail === EMAIL2)) {
        admin = true;
    }
    if (!admin) { res.status(400).json({ msg: "unauthorized: only admin are allowed" }); return await prisma.$disconnect() };
    //ONLY ADMIN ARE ALLOWED HERE
    const adminUser = await prisma.user.findUnique({
        where: { email: adminEmail, id: adminId }
    });
    if (!adminUser) { res.status(302).json({ msg: "unauthorized" }); return await prisma.$disconnect() };

    if (req.method === "POST") {
        const passwordHash = password ? await genHash(password) : null;
        if (!email) { res.status(302).json({ msg: "Not authorized" }); return await prisma.$disconnect(); }
        try {
            if (!passwordHash) { res.status(302).json({ msg: "no password" }); return await prisma.$disconnect() };
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: passwordHash,
                    name: "assigned User",
                    image: null,
                    imgKey: null,
                    bio: null,
                    showinfo: false,
                    admin: false,
                    username: null
                },
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
            if (!newUser) { res.status(306).json({ msg: "issue with  new user" }); return await prisma.$disconnect() };
            res.status(200).json(newUser);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        } finally {
            return await prisma.$disconnect();
        }
    }
    if (req.method === "PUT" && admin) {
        if (!(id)) { res.status(400).json({ msg: " no user id" }); return await prisma.$disconnect() };
        try {
            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    name: name ? name : null,
                    image: image ? image : null,
                    imgKey: imgKey ? imgKey : null,
                    bio: bio ? bio : null,
                    showinfo: showinfo,
                    username: username ? username : null
                },
                select: {
                    name: true,
                    email: true,
                    image: true,
                    imgKey: true,
                    bio: true,
                    showinfo: true,
                    admin: true,
                    accounts: true,
                    username: true
                }
            });
            if (!user) { res.status(400).json({ msg: " issue: user was not defined" }); return await prisma.$disconnect() };
            res.status(200).json(user);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect()
        } finally {
            return await prisma.$disconnect();
        }
    }
    if (req.method === "DELETE") {

        if (!(id && email)) { res.status(400).json({ msg: " unauthorized to delete" }); return await prisma.$disconnect() };
        try {
            const user = await prisma.user.delete({
                where: { id: id, email: email },
            });
            if (!user) { res.status(400).json({ msg: " issue: user was not deleted. please call us" }); return await prisma.$disconnect() };
            res.status(200).json({ id: id });
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect()
        } finally {
            return await prisma.$disconnect();
        }
    }
    if (req.method === "GET") {
        if (!(id)) { res.status(400).json({ msg: " unauthorized" }); return await prisma.$disconnect() };
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
                select: {
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
            if (!user) { res.status(400).json({ msg: " issue: user was not defined" }); return await prisma.$disconnect() };
            const userWithImg = await getUserImage(user as unknown as userType);
            res.status(200).json(userWithImg);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(400).json(msg);
            return await prisma.$disconnect()
        } finally {
            return await prisma.$disconnect();
        }
    }
}