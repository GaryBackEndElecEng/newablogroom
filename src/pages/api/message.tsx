
import { NextApiRequest, NextApiResponse } from "next";
import { messageType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //  THIS SAVES MESSAGES AND , IF BLOG_ID && RATE UPDATES BLOG RATE
    const msg_ = req.body;
    const user_id = req.query.user_id;
    const blog_id = req.query.blog_id;
    const msg_id = req.query.msg_id;
    if (req.method === "POST" && req.body) {
        const { user_id, name, email, msg, rate, blog_id, secret } = msg_ as messageType;

        try {
            if (blog_id) {
                const message_ = await prisma.message.create({
                    data: {
                        user_id: user_id ? user_id as string : null,
                        name: name,
                        email: email,
                        msg: msg,
                        rate: rate || 1,
                        blog_id: blog_id,
                        secret: secret,
                        sent: false
                    }
                });
                if (rate && rate > 1) {
                    await saveAvgRating({ blog_id, rate });//UPDATING BLOG RATES
                }
                res.status(200).json(message_);
                return await prisma.$disconnect();
            } else {
                const message_ = await prisma.message.create({
                    data: {
                        user_id: user_id ? user_id as string : null,
                        name: name,
                        email: email,
                        msg: msg,
                        rate: rate || 1,
                        blog_id: null,
                        secret: secret,
                        sent: false
                    }
                });
                res.status(200).json(message_);
                return await prisma.$disconnect();
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg);
            res.status(400).json({ message: msg });
            return await prisma.$disconnect();
        }

    } else if (req.method === "GET") {

        if (user_id) {
            try {
                const usersMsgs = await prisma.message.findMany({
                    where: { user_id: user_id as string },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        msg: true,
                        rate: true,
                        blog_id: true,
                        secret: true,
                        sent: true
                    }
                });
                res.status(200).json(usersMsgs);
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            }
        }
        if (blog_id) {
            const id = parseInt(blog_id as string)
            try {
                const blogMsgs = await prisma.message.findMany({
                    where: { blog_id: id as number },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        msg: true,
                        rate: true,
                        secret: true,
                        blog_id: true,
                        sent: true
                    }
                });
                const showMsgs = blogMsgs.filter(blog => (!blog.secret));//returning only messages with secret===false
                res.status(200).json(showMsgs);
                // console.log("blogMsgs", blogMsgs, "blog_id", blog_id, "type", typeof (blog_id))
                return await prisma.$disconnect();
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            }
        }
    } else if (req.method === "DELETE") {
        if (!msg_id) { res.status(400).json({ msg: "no msg.id" }); return await prisma.$disconnect() }
        try {
            const delMsg = await prisma.message.delete({
                where: { id: parseInt(msg_id as string) }
            });
            if (!delMsg) { res.status(400).json({ msg: "not deleted" }); return await prisma.$disconnect() };
            res.status(200).json({ id: delMsg.id });
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
            return await prisma.$disconnect();
        }

    } else {
        res.status(400).json({ msg: "not authorized" });
    }
    await prisma.$disconnect();
};



export async function saveAvgRating(input: { blog_id: number, rate: number }): Promise<boolean> {
    const { blog_id, rate } = input;
    if (!blog_id || !rate) return false;
    try {
        const getBlog = await prisma.blog.findUnique({
            where: { id: blog_id }
        });
        if (getBlog) {
            const { avgRate } = await getMessagesLen(blog_id);
            //SAVING BLOG
            const saveBlog = await prisma.blog.update({
                where: { id: getBlog.id },
                data: {
                    rating: avgRate
                }
            });
            if (saveBlog) {
                await prisma.$disconnect();
                return true;
            }

        }
        await prisma.$disconnect();
        return false;
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg);
        await prisma.$disconnect();
        return false;
    }
}

export async function getMessagesLen(blog_id: number): Promise<{ avgRate: number, len: number }> {
    try {
        const messages = await prisma.message.findMany({
            where: { blog_id: blog_id },
            select: { rate: true }
        })

        await prisma.$disconnect();
        const rates: number[] = messages.map(mess => (mess.rate));
        return calcAvg(rates)
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg);
        await prisma.$disconnect();
        return { avgRate: 1, len: 1 }
    }
};


export function calcAvg(rates: number[]): { avgRate: number, len: number } {
    if (!(rates && rates.length > 0)) return { avgRate: 1, len: 1 };
    const sum: number = rates.reduce((a, b) => (a + b), 0);
    const len: number = rates.length;
    return {
        avgRate: Math.round(sum / len),
        len: len
    }
}