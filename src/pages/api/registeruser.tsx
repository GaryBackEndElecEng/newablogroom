
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { genHash } from "@/lib/ultils/bcrypt";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const user = req.body as userType;
    const { user_id } = req.query as { user_id: string };
    const { email, password, name, image, imgKey, bio, id, showinfo, username } = user;



    if (req.method === "POST") {
        const passwordHash = password ? await genHash(password) : null;
        if (!email) { res.status(302).json({ msg: "Not authorized-email" }); return await prisma.$disconnect(); }
        try {
            if (!passwordHash) { res.status(302).json({ msg: "no password" }); return await prisma.$disconnect() };
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: passwordHash,
                    name: name,
                    image: image,
                    imgKey: imgKey,
                    bio: bio,
                    showinfo: showinfo,
                    admin: false,
                    username: username
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
        };

    } else if (req.method === "PUT") {
        if (!(id)) { res.status(400).json({ msg: " no user id" }); return await prisma.$disconnect() };
        try {
            const user = await prisma.user.update({
                where: { id: id },
                data: {
                    name: name || null,
                    image: image || null,
                    imgKey: imgKey || null,
                    bio: bio || null,
                    showinfo: showinfo,
                    username: username || null,
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
        };

    } else if (req.method === "GET" && user_id) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: user_id }
            });
            if (user) {
                res.status(302).json(user);
                return await prisma.$disconnect();
            } else {
                res.status(308).json({ msg: "no user found" });
                return await prisma.$disconnect();
            };
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(500).json({ msg: msg });
            return await prisma.$disconnect();
        }
    } else {
        res.status(404).json({ msg: "Bad request" });
        return await prisma.$disconnect();
    }


}