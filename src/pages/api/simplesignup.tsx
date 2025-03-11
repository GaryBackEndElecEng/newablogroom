import { transporter, mailOptions } from "@/components/emails/nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import { signupType, } from "@/components/editor/Types";
import { simpleSignUpHTML, simpleSignUpText } from "@/components/emails/templates";
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { awsImage } from "@/lib/awsFunctions";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {

        const { email, name } = req.body as { email: string, name: string };

        try {
            if (email && name) {

                const newSignup = await prisma.signup.upsert({
                    where: { email: email },
                    create: {
                        email: email,
                        name: name
                    },
                    update: {}
                }) as unknown as signupType;
                if (newSignup) {

                    await transporter.sendMail({
                        ...mailOptions(email),
                        subject: `Thank you ${name} for signing up!`,
                        text: simpleSignUpText({ name, email }),
                        html: simpleSignUpHTML({ email, name })
                    });
                    res.status(200).json(newSignup);
                    return await prisma.$disconnect();
                    //CONFIRM SENT
                } else {
                    res.status(308).json({ mgs: "email was not sent" });
                    return await prisma.$disconnect();
                };
            } else {
                res.status(302).json({ message: `I think you forgot something: key && id` });
                return await prisma.$disconnect();
            };

        } catch (error) {
            const msg = getErrorMessage(error);
            console.log({ msg: msg })
            res.status(400).json({ msg: msg })
            return await prisma.$disconnect();
        };

    } else if (req.method === "GET") {
        const { imgKey } = req.query as { imgKey: string };
        try {

            const getImgKey = await prisma.quoteImg.findUnique({
                where: {
                    imgKey: imgKey
                }
            });
            if (getImgKey) {
                const url = await awsImage(getImgKey.imgKey);
                res.status(200).json(url);
                return await prisma.$disconnect();
            } else {
                res.status(302).json({ msg: "image not found" });
                return await prisma.$disconnect();
            }
        } catch (error) {
            console.log(error)
            const msg = getErrorMessage(error);
            res.status(400).json({ msg: msg })
            return await prisma.$disconnect();
        }
    } else {

        res.status(400).json({ message: "Bad request" });
        return await prisma.$disconnect();
    }
}
export default handler;