
import { NextApiRequest, NextApiResponse } from "next";
import { quoteCalcItemType, quoteType, userType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { calculateQuote } from "@/lib/ultils/quoteFunctions";

///---NOT USING THIS=> PULLING USER FROM PAGE LOAD: PAGES=>INDEX, BUT WORKS---////

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user_id, nameValue } = req.body as quoteType;
        if (nameValue.length <= 0) {
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
                    const list = await prisma.quote.findMany() as unknown as quoteCalcItemType[];
                    const resultsForMailing = calculateQuote({ nameValue, list, user });
                    return res.status(200).json(resultsForMailing);
                } else {
                    res.status(308).json({ msg: "more info is required,no user" });
                    return await prisma.$disconnect();
                }
            } else {
                res.status(400).json({ msg: "unauthorized" });
            }


        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(500).json({ msg: msg })
            return await prisma.$disconnect();
        };
    }
    res.status(400).json({ message: "Bad request" });
    return await prisma.$disconnect();
}
export default handler;




