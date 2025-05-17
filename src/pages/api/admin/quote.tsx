import { NextApiRequest, NextApiResponse } from "next";
import { quoteCalcItemType, quoteType, userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { calculateQuote } from "@/lib/ultils/quoteFunctions";

const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
///---NOT USING THIS=> PULLING USER FROM PAGE LOAD: PAGES=>INDEX, BUT WORKS---////

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body as { userId: string, email: string, quotes: quoteCalcItemType[] }
        const { userId, email, quotes } = body;
        const emailCheck = !!(email === EMAIL || email === EMAIL2);


        if (!(userId?.length && userId !== undefined) || !emailCheck) {
            res.status(400).json({ msg: `unauthorized:${userId},${email}` });
            return await prisma.$disconnect();
        };
        const admin = await prisma.user.findUnique({
            where: { id: body.userId }
        });
        if (!(admin && admin.email === email)) {
            res.status(400).json({ msg: "unauthorized" });
            return await prisma.$disconnect();
        }
        try {
            const retQuotes = await storeQuotes({ quotes });
            if (retQuotes) {
                res.status(200).json(retQuotes);
                return await prisma.$disconnect();
            }
            res.status(400).json({ msg: "did not store" });
            return await prisma.$disconnect();

        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(500).json({ msg: msg })
            return await prisma.$disconnect();
        };

    } else if (req.method === "GET") {
        const { userId, email } = req.query as { userId: string, email: string };
        if (!(userId)) {
            res.status(400).json({ msg: "unauthorized" });
            return await prisma.$disconnect();
        };
        const admin = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!(admin && admin.email === email)) {
            res.status(400).json({ msg: "unauthorized" });
            return await prisma.$disconnect();
        }
        const retQuotes = await prisma.quote.findMany();
        await prisma.$disconnect();

        res.status(200).json(retQuotes);
    }
    res.status(400).json({ message: "Bad request" });
    return await prisma.$disconnect();
}
export default handler;


export async function storeQuotes({ quotes }: { quotes: quoteCalcItemType[] }): Promise<quoteCalcItemType[] | null> {
    if (!quotes?.length) return null
    try {
        const retQuotes = await Promise.all(quotes.map(async (quote) => {
            if (quote) {
                const { name, desc, time, qty, dollar } = quote;
                const retQuote = await prisma.quote.update({
                    where: { name },
                    data: {
                        desc,
                        time,
                        qty,
                        dollar
                    }
                });
                return retQuote;
            }
        }));
        await prisma.$disconnect();
        return retQuotes as quoteCalcItemType[]
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        return null;
    }
};