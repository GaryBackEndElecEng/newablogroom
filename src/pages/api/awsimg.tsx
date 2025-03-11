
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

        if (!(imgKey)) { res.status(400).json({ msg: "no key" }); return await prisma.$disconnect(); };
        try {
            const create = await prisma.deletedImg.upsert({
                where: {
                    imgKey: imgKey
                },
                create: {
                    imgKey: imgKey,
                    del: false,
                    count: 1
                },
                update: {
                    imgKey: imgKey,
                    del: Boolean(del),
                }
            });
            res.status(200).json(create);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg);
            res.status(400).json({ message: msg });
            return await prisma.$disconnect()
        }

    } else if (req.method === "PUT") {
        const delImg = req.body as deletedImgType;
        const { imgKey, del } = delImg;
        if (!(imgKey && del)) { res.status(400).json({ msg: "no key" }); return await prisma.$disconnect(); };
        try {
            const getdelImg = await prisma.deletedImg.findUnique({
                where: {
                    imgKey: imgKey
                }
            });
            if (!getdelImg) { res.status(400).json({ msg: "could not find" }); return await prisma.$disconnect(); }
            const updateImg = await prisma.deletedImg.update({
                where: { imgKey: getdelImg.imgKey },
                data: {
                    count: getdelImg.count ? getdelImg.count + 1 : 2,
                    del: Boolean(del)
                }
            });
            res.status(200).json(updateImg);
            return await prisma.$disconnect();
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg)
            res.status(400).json({ message: msg })
            return await prisma.$disconnect();
        }

    } else if (req.method === "GET") {
        //Key=`${blog.user_id}-${name}/${rand}-${file.name}`
        const { user_id, email } = req.query;
        let img_keys: img_keyType[] = [];
        if (user_id && email) {
            try {
                const getUser = await prisma.user.findUnique({
                    where: {
                        id: user_id as string,
                        email: email as string
                    }
                });
                if (getUser) {

                    const imgKeys = await prisma.deletedImg.findMany();
                    if (imgKeys) {
                        img_keys = imgKeys.map(async (imgKey) => {
                            let img_key: img_keyType = { id: imgKey.id, del: imgKey.del, imgKey: imgKey.imgKey, date: imgKey.date, url: "" };
                            const url = await getSingleImage(imgKey.imgKey);
                            if (url) {
                                img_key = { ...img_key, url }
                            }
                            return img_key as img_keyType

                        }) as unknown as img_keyType[];
                        if (EMAIL !== email) {
                            const userImgs = img_keys.filter(imgkey => (isUserImg(getUser.id, imgkey.imgKey)));
                            res.status(200).json(userImgs);
                            return await prisma.$disconnect();
                        } else {
                            res.status(200).json(img_keys);
                            return await prisma.$disconnect();
                        }
                    }
                } else {
                    res.status(404).json({ msg: "not authorized,,no user" });
                    return await prisma.$disconnect();
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                return await prisma.$disconnect();
            };
        } else {
            res.status(404).json({ "msg": "no user and email" });
            return await prisma.$disconnect();
        }
    }
}

export function isUserImg(user_id: string, Key: string) {
    //Key=`${blog.user_id}-${name}/${rand}-${file.name}`
    const partition2 = Key.split("-")[0];
    if (partition2.includes(user_id) || partition2.startsWith(user_id)) {
        return true;
    }
    return false;
}


