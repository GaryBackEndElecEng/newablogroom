import { NextApiRequest, NextApiResponse } from "next";
import { img_keyType, deletedImgType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { getSingleImage } from "@/lib/awsFunctions"
import prisma from "@/prisma/prismaclient";




const EMAIL = process.env.EMAIL as string;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const delImg = req.body as deletedImgType;
        const { imgKey, del } = delImg as deletedImgType

        if (imgKey) {

            try {
                const isImgKey = await prisma.deletedImg.findUnique({
                    where: { imgKey: imgKey }
                });
                if (isImgKey) {

                    const create = await prisma.deletedImg.update({
                        where: {
                            imgKey: imgKey
                        },
                        data: {
                            del: Boolean(del),
                            count: isImgKey.count ? isImgKey.count + 1 : 1
                        }
                    });
                    res.status(200).json(create);
                } else {
                    const create = await prisma.deletedImg.create({
                        data: {
                            imgKey: imgKey,
                            del: false,
                            count: 1
                        }
                    });
                    res.status(200).json(create);
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                return await prisma.$disconnect()
            }

        } else {
            res.status(400).json({ msg: "no key" });
        };

    } if (req.method === "GET") {
        const imgKey = req.query.imgKey as string;
        try {
            const create = await prisma.deletedImg.findUnique({
                where: {
                    imgKey: imgKey
                }
            });
            res.status(200).json(create);
        } catch (error) {
            const msg = getErrorMessage(error);
            res.status(400).json({ msg });
        } finally {
            return await prisma.$disconnect();
        }
    }
}