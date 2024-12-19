import { transporter, sendOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { quoteCalcItemType, quoteType, returnCalcType, returnQuoteFinalType, sendEmailMsgType, subQuoteTypeType, userType } from "@/components/editor/Types";
import { clientMsgHTML, clientMsgText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { calculateQuote } from "@/lib/ultils/quoteFunctions";

///---NOT USING THIS=> PULLING USER FROM PAGE LOAD: PAGES=>INDEX, BUT WORKS---////

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user_id, nameValue } = req.body as quoteType;
        let isUser: userType | null = null;
        if (!(nameValue.length > 0)) {
            res.status(302).json({ message: "NO LIST" });
            return await prisma.$disconnect();
        }
        try {
            if (user_id && typeof user_id === "string") {

                const user = await prisma.user.findUnique({
                    where: {
                        id: user_id as string
                    }
                }) as userType | null;
                if (user) {
                    isUser = user;
                }
            }
            const list = await prisma.quote.findMany() as unknown as quoteCalcItemType[];
            const resultsForMailing = calculateQuote({ nameValue, list, user: isUser });
            return res.status(200).json(resultsForMailing);

        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(400).json({ msg: msg })
            return await prisma.$disconnect();
        } finally {
            await prisma.$disconnect();
        }
    }
    res.status(400).json({ message: "Bad request" });
    return await prisma.$disconnect();
}
export default handler;




