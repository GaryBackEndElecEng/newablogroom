import { blogType, selectorType, element_selType, elementType, userType } from "@/components/editor/Types";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { insertHtml, insertBackgroundImage } from "@/lib/ultils/functions";


const Bucket = process.env.BUCKET_NAME as string
const region = process.env.BUCKET_REGION as string
const accessKeyId = process.env.SDK_ACCESS_KEY as string
const secretAccessKey = process.env.SDK_ACCESS_SECRET as string
const freeBucket = process.env.FREE_BUCKET_NAME as string
const freeAccessKeyId = process.env.SDK_ACCESS_KEY_FREE_BUCKET as string
const freeSecretAccessKey = process.env.SDK_ACCESS_KEY_SECRET_FREE_BUCKET as string

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }

});
const s3Free = new S3Client({
    region,
    credentials: {
        accessKeyId: freeAccessKeyId,
        secretAccessKey: freeSecretAccessKey
    }

});
export async function awsImage(Key: string) {
    const getParams = {
        Bucket,
        Key
    }
    const cmd = new GetObjectCommand(getParams);
    return await getSignedUrl(s3, cmd, { expiresIn: 3600 });
};
export async function awsDel(Key: string) {
    const getParams = {
        Bucket,
        Key
    }
    const cmd = new DeleteObjectCommand(getParams);
    return await s3.send(cmd);
};

export async function getUserBlogsImgs(blogs: blogType[]) {
    const getBlogs = await Promise.all(
        blogs.map(async (blog) => {
            if (blog.imgKey) {
                const getParams = {
                    Bucket,
                    Key: blog.imgKey
                }
                const cmd = new GetObjectCommand(getParams)
                blog.img = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
            }
            if (blog.imgBgKey) {
                const getParams = {
                    Bucket,
                    Key: blog.imgBgKey
                }
                const cmd = new GetObjectCommand(getParams)
                const blogCssUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                blog.cssText = replaceBgImage(blog.cssText, blogCssUrl)
            }
            return blog;
        })
    )
    return getBlogs
}
export async function getBlogsImages(blogs: blogType[]) {
    const getBlogs = await Promise.all(
        blogs.map(async (blog) => {
            return await getBlogImages(blog)
        })
    )
    return getBlogs
}


export async function getBlogImages(blog: blogType) {
    if (blog.imgKey) {
        const getParams = {
            Bucket,
            Key: blog.imgKey
        }
        const cmd = new GetObjectCommand(getParams)
        blog.img = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    }
    if (blog.imgBgKey) {
        const getParams = {
            Bucket,
            Key: blog.imgKey
        }
        const cmd = new GetObjectCommand(getParams)
        const bgImg = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
        if (blog.cssText) {
            blog.cssText = insertBackgroundImage({ css: blog.cssText, url: bgImg })
        }
    }
    const selects = await getSelectors(blog.selectors);
    const elements = await getElements(blog.elements);
    blog = { ...blog, selectors: selects, elements: elements }
    return blog;
}

export async function getSelectors(selectors: selectorType[]) {
    const selects = await Promise.all(selectors.map(async (sel) => {
        const getRows = await Promise.all(sel.rows.map(async (row) => {
            //row
            if (row.imgKey) {
                const getParams = {
                    Bucket,
                    Key: row.imgKey
                }
                const cmd = new GetObjectCommand(getParams)
                const bgUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                row.cssText = insertBackgroundImage({ css: row.cssText, url: bgUrl });
            }
            const getCols = await Promise.all(row.cols.map(async (col) => {
                //col
                if (col.imgKey) {
                    const getParams = {
                        Bucket,
                        Key: col.imgKey
                    }
                    const cmd = new GetObjectCommand(getParams)
                    const bgUrl = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                    col.cssText = insertBackgroundImage({ css: col.cssText, url: bgUrl });
                }

                const getEles = await Promise.all(col.elements.map(async (ele) => {
                    if (ele.imgKey) {
                        const getParams = {
                            Bucket,
                            Key: ele.imgKey
                        }
                        const cmd = new GetObjectCommand(getParams)
                        if (ele.attr === "has-innerimage") {
                            const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                            ele.inner_html = hasinnerimage(ele.inner_html, url);
                        } else if (ele.attr === "data-shapeOutside") {
                            const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                            ele = shapeOutsideInsertSel(ele, url) as element_selType;
                        } else {
                            ele.img = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                        }
                    }
                    return ele;
                }));
                col = { ...col, elements: getEles };
                return col;

            }));
            row = { ...row, cols: getCols }
            return row
        }));
        sel = { ...sel, rows: getRows }
        return sel
    }));

    return selects as selectorType[]
}
export async function getElements(elements: elementType[]) {
    const getElements = await Promise.all(
        elements.map(async (ele) => {
            if (ele.imgKey) {
                const getParams = {
                    Bucket,
                    Key: ele.imgKey
                }
                const cmd = new GetObjectCommand(getParams);
                const url = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
                if (ele.attr === "data-shapeOutside") {
                    ele = shapeOutsideInsert(ele, url) as elementType;
                } else {
                    ele.img = url;
                }
            }
            return ele;
        })
    )
    return getElements
}
function shapeOutsideInsert(ele: elementType, url: string): elementType | undefined {
    //<img contenteditable="false" is-shapeoutside="true" src="blob:http://localhost:3000/d28bcb46-9798-4636-8b1a-30ddc25623bf" OR "https://masterultils-postimages.s3.us-east-1.amazonaws.com/cm05sztee0000f92fleza6brc-newblog/07478a12-DeckPicChris.JPG?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUM5MDS3HOEJIIN63%2F20240826%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240826T213604Z&X-Amz-Expires=3600&X-Amz-Signature=b3de4b82f155f2be1ae03e362215491856ebc747698a00631b4569128c8f1dc2&X-Amz-SignedHeaders=host&x-id=GetObject" id="shape-outside-img" alt="ww.ablogroom.com" style="border-radius: 50%; max-width: 350px; shape-outside: circle(); width: 100%; margin-right: 4rem; margin-block: 1rem; aspect-ratio: 1 / 1; float: left !important;" para-id="shape-outside-184">
    if (ele) {
        const str = ele.inner_html;
        if (ele.attr === "data-shapeOutside") {
            const startReg = /(src)\=\"/g;
            const endReg: RegExp = /((http\:\/\/)|(https\:\/\/))[a-zA-Z0-9\:\/\-\.\?\"\=]{36,}/g;
            const insert_ = "src=" + url;
            const retStr = insertHtml({ str, startReg, endReg, insert: insert_ })
            return { ...ele, inner_html: retStr }
        } else {
            return { ...ele }
        }
    } else {
        return;
    }
};
function shapeOutsideInsertSel(ele: element_selType, url: string): element_selType | undefined {
    if (ele) {
        const str = ele.inner_html;
        if (ele.attr === "data-shapeOutside") {
            const startReg: RegExp = /(src)\=\"/g;
            const endReg: RegExp = /((http\:\/\/)|(https\:\/\/))[a-zA-Z0-9\:\/\-\.\?\"\=]{36,}/g;
            const insert_ = url;
            const retStr = insertHtml({ str, startReg, endReg, insert: insert_ })
            return { ...ele, inner_html: retStr }
        } else {
            return { ...ele }
        }
    } else {
        return;
    }
};

function replaceBgImage(colcss: string | undefined, url: string): string {
    if (colcss) {
        let cssArr = colcss.split(";");
        cssArr = cssArr.filter(cl => (!(cl.includes("background-image"))))
        cssArr.push(`backgroung-image:url${url}`);
        colcss = cssArr.join(";");
    } else {
        colcss = ""
    }
    return colcss;
}
export async function getUsersImage(users: userType[]) {
    if (users) {
        const newUsers = await Promise.all(users.map(async (user) => (await getUserImage(user))))
        return newUsers
    }

}
export async function getUserImage(user: userType): Promise<userType> {
    if (user.imgKey) {
        const getParams = {
            Bucket,
            Key: user.imgKey
        }
        const cmd = new GetObjectCommand(getParams)
        user.image = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    }
    return user;
}

export async function getAllBlogImages(blogs: blogType[]): Promise<blogType[]> {
    return blogs.map(async (blog) => (await getOnlyBlogImages(blog))) as unknown[] as blogType[];
}
export async function getOnlyBlogImages(blog: blogType): Promise<blogType> {
    if (blog.imgKey) {
        const getParams = {
            Bucket,
            Key: blog.imgKey
        }
        const cmd = new GetObjectCommand(getParams)
        blog.img = await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    }

    return blog;
}

export function hasinnerimage(innerhtml: string, url: string) {
    let innerhtmlArr: string[] = [];
    innerhtmlArr = innerhtml.split(" ");
    if (innerhtmlArr.length > 0) {
        innerhtmlArr = innerhtmlArr.map(item => {
            if (item.startsWith("src=")) {
                item = `src="${url}"`;
            }
            return item;
        });
    }
    return innerhtmlArr.join(" ")
}
export async function getSingleImage(Key: string): Promise<string | undefined> {
    if (Key) {
        const getParams = {
            Bucket,
            Key
        }
        const cmd = new GetObjectCommand(getParams)
        return await getSignedUrl(s3, cmd, { expiresIn: 3600 });
    }
}

export async function deleteImage(Key: string): Promise<boolean> {
    const getParams = {
        Bucket,
        Key
    }
    const cmd = new DeleteObjectCommand(getParams)
    const response = await s3.send(cmd);
    if (response) {
        return true;
    };
    return false;
}
