import { transporter, mailOptions, sendOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userType, adminReplyMsgType } from "@/components/editor/Types";
import { adminMsgHTML, adminMsgText } from "@/components/emails/templates";
import prisma from "@/prisma/prismaclient";

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;



const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "POST") {
        const { msg, user_id, reply, admin_id } = req.body as adminReplyMsgType;



        if (!(user_id && msg && reply)) {
            res.status(302).json({ message: "I think you forgot something,,no body!!" });
            return await prisma.$disconnect();
        };


        try {

            const admin = await prisma.user.findUnique({
                where: { id: admin_id },
            });
            if (admin && !(admin.email === EMAIL || admin.email === EMAIL2)) { res.status(400).json({ msg: "unauthorized", success: false }) };

            const user = await prisma.user.findUnique({
                where: {
                    id: user_id as string
                }
            });
            //SECURE AREA
            if (user && admin) {
                const name = user.name ? user.name : null;

                await transporter.sendMail({
                    ...sendOptions({ toEmail: admin.email, viewerEmail: user.email }),
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