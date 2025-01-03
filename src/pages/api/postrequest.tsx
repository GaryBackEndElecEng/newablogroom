import { transporter, sendOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { postType, sendPostRequestType, userType } from "@/components/editor/Types";
import { sendReqAnswerHTML, sendReqAnswerText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";

const freepicurl: string = "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //THIS SENDS THE ANSWER TO A POST EITHER BY URI OR AND MSG (post.sendMsg or And uri=freepicurl/post.sendRqKey)
    if (req.method === "POST") {
        const { post, clientName, clientEmail } = req.body as sendPostRequestType;
        if (!(post.userId && post.id)) {
            res.status(302).json({ message: "I think you forgot something" });
            return await prisma.$disconnect();
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: post.userId
                }
            });
            if (user) {
                let uri: string | null = null;
                if (post && post.sendReqKey) {
                    uri = `${freepicurl}/${post.sendReqKey}`;
                }

                if (post && user && (post.sendReqKey || post.sendMsg)) {
                    await transporter.sendMail({
                        ...sendOptions(user.email, clientEmail as string),
                        subject: `Thank you ${clientName} for the Request!`,
                        text: await sendReqAnswerText({ clientName, clientEmail, uri: uri, msg: post.sendMsg, post: post as postType, user: user as unknown as userType }),
                        html: await sendReqAnswerHTML({ clientName, clientEmail, uri: uri, msg: post.sendMsg, post: post as postType, user: user as unknown as userType })
                    });

                }
                //CONFIRM SENT
                if (post) {
                    await prisma.post.update({
                        where: { id: post.id },
                        data: {
                            likes: post.likes ? post.likes + 1 : 1
                        }
                    });
                }
                await prisma.$disconnect();
                //CONFIRM SENT
                return res.status(200).json({ msg: "sent" });
            } else {
                await prisma.$disconnect();
                return res.status(400).json({ msg: "no user" });
            }

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