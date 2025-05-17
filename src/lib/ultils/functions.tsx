import { blogType, elementType, postType, rowType, selectorType } from "@/components/editor/Types";

import { getErrorMessage } from "../errorBoundaries";
import prisma from "@/prisma/prismaclient";

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
    const selects = blog?.selectors;
    const elements = blog?.elements;
    if (selects) {
        selects.map(select => {
            if (!select) return;
            const rows = JSON.parse(select.rows as string) as rowType[];
            rows.map(row => {
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

    const arr: { key: string }[] = [];
    const selects = (blog?.selectors?.length) ? blog.selectors as selectorType[] : null;
    const elements = (blog?.elements?.length) ? blog.elements as elementType[] : null;
    if (selects) {
        selects.map(select => {
            if (select) {
                const rows = JSON.parse(select.rows as string) as rowType[];
                rows.map(row => {
                    if (row) {
                        if (row.imgKey) {
                            arr.push({ key: row.imgKey });
                        };
                        row.cols.map(col => {
                            if (col) {
                                if (col.imgKey) {
                                    arr.push({ key: col.imgKey });
                                };
                                col.elements.map(ele => {
                                    if (ele?.imgKey) {
                                        arr.push({ key: ele.imgKey })
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else if (elements) {
        elements.map(ele => {
            if (ele?.imgKey) {
                arr.push({ key: ele.imgKey })
            }
        });

    };
    if (blog.imgKey) {
        arr.push({ key: blog.imgKey });
    }
    if (blog.imgBgKey) {
        arr.push({ key: blog.imgBgKey });
    }
    await MarkCountKeys({ keys: arr });

};

export async function MarkCountKeys(item: { keys: { key: string }[] }): Promise<void> {
    const { keys } = item;
    try {
        await Promise.all(keys.map(async (res) => {
            if (res.key) {
                const markDel = await prisma.deletedImg.findUnique({
                    where: { imgKey: res.key },

                });
                if (markDel) {
                    await prisma.deletedImg.update({
                        where: { id: markDel.id },
                        data: {
                            count: markDel.count ? markDel.count + 1 : null
                        }
                    });
                }

            }
        }));
        return await prisma.$disconnect();
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        return await prisma.$disconnect();
    }
};


export async function markUserBlogsPosts(item: { user_id: string }): Promise<void> {
    //MARKS ALL IMGKEY:IMAGES FOR BLOGS AND POSTS
    const { user_id } = item;
    try {
        const blogs = await prisma.blog.findMany({
            where: { user_id: user_id },
        });
        if (blogs && blogs.length > 0) {
            blogs.map(async (blog) => {
                if (blog) {
                    await markBlogImgs({ blog: blog as unknown as blogType });
                }
            });
        }
        const posts = await prisma.post.findMany({
            where: { userId: user_id },
        });
        if (posts && posts.length > 0) {
            await markPostsImg({ posts: posts as unknown as postType[] })
        }


    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
    } finally {
        await prisma.$disconnect();
    }
};



export async function markDelete(item: { imgKey: string }) {
    const { imgKey } = item;
    try {
        await prisma.deletedImg.update({
            where: { imgKey: imgKey },
            data: {
                del: true
            }
        });
        return await prisma.$disconnect();
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        return await prisma.$disconnect();
    };
};


export async function markBlogImgs(item: { blog: blogType }) {
    const { blog } = item;
    await markSelectors({ selectors: blog.selectors });
    await markElements({ elements: blog.elements });
}
export async function markSelectors(item: { selectors: selectorType[] }) {
    const { selectors } = item;
    if (!(selectors && selectors.length > 0)) return;
    selectors.map(async (selector) => {
        if (selector) {
            await markSelectorImg({ selector });
        }
    });
}

export async function markSelectorImg(item: { selector: selectorType }) {
    const { selector } = item;
    try {
        if (!selector) return;
        const rows = JSON.parse(selector.rows as string) as rowType[];
        rows.map(async (row) => {
            if (row) {
                if (row.imgKey) {
                    await markDelete({ imgKey: row.imgKey })
                }
                row.cols.map(async (col) => {
                    if (col) {
                        if (col.imgKey) {
                            await markDelete({ imgKey: col.imgKey });
                        }
                        col.elements.map(async (ele) => {
                            if (ele) {
                                if (ele.imgKey) {
                                    await markDelete({ imgKey: ele.imgKey });
                                }
                            }
                        });
                    }
                });
            }
        });
        return await prisma.$disconnect();
    } catch (error) {
        const msg = getErrorMessage(error);
        console.log(msg);
        return await prisma.$disconnect();
    };
}
export async function markElements(item: { elements: elementType[] }) {
    const { elements } = item;
    elements.map(async (ele) => {
        if (ele) {
            if (ele.imgKey) {
                await markDelete({ imgKey: ele.imgKey });
            }
        }
    });
}
export async function markPostsImg(item: { posts: postType[] }) {
    const { posts } = item;
    posts.map(async (post) => {
        if (post?.imageKey) {
            await markDelete({ imgKey: post.imageKey });
        }
    });

};

export function getFreeBgImageUrl({ imgKey }: { imgKey: string }): string {
    const freeUrl = "https://newablogroom-free-bucket.s3.us-east-1.amazonaws.com"
    return `${freeUrl}/${imgKey}`
};