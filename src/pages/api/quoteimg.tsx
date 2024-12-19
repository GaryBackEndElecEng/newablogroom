import { transporter, sendOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { quoteImgKeyType, quoteimgType, userType } from "@/components/editor/Types";
import { QuoteHTML, QuoteText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { awsImage } from "@/lib/awsFunctions";

const EMAIL = process.env.EMAIL as string
const message = { msg: "thank you for requesting a quote from us. if you have any Questions. please do not hesitate-Call Us!. Your QUOTE has a 60MINUTE activation time.To see your quote, please signin. The quote will be in your dashboard called profile folder." }
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user_id, email, name, quoteKey } = req.body as quoteimgType;

        try {
            if (quoteKey && user_id) {

                const quoteimgKey = await prisma.quoteImg.create({
                    data: {
                        imgKey: quoteKey,
                        user_id: user_id
                    }
                }) as quoteImgKeyType;
                if (quoteimgKey) {
                    const Key = quoteimgKey.imgKey
                    const quoteImg = `https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/${Key}`;
                    let user = {} as userType;
                    user = { ...user, name: name, email: email, id: quoteimgKey.user_id }
                    if (user_id) {
                        const isUser = await prisma.user.findUnique({
                            where: {
                                id: user_id
                            },
                            select: {
                                name: true,
                                email: true,
                                image: true,
                                imgKey: true,
                                showinfo: true,
                                username: true
                            }
                        }) as userType;
                        if (isUser) {
                            user = { ...isUser };
                        }
                    }
                    await transporter.sendMail({
                        ...sendOptions(EMAIL, user.email as string),
                        subject: `Thank you ${user.name} for the Quote request!`,
                        text: QuoteText({ user, message, quoteImg: quoteImg, EMAIL }),
                        html: await QuoteHTML({ user, message, quoteImg, EMAIL })
                    });

                    await prisma.$disconnect();
                    //CONFIRM SENT
                    return res.status(200).json({ msg: "sent" });
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
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        const { imgKey } = req.query as { imgKey: string };
        try {

            const getImgKey = await prisma.quoteImg.findUnique({
                where: {
                    imgKey: imgKey
                }
            });
            if (getImgKey) {
                const Key = getImgKey.imgKey
                const quoteImg = `https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com/${Key}`;
                res.status(200).json(quoteImg);
            } else {
                res.status(302).json({ msg: "image not found" });
            }
        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(400).json({ msg: msg })
            return await prisma.$disconnect();
        } finally {
            await prisma.$disconnect();
        }
    } else {

        res.status(400).json({ message: "Bad request" });
        return await prisma.$disconnect();
    }
}
export default handler;