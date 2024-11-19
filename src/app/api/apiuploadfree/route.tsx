import { getErrorMessage } from "@/lib/errorBoundaries";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "@aws-sdk/signature-v4-crt"
import { NextRequest, NextResponse } from "next/server";

// export const config = { runtime: 'experimental-edge' }

const Bucket = process.env.FREE_BUCKET_NAME as string
const region = process.env.BUCKET_REGION as string
const accessKeyId = process.env.SDK_ACCESS_KEY_FREE_BUCKET as string
const secretAccessKey = process.env.SDK_ACCESS_KEY_SECRET_FREE_BUCKET as string
const apiendpoint = process.env.NEXT_PUBLIC_apiGateway

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});

export async function PUT(req: NextRequest) {
    try {
        const formdata = await req.formData() as FormData;
        const Key = formdata.get("Key");
        const file = formdata.get("file") as File;
        if (formdata && Key && file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const freeUrl = apiendpoint + `/newablogroom-free-bucket/${Key}`
            const isSent = await sendToS3({ url: freeUrl, file });
            if (isSent) {
                NextResponse.json({ success: true }, { status: 200 });
            } else {
                NextResponse.json({ success: false }, { status: 400 });
            }
        } else {
            NextResponse.json({ error: "no formdata" }, { status: 400 })
        }
    } catch (error) {
        const msg = getErrorMessage(error);
        NextResponse.json({ msg }, { status: 500 })
        // console.log(msg);
    }

}

async function sendToS3(item: { url: string, file: File }): Promise<boolean> {
    const { url, file } = item;
    let isSent: boolean;
    try {
        const option = {
            method: "PUT",
            body: file
        }
        isSent = await fetch(url, option).then(async (res) => {
            if (res.ok) {
                return true
            } else {
                return false
            }
        });
        return isSent
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg)
        isSent = false
        return isSent
    }
}