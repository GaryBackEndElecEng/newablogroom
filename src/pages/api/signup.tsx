import { transporter, mailOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { signupQuoteType, signupType, userType } from "@/components/editor/Types";
import { QuoteHTML, QuoteText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";

const EMAIL = process.env.EMAIL as string
const message = { msg: "thank you for requesting a quote from us. if you have any Questions. please do not hesitate-Call Us!. Your QUOTE has a 60-MINUTE activation time.To see your quote, please signin. The quote will be in your dashboard called profile folder." }

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, name, imgKey } = req.body as signupQuoteType;

        try {
            if (email && name) {

                const newSignup = await prisma.signup.create({
                    data: {
                        email: email,
                        name: name
                    }
                }) as signupType;
                if (newSignup) {
                    const Key = imgKey || `quote/nouserid-${name}-quote.png`;
                    const quoteImg = `https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/${Key}`;
                    let user = {} as userType;
                    user = { ...user, name: name, email: email, id: "" }
                    await transporter.sendMail({
                        ...mailOptions(user.email as string),
                        subject: `Thank you ${user.name} for the Quote request!`,
                        text: QuoteText({ user, message, quoteImg: quoteImg, EMAIL }),
                        html: QuoteHTML({ user, message, quoteImg, EMAIL })
                    });
                    res.status(200).json({ msg: "sent" });
                    return await prisma.$disconnect();

                } else {
                    res.status(308).json({ msg: "missing data: process was not complete:sign-up-user was not created" })
                }
            } else {
                res.status(302).json({ message: `I think you forgot something: key && id` });
                return await prisma.$disconnect();
            }

        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(400).json({ msg: msg })
            return await prisma.$disconnect();
        };
    } else {
        res.status(400).json({ msg: " not authorized" });
        return await prisma.$disconnect();
    }
}
export default handler;