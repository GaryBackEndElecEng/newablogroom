
import { getErrorMessage } from "@/lib/errorBoundaries";
import prisma from "@/prisma/prismaclient";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export const runtme = 'experimental-edge';

const Bucket = process.env.BUCKET_NAME as string
const region = process.env.BUCKET_REGION as string
const accessKeyId = process.env.SDK_ACCESS_KEY as string
const secretAccessKey = process.env.SDK_ACCESS_SECRET as string

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});

export async function PUT(request: NextRequest) {
    try {

        const formdata = await request.formData() as FormData;
        if (formdata) {

            const file: File | null = formdata.get("file") as unknown as File;
            const Key: string | null = formdata.get("Key") as unknown as string;
            // console.log(file, "Key", Key)
            if (!(file)) {
                return NextResponse.json({ error: "file doesn't exist" }, { status: 404 })
            } else if (!(Key)) {
                NextResponse.json({ error: "no Key" }, { status: 404 })
            }
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filename = await uploadFileToS3({ buffer, fileType: file.type, Key });

            const isTrue = await registerImage({ Key });
            if (isTrue) {
                return NextResponse.json({ success: "success", filename }, { status: 200 })
            } else {
                return NextResponse.json({ success: "failed", filename }, { status: 200 })
            }
            // console.log("NAME", file.name, "Key", Key);//worked


        } else {
            NextResponse.json({ error: "no formdata" }, { status: 400 })
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        NextResponse.json({ msg }, { status: 500 })

    }

};

async function uploadFileToS3(item: { buffer: Buffer, fileType: string, Key: string }) {
    const { buffer, fileType, Key } = item;
    const params = {
        Bucket,
        Body: buffer,
        Key,
        ContentType: fileType
    }
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return Key

};

async function registerImage(item: { Key: string }) {
    const { Key } = item;
    let msg: string = '';
    try {
        const create = await prisma.deletedImg.create({
            data: {
                imgKey: Key,
                count: 1,
                del: false
            }
        });
        await prisma.$disconnect();
        if (!create) return false;
        return true
    } catch (error) {
        msg = getErrorMessage(error);
        console.log(msg)
        await prisma.$disconnect();
        return false;
    }
}