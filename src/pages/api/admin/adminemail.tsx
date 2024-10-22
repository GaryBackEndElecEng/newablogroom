import { transporter, mailOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userType, adminReplyMsgType } from "@/components/editor/Types";
import { adminMsgHTML, adminMsgText } from "@/components/emails/templates";

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        const { msg, user_id, reply } = req.body as adminReplyMsgType;
        if (!(user_id && msg && reply)) {
            res.status(302).json({ message: "I think you forgot something,,no body!!" });
            return await prisma.$disconnect();
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: user_id as string
                }
            });
            if (user && !(user.email === EMAIL || user.email === EMAIL2)) { res.status(400).json({ msg: "unauthorized", success: false }) }
            //SECURE AREA
            if (user) {
                const name = user.name ? user.name : null;

                await transporter.sendMail({
                    ...mailOptions(user.email),
                    subject: `Thank you ${name} for the REQUEST!`,
                    text: adminMsgText({ message: msg, user: user as userType, reply }),
                    html: adminMsgHTML({ message: msg, user: user as userType, reply })
                });
                res.status(200).json({ msg: "sent", success: true });
                await prisma.message.update({
                    where: { id: msg.id },
                    data: {
                        sent: true
                    }
                });
                return await prisma.$disconnect();
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: error })
        } finally {
            await prisma.$disconnect();
        }
    }
    res.status(400).json({ message: "Bad request" })
}
export default handler;