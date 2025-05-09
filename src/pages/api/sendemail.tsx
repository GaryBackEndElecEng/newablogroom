import { transporter, sendOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { sendEmailMsgType, userType } from "@/components/editor/Types";
import { clientMsgHTML, clientMsgText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user_id, messageId, msg, viewerEmail, viewerName } = req.body as sendEmailMsgType;

        if (!(user_id)) {
            res.status(302).json({ message: "I think you forgot something" });
            return await prisma.$disconnect();
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: user_id as string
                }
            });
            if (user) {
                await transporter.sendMail({
                    ...sendOptions({ viewerEmail, toEmail: user.email }),
                    subject: `Thank you ${viewerName} for responding!`,
                    text: clientMsgText({ viewerName, viewerEmail, msg: msg, user: user as unknown as userType }),
                    html: await clientMsgHTML({ viewerName, viewerEmail, msg: msg, user: user as unknown as userType })
                });
                //CONFIRM SENT
                await prisma.message.update({
                    where: { id: messageId as number },
                    data: {
                        sent: true
                    }
                });
                res.status(200).json({ msg: "sent" });
                return await prisma.$disconnect();
            };

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