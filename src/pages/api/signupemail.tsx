import { transporter, mailOptions, } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userType } from "@/components/editor/Types";
import { signUpHTML, signUpText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { user_id } = req.body as { user_id: string, };

        if (!(user_id)) {
            res.status(302).json({ message: "I think you forgot something" })
            return await prisma.$disconnect();
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: user_id as string
                }
            });
            if (user) {
                const username = user.name ? user.name : "blogger";
                await transporter.sendMail({
                    ...mailOptions(user.email),
                    subject: `Thank you ${username} for Signin up!`,
                    text: signUpText({ user: user as unknown as userType }),
                    html: await signUpHTML({ user: user as unknown as userType })
                });
                await prisma.$disconnect();
                return res.status(200).json({ msg: "sent" });
            } else {
                res.status(400).json({ msg: "could not send email" });
                return await prisma.$disconnect()
            }

        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(400).json({ message: msg });
            return await prisma.$disconnect()
        }
    } else {
        res.status(400).json({ message: "Bad request" })
        return await prisma.$disconnect()
    }
}
export default handler;