import { blogType, codeType, elementType, selectorType } from "@/components/editor/Types";
import { PrismaClient } from "@prisma/client";
import { getErrorMessage } from "../errorBoundaries";


export function insertHtml(item: { str: string, startReg: RegExp, endReg: RegExp, insert: string }): string {
    const { str, startReg, endReg, insert } = item;
    const insert_inner = str;
    let innerArr = insert_inner.split(" ");
    innerArr = innerArr.map(inner => {

        const startMatches = [...inner.matchAll(startReg) as any];
        const endMatches = [...inner.matchAll(endReg) as any];
        if (startMatches && endMatches && typeof (startMatches) === "object" && typeof (endMatches) === "object" && startMatches.length > 0 && endMatches.length > 0) {
            for (const start of startMatches) {
                if (start && start[0]) {
                    const len = inner.length;
                    for (const end of endMatches) {
                        if (end && end[0]) {
                            const end_ = end.index + end[0].length;
                            const innerStart = inner.slice(0, start - 1);
                            const innerEnd = inner.slice(end_, len);
                            inner = innerStart + insert + innerEnd;
                        }
                    }
                }
            }
        }
        return inner
    });
    return innerArr.join(" ").trim();
}
export const insertMatch = (item: { str: string, startReg: RegExp, endReg: RegExp, insert: string }): string => {
    const { str, startReg, endReg, insert } = item;
    let insert_inner = str;
    const startMatches = [...str.matchAll(startReg) as any];
    const endMatches = [...str.matchAll(endReg) as any];
    if (startMatches && endMatches && typeof (startMatches) === "object" && typeof (endMatches) === "object") {

        for (const start of startMatches) {
            if (start && start[0]) {
                const len = str.length;
                for (const end of endMatches) {
                    if (end && end[0]) {
                        const end_ = end.index + end[0].length;
                        const innerStart = str.slice(0, start - 1);
                        const innerEnd = str.slice(end_, len);
                        insert_inner = innerStart + insert + innerEnd;
                    }
                }
            }
        }
    }
    return insert_inner;
};
export function insertBackgroundImage(item: { css: string, url: string }): string {
    const { css, url } = item;

    let cssArr = css.split(";");
    cssArr = cssArr.map(strCss => {
        const startReg: RegExp = /(background)\-(image)\:(url)\(/g;
        const endReg: RegExp = /\)/g;
        const insert_ = "background-image:url(" + url + ")";
        strCss = insertMatch({ str: strCss, startReg, endReg, insert: insert_ });
        return strCss;
    });

    return cssArr.join(";").trim();
}
export function generateMarkImgkey(blog: blogType | null): { level: string, imgKey: string }[] {
    const arrImgKey: { level: string, imgKey: string }[] = []
    const selects = blog && blog.selectors;
    const elements = blog && blog.elements;
    if (selects) {
        selects.map(select => {
            if (!select) return;
            select.rows.map(row => {
                if (!row) return;
                if (row.imgKey) {
                    arrImgKey.push({ level: "row", imgKey: row.imgKey });
                }
                row.cols.map(col => {
                    if (!col) return;
                    if (col.imgKey) {
                        arrImgKey.push({ level: "col", imgKey: col.imgKey });
                    }
                    col.elements.map(ele => {
                        if (!ele) return;
                        if (ele.imgKey) {
                            arrImgKey.push({ level: "element", imgKey: ele.imgKey });
                        }
                    });
                });
            });
        });
    }
    if (elements && elements.length > 0) {
        elements.map(ele => {
            if (!ele) return;
            if (ele.imgKey) {
                arrImgKey.push({ level: "element", imgKey: ele.imgKey })
            };
        });
    }
    if (blog) {
        if (blog.imgKey) {
            arrImgKey.push({ level: "blog", imgKey: blog.imgKey });
        }
        if (blog.imgBgKey) {
            arrImgKey.push({ level: "blog", imgKey: blog.imgBgKey });
        }
    }
    return arrImgKey;
}
export async function findCountKeys(blog: blogType): Promise<void> {
    //ADDS VIEW COUNT TOKEYS
    const prisma = new PrismaClient();
    const arr: { key: string }[] = [];
    const selects = (blog.selectors && blog.selectors.length) ? blog.selectors as selectorType[] : null;
    const elements = (blog.elements && blog.elements.length) ? blog.elements as elementType[] : null;
    if (selects) {
        selects.map(select => {
            if (select) {
                select.rows.map(row => {
                    if (row) {
                        if (row.imgKey) {
                            arr.push({ key: row.imgKey });
                        }
                        row.cols.map(col => {
                            if (col) {
                                if (col.imgKey) {
                                    arr.push({ key: col.imgKey });
                                }
                                col.elements.map(ele => {
                                    if (ele && ele.imgKey) {
                                        arr.push({ key: ele.imgKey })
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    if (elements) {
        elements.map(ele => {
            if (ele && ele.imgKey) {
                arr.push({ key: ele.imgKey })
            }
        });

    }
    if (blog && blog.imgKey) {
        arr.push({ key: blog.imgKey });
    }
    if (blog && blog.imgBgKey) {
        arr.push({ key: blog.imgBgKey });
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: blog.user_id }
        });
        if (user && user.imgKey) {
            arr.push({ key: user.imgKey })

        }
    } catch (error) {
        const msg = getErrorMessage(error);
        console.error(msg);
    }

    if (arr && arr.length > 0) {
        await Promise.all(arr.map(async (key) => {
            if (key.key) {
                try {
                    const getImgkey = await prisma.deletedImg.findUnique({
                        where: { imgKey: key.key }
                    });
                    if (getImgkey) {

                        await prisma.deletedImg.update({
                            where: {
                                id: getImgkey.id
                            },
                            data: {
                                count: getImgkey.count ? getImgkey.count + 1 : 1
                            }
                        });
                    } else if (!getImgkey && key.key) {
                        await prisma.deletedImg.create({
                            data: {
                                imgKey: key.key,
                                count: 1,
                                del: false,
                            }
                        })
                    }

                } catch (error) {
                    const msg = getErrorMessage(error);
                    console.error(msg);
                }
            }
        }));
    }

    await prisma.$disconnect();
}