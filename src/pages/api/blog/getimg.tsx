import { NextApiRequest, NextApiResponse } from "next";
import { gets3ImgKey } from '@/components/editor/Types';
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { PrismaClient } from "@prisma/client";
import prisma from "@/prisma/prismaclient";



const Bucket = process.env.BUCKET_NAME as string
const region = process.env.BUCKET_REGION as string
const accessKeyId = process.env.SDK_ACCESS_KEY as string
const secretAccessKey = process.env.SDK_ACCESS_SECRET as string

export const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const Key = req.query.Key as string;
    // console.log("Key", Key)
    if (!(Key)) res.status(200).json({ imageUrl: null, key: null })
    try {
        const params = {
            Key,
            Bucket
        }
        const command = new GetObjectCommand(params);
        const img = await getSignedUrl(s3, command, { expiresIn: 3600 })
        if (img) {
            const retObj: gets3ImgKey = {
                img: img,
                Key: Key,

            }
            await countImage({ imgKey: Key });
            res.status(200).json(retObj)
        } else {
            res.status(200).json({ img: null, key: Key })
        }
    } catch (error) {
        const msg = getErrorMessage(error)
        res.status(500).json({ message: "did not return user's url Pic" })
        console.error(msg)
    }

}

export async function countImage(item: { imgKey: string }) {
    const { imgKey } = item;
    if (!imgKey) return;
    if (imgKey) {
        const isImg = await prisma.deletedImg.findUnique({
            where: { imgKey }
        });
        if (isImg) {
            await prisma.deletedImg.update({ where: { id: isImg.id }, data: { count: isImg.count ? isImg.count + 1 : 1 } });
        }
        await prisma.$disconnect();
    }
}