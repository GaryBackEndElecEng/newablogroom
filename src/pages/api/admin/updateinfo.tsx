import { getErrorMessage } from "@/lib/errorBoundaries";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { infoType2, pageCountType } from "@/components/editor/Types";
import prisma from "@/prisma/prismaclient";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";


export const runtme = 'experimental-edge';
// const apiendpoint = process.env.NEXT_PUBLIC_apiGateway

const Bucket = process.env.FREE_BUCKET_NAME as string
const region = process.env.BUCKET_REGION as string
const accessKeyId = process.env.SDK_ACCESS_KEY_FREE_BUCKET as string
const secretAccessKey = process.env.SDK_ACCESS_KEY_SECRET_FREE_BUCKET as string

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});

const EMAIL = process.env.EMAIL as string;
const EMAIL2 = process.env.EMAIL2 as string;


//--------( /API/BLOG/ID ) OR ( /API/BLOG/USER_ID )---------///
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { info, user_id } = req.body as { info: infoType2, user_id: string };
        // console.log("INFO", info, "USER_ID", user_id)//works
        if (!user_id) res.status(400).json({ msg: "query has no user id" });
        const user = await prisma.user.findUnique({
            where: {
                id: user_id
            }
        });
        if (!user) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect() };
        if (!(user && (user.email === EMAIL || user.email === EMAIL2))) { res.status(400).json({ msg: "not authorized" }); return await prisma.$disconnect() };
        //SAFE

        try {
            const RetInfo = await uploadJsonToS3({ jsonFile: JSON.stringify(info), Key: "info.json" })
            res.status(200).json(RetInfo)
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log(msg);
        } finally {
            await prisma.$disconnect();
        }
    }
};

async function uploadJsonToS3(item: { jsonFile: infoType2 | string, Key: string }): Promise<infoType2> {
    const { jsonFile, Key } = item;
    const params = {
        Bucket,
        Body: jsonFile as string,
        Key,
        ContentType: "application/json"
    }
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return jsonFile as infoType2

}