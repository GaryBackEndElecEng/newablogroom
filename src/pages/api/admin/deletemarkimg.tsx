import { NextApiRequest, NextApiResponse } from "next";
import { deletedImgType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
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
                    return await prisma.$disconnect();
                } else {
                    const create = await prisma.deletedImg.create({
                        data: {
                            imgKey: imgKey,
                            del: false,
                            count: 1
                        }
                    });
                    res.status(200).json(create);
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
                return await prisma.$disconnect();
            }

        } else {
            res.status(400).json({ msg: "no key" });
            return await prisma.$disconnect();
        };

    } else if (req.method === "PUT") {
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
                    return await prisma.$disconnect();
                } else {
                    res.status(200).json(delImg);
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
                return await prisma.$disconnect();
            }

        } else {
            res.status(400).json({ msg: "no key" });
            return await prisma.$disconnect();
        };
    } else if (req.method === "GET") {
        const imgKey = req.query.imgKey as string;
        if (!imgKey) return res.status(400).json({ msg: "no imgKey" });
        try {
            const create = await prisma.deletedImg.findUnique({
                where: {
                    imgKey: imgKey
                }
            });
            if (create) {
                res.status(200).json(create);
                return await prisma.$disconnect();
            } else {
                const retResult: deletedImgType = { imgKey, del: false, date: new Date() }
                res.status(200).json(retResult);
                return await prisma.$disconnect();
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            res.status(400).json({ msg });
            return await prisma.$disconnect();
        }
    }
}