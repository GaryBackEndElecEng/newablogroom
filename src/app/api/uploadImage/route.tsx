
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import "@aws-sdk/signature-v4-crt"
import { NextRequest, NextResponse } from "next/server";

// export const config = { runtime: 'experimental-edge' }

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

export async function PUT(req: NextRequest) {

    const formdata = await req.formData() as FormData;
    // console.log(formdata)
    const file: File | null = formdata.get("file") as unknown as File;
    const Key: string | null = formdata.get("Key") as unknown as string;
    // console.log(file, "Key", Key)
    if (!file) {
        return NextResponse.json({ error: "file doesn't exist" }, { status: 404 })
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // const reSizeBuffer = await sharp(buffer).resize({ width: 600, height: 400 }).toBuffer()

    // console.log("NAME", file.name, "Key", Key);//worked
    if (!(buffer || Key)) {
        NextResponse.json({ error: "no file name" }, { status: 404 })
    }

    const params = {
        Bucket,
        Body: buffer,
        Key,
        // ContentType:formdata.mimetype
    }


    const command = new PutObjectCommand(params);
    const result = await s3.send(command);
    if (result) {
        console.log("pic saved")
        //DOES NOT SEND KEY AND URL BACK MUST DO A GET IMAGE

        return NextResponse.json({ status: 200 })

    }

}