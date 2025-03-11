
import { NextApiRequest, NextApiResponse } from "next";
import { userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { genHash, hashComp } from "@/lib/ultils/bcrypt";
import { getUserImage } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";


export type passwordType = { passNew: string, passOld: string } | null;
export type emailType = { emailNew: string, emailOld: string } | null;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        //{user,passwords,emails:null}<= recieved
        const reciever = req.body;
        const { user, passwords, emails } = reciever as { user: userType, passwords: passwordType, emails: emailType }
        const { email, image, name, imgKey, bio, id, showinfo, username } = user as userType;
        const passNew: string | null = passwords ? passwords.passNew as string : null;
        const passOld: string | null = passwords ? passwords.passOld as string : null;
        const emailNew: string | null = emails ? emails.emailNew as string : null;
        const emailOld: string | null = emails ? emails.emailOld as string : null;
        // console.log("user", user, "passwords", passwords, "emails", emails)//works
        if (passwords) {
            try {
                const getUser = await prisma.user.findUnique({
                    where: { id: id, email: email }
                });
                if (getUser) {
                    const passCheck = await hashComp(passOld, getUser.password as string);
                    if (passCheck) {
                        const new_pass = await genHash(passNew as string)
                        const user = await prisma.user.update({
                            where: { email: email, password: getUser.password },
                            data: {
                                password: new_pass || getUser.password,
                            },
                            select: {
                                password: false,
                                email: true,
                                bio: true,
                                imgKey: true,
                                id: true
                            }
                        });
                        const userWithImg = await getUserImage(user as unknown as userType);
                        res.status(200).json(userWithImg);
                        return await prisma.$disconnect();
                    } else {
                        res.status(308).json({ message: "no user" });
                        console.error("no user")
                        return await prisma.$disconnect();
                    }
                } else {
                    res.status(309).json({ message: "unmatched password" });
                    console.error("unmatched password");
                    return await prisma.$disconnect();
                };

            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(500).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else if (emails) {
            try {
                const getUser = await prisma.user.findUnique({
                    where: { email: email, id: id }
                });
                if (getUser && getUser.email === emailOld) {
                    const user = await prisma.user.update({
                        where: { id: id, email: getUser.email },
                        data: {
                            email: emailNew || getUser.email,
                        },
                        select: {
                            password: false,
                            email: true,
                            bio: true,
                            imgKey: true,
                            id: true
                        }
                    });
                    const userWithImg = await getUserImage(user as unknown as userType);
                    res.status(200).json(userWithImg);
                    return await prisma.$disconnect();
                } else {
                    res.status(309).json({ msg: "forgotten email,,not changed" });
                    return await prisma.$disconnect();
                };
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(500).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else if (!passwords && !emails) {
            try {
                const user = await prisma.user.update({
                    where: { id: id },
                    data: {
                        name: name,
                        bio: bio,
                        imgKey: imgKey,
                        showinfo: showinfo,
                        image: image,
                        username: username || null
                    },
                    select: {
                        password: false,
                        email: true,
                        bio: true,
                        imgKey: true,
                        image: true,
                        id: true,
                        showinfo: true,
                        name: true,
                        username: true,
                        blogs: true
                    }
                });
                if (user) {
                    await Promise.all(user?.blogs.map(async (blog) => {

                        await prisma.blog.update({
                            where: { id: blog.id },
                            data: {
                                username: username || null
                            }
                        });

                    }));
                    res.status(200).json(user);
                    return await prisma.$disconnect();
                } else {
                    res.status(309).json({ msg: "no user" });
                    return await prisma.$disconnect();
                };

            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);
                res.status(500).json({ message: msg });
                return await prisma.$disconnect();
            };
        };


    } else if (req.method === "GET") {
        const email = req.query.email as string;
        if (!email) {
            res.status(309).json({ msg: "missing email" });
            return await prisma.$disconnect();
        };
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
                res.status(200).json(userImage);
                return await prisma.$disconnect();
            } else {
                res.status(307).json({ msg: "user could not be found" });
                return await prisma.$disconnect();
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            res.status(400).json({ msg });
            return await prisma.$disconnect();
        }
    } else {
        res.status(400).json({ msg: "not authorized" });
        return await prisma.$disconnect();
    };



}

