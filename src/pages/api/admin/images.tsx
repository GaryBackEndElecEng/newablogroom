
import { NextApiRequest, NextApiResponse } from "next";
import { adminImageType, } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { awsDel, awsImage } from "@/lib/awsFunctions";
import prisma from "@/prisma/prismaclient";
import { getFreeBgImageUrl } from "@/lib/ultils/functions";



const EMAIL = process.env.EMAIL;
const EMAIL2 = process.env.EMAIL2;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const { email, id } = req.body;

        if (email === EMAIL || email === EMAIL2) {

            try {
                const user = await prisma.user.findUnique({
                    where: { email: email, id: id }
                });
                if (!user) { res.status(400).json({ msg: "unauthorized" }); return await prisma.$disconnect(); }
                if (user) {
                    const images = await prisma.deletedImg.findMany({
                        where: { del: true },
                        select: {
                            id: true,
                            count: true,
                            date: true,
                            imgKey: true,
                            del: true
                        }
                    });
                    console.log(images)
                    const arr = await Promise.all(images.map(async (img) => {
                        if (img.imgKey) {
                            console.log(img.imgKey)
                            const hasFree = checkFreeImgKey({ imgKey: img.imgKey });
                            if (hasFree) {
                                const getImg = getFreeBgImageUrl({ imgKey: img.imgKey });
                                return { ...img, img: getImg };
                            } else {
                                const getImg = img.imgKey ? await awsImage(img.imgKey as string) as string : null;
                                return { ...img, img: getImg };

                            }
                        }
                    }).filter(img_ => (img_))) as unknown[] as adminImageType[];
                    res.status(200).json(arr);
                    await prisma.$disconnect();
                };
            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg });
                await prisma.$disconnect();
            };
        } else {
            res.status(400).json({ msg: `unauthorized` });
        };


    } else if (req.method === "DELETE") {
        const { id } = req.query;
        if (id as string) {
            try {

                const img = await prisma.deletedImg.delete({
                    where: { id: parseInt(id as string) }
                });
                if (img) {
                    await awsDel(img.imgKey);//DELETEING FROM S3
                    res.status(200).json({ id: img.id })
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);

            } finally {
                await prisma.$disconnect()
            }
        };


    } else if (req.method === "PUT") {
        const { imgKey } = req.query;
        if (imgKey) {
            try {
                const getImg = await prisma.deletedImg.findUnique({
                    where: { imgKey: imgKey as string }
                });
                if (getImg) {
                    const getImage = await prisma.deletedImg.update({
                        where: { id: getImg.id },
                        data: {
                            del: true
                        }
                    }) as unknown as adminImageType;
                    res.status(200).json(getImage)
                } else {
                    res.status(400).json({ msg: `image not found:${imgKey}` });
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);

            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ msg: "missing key" })
        };


    } else if (req.method === "GET") {
        const { imgKey, count } = req.query as { imgKey: string, count: string };
        const noImage = {
            id: 0,
            img: null,
            imgKey: null,
            del: false,
            date: null
        }
        if (imgKey && count === "count") {
            try {
                const getImg = await prisma.deletedImg.findUnique({
                    where: { imgKey: imgKey as string }
                });
                if (getImg && getImg.count) {
                    const getImage = await prisma.deletedImg.update({
                        where: { id: getImg.id },
                        data: {
                            count: getImg.count + 1
                        }
                    }) as unknown as adminImageType;
                    res.status(200).json(getImage)
                } else {
                    res.status(308).json(noImage);
                }
            } catch (error) {
                const msg = getErrorMessage(error);
                console.error(msg);

            } finally {
                await prisma.$disconnect()
            }
        } else {
            res.status(308).json(noImage)
        }
        await prisma.$disconnect();
    };

};


function checkFreeImgKey({ imgKey }: { imgKey: string }) {
    //FORM: ${user_id}-${name}-${file.name}
    //cm82yqjd70000w958mglvn99p-testthis/56efea2f-firePic.png
    // const regName:RegExp=/\w/;
    const regFree: RegExp = /(freeImg)/;
    const regHyph: RegExp = /\w-\w/;
    const hasHyphen = regHyph.test(imgKey);
    const words = imgKey.split("-");
    const testLen = words.length === 1;
    const testFree = regFree.test(imgKey);
    if (hasHyphen) {
        //has free && non free key
        if (testFree) {
            return true
        } else {
            return false;
        }

    } else if (testLen) {
        //from insert image
        return true;
    }
    return false
};