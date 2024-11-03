import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //  THIS SAVES MESSAGES AND , IF BLOG_ID && RATE UPDATES BLOG RATE
    if (req.method === "GET") {
        const { rating, secret } = req.query as { rating: string | null, secret: string | null };
        // console.log("RATING,SECRET", rating, typeof (rating), secret, typeof (secret))
        if (rating && secret === "null") {
            try {
                const allmsgs = await prisma.message.findMany({
                    where: {
                        secret: false,
                    }
                });
                if (!allmsgs) { res.status(400).json({ msg: "could not get" }) };
                const nonSecMsgs = allmsgs.filter(msg => (msg.blog_id !== null)).filter(msg => (msg.rate >= parseInt(rating)));
                res.status(200).json(nonSecMsgs)
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(500).json({ msg: "server error" });
            } finally {
                return await prisma.$disconnect();
            }
        } else if (secret && rating === "null") {
            try {
                const secmsgs = await prisma.message.findMany({
                    where: {
                        secret: true
                    }
                });
                if (!secmsgs) { res.status(400).json({ msg: "could not get" }) };

                res.status(200).json(secmsgs)
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log(msg);
                res.status(500).json({ msg: "server error" });
            } finally {
                return await prisma.$disconnect();
            }
        } else {
            res.status(400).json({ msg: "unauthorized,,missing parameters" });
            return await prisma.$disconnect();
        }
    } else {
        return await prisma.$disconnect()
    }
}