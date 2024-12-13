
import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, element_selType, elementType, codeType, rowType, colType, chartType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { findCountKeys } from "@/lib/ultils/functions";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        // console.log("BLOG:=>>>", getBlog)

        const selects = (getBlog.selectors && getBlog.selectors.length > 0) ? getBlog.selectors as unknown[] as selectorType[] : null;
        const eles = (getBlog.elements && getBlog.elements.length > 0) ? getBlog.elements as unknown[] as elementType[] : null;
        const codes = (getBlog.codes && getBlog.codes.length > 0) ? getBlog.codes as unknown[] as codeType[] : null;
        const charts = (getBlog.charts && getBlog.charts.length > 0) ? getBlog.charts as unknown[] as chartType[] : null;
        await deleteSeletors(getBlog);//deleting selectors
        await deleteElements(getBlog);//deleting elements
        await deleteCodes(getBlog);//deleting codess
        await deleteCharts(getBlog);//deleting codess
        if (getBlog.user_id && getBlog.id) {
            try {
                const blog = await prisma.blog.upsert({
                    where: { id: getBlog.id, user_id: getBlog.user_id },
                    create: {
                        name: getBlog.name ? getBlog.name : "filename/title",
                        desc: getBlog.desc ? getBlog.desc : "blog's description",
                        user_id: getBlog.user_id as string,
                        img: getBlog.img ? getBlog.img : null,
                        eleId: getBlog.eleId,
                        class: getBlog.class,
                        inner_html: getBlog.inner_html ? getBlog.inner_html : null,
                        cssText: getBlog.cssText,
                        show: getBlog.show,
                        attr: getBlog.attr ? getBlog.attr : "circle",
                        username: getBlog.username,
                        rating: getBlog.rating ? getBlog.rating : 1,
                        title: getBlog.title ? getBlog.title : "title"

                    },
                    update: {
                        name: getBlog.name,
                        desc: getBlog.desc,
                        img: getBlog.img,
                        imgKey: getBlog.imgKey,
                        imgBgKey: getBlog.imgBgKey ? getBlog.imgBgKey : null,
                        class: getBlog.class,
                        inner_html: getBlog.inner_html ? getBlog.inner_html : null,
                        cssText: getBlog.cssText,
                        show: getBlog.show,
                        attr: getBlog.attr ? getBlog.attr : "circle",
                        username: getBlog.username,
                        title: getBlog.title ? getBlog.title : "title"
                    }
                });
                if (blog) {

                    let newBlog: blogType = {} as blogType;
                    let updateSelects: selectorType[] = [];
                    let update_elements: elementType[] = [];
                    let update_codes: codeType[] = [];
                    let update_charts: chartType[] = [];
                    if (selects && selects.length > 0) {
                        updateSelects = await Promise.all(
                            selects && selects.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (select) => {
                                const select_ = await prisma.selector.create({

                                    data: {
                                        placement: select.placement,
                                        name: select.name,
                                        eleId: select.eleId,
                                        class: select.class,
                                        cssText: select.cssText,
                                        blog_id: blog.id,
                                        header: select.header,
                                        rowNum: select.rowNum,
                                        colNum: select.colNum,
                                        inner_html: select.inner_html,
                                        footer: select.footer,
                                        headerType: select.headerType ? select.headerType : null
                                    },
                                });

                                const tempColAttr = await Promise.all(select.colAttr && select.colAttr.map(async (colA) => {
                                    const colAttr_ = await prisma.colAttr.create({
                                        data: {
                                            selector_id: select_.id,
                                            T: colA.T,
                                            B: colA.B
                                        },
                                    });
                                    return colAttr_;
                                }));
                                select = { ...select, colAttr: tempColAttr, id: select_.id, blog_id: blog.id }
                                const tempRows = await rows(select)
                                select = { ...select, rows: tempRows } //adding rows(cols,eles)
                                // console.log("select", select)
                                return select


                            }) as unknown[] as selectorType[]
                        );

                    }
                    if (eles && eles.length > 0) {
                        // console.log("eles", eles)//works
                        update_elements = await Promise.all(
                            eles.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (ele) => {
                                const ele_ = await prisma.element.create({
                                    data: {
                                        blog_id: blog.id,
                                        class: ele.class,
                                        inner_html: ele.inner_html,
                                        cssText: ele.cssText,
                                        name: ele.name,
                                        eleId: ele.eleId,
                                        placement: ele.placement ? ele.placement : ele.id,
                                        img: !ele.imgKey ? ele.img : null,
                                        imgKey: ele.imgKey,
                                        attr: ele.attr
                                    },
                                });
                                return { ...ele, blog_id: blog.id, id: ele_.id };
                            }) as unknown[] as elementType[]
                        );
                    }
                    if (codes && codes.length > 0) {
                        update_codes = await Promise.all(
                            codes.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (code) => {
                                const code_ = await prisma.code.create({
                                    data: {
                                        name: code.name,
                                        eleId: code.eleId,
                                        class: code.class,
                                        blog_id: blog.id,
                                        cssText: code.cssText,
                                        img: code.cssText,
                                        type: code.type ? code.type : "code",
                                        inner_html: code.inner_html,
                                        placement: code.placement ? code.placement as number : null,
                                        template: code.template
                                    },
                                });

                                if (code_) {
                                    const linecodes = await Promise.all(code.linecode.sort((a, b) => { if (a.id < b.id) return -1; return 1 }).map(async (linecode) => {
                                        const linecode_ = await prisma.linecode.upsert({
                                            where: { id: linecode.id },
                                            create: {
                                                code_id: code_.id,
                                                text: linecode.text,
                                            },
                                            update: {
                                                text: linecode.text
                                            }
                                        });
                                        return linecode_;
                                    }));
                                    return { ...code, id: code_.id, linecode: linecodes }
                                }
                            })
                        ) as unknown[] as codeType[];
                    }
                    if (charts && charts.length > 0) {
                        // console.log("charts", charts)//works
                        update_charts = await Promise.all(charts.sort((a, b) => { if (a.placement < b.placement) return -1; else return 1 }).map(async (chart) => {

                            const chart_ = await prisma.chart.create({
                                data: {
                                    type: chart.type,
                                    chartOption: chart.chartOption,
                                    placement: chart.placement,
                                    eleId: chart.eleId,
                                    blog_id: blog.id
                                }
                            });
                            return chart_ as chartType;

                        })) as chartType[];


                    }
                    newBlog = { ...blog, selectors: updateSelects, elements: update_elements, codes: update_codes, charts: update_charts } as blogType;
                    await findCountKeys(blog as unknown as blogType); //adds count to imgKeys
                    res.status(200).json(newBlog);
                    return await prisma.$disconnect();
                } else {
                    res.status(400).json({ message: "no body provided" });
                    return await prisma.$disconnect();
                }


            } catch (error) {
                const msg = getErrorMessage(error);
                console.log("error: ", msg)
                res.status(400).json({ message: msg })
            } finally {
                return await prisma.$disconnect()
            }
        } else {
            res.status(400).json({ message: "no user_id" })
            return await prisma.$disconnect();
        }
    } else if (req.method === "GET") {
        //-------------( GETS ALL BLOGS ) -------------//
        try {
            const blogs = await prisma.blog.findMany({
                where: { show: true },
                select: {
                    id: true,
                    name: true,
                    title: true,
                    desc: true,
                    img: true,
                    attr: true,
                    rating: true,
                    imgKey: true,
                    date: true,
                    update: true,
                    show: true,
                    username: true,
                    messages: true,


                }
            }) as unknown[] as blogType[];
            // const blogsWithImgs = await getUserBlogsImgs(blogs);
            res.status(200).json(blogs)
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg)
            res.status(400).json({ message: msg })
            return await prisma.$disconnect();
        } finally {
            return await prisma.$disconnect();
        }

    }
}

async function rows(selector: selectorType) {
    const tempRows = await Promise.all(selector.rows ? selector.rows.sort((a, b) => { if (a.order < b.order) return -1; return 1 }).map(async (row) => {
        const row_ = await prisma.row.create({
            data: {
                name: row.name,
                eleId: row.eleId,
                class: row.class,
                cssText: row.cssText,
                imgKey: row.imgKey ? row.imgKey : null,
                selector_id: selector.id,
                inner_html: row.inner_html,
                order: row.order
            },

        })
        if (row_ as unknown as rowType) {
            row = { ...row, id: row_.id, selector_id: selector.id }
            const tempCols = await cols(row, row_.id);
            return { ...row, cols: tempCols } as rowType;
        }

    }) : [] as rowType[]) as unknown[] as rowType[];
    return tempRows
}
async function cols(row: rowType, row_id: number) {
    const tempCols = await Promise.all(row.cols ? row.cols.sort((a, b) => { if (a.order < b.order) { return -1 } else return 1 }).map(async (col) => {
        const col_ = await prisma.col.create({
            data: {
                name: col.name,
                eleId: col.eleId,
                class: col.class,
                cssText: col.cssText,
                row_id: row_id,
                inner_html: col.inner_html,
                imgKey: col.imgKey ? col.imgKey : null,
                order: col.order
            }
        });
        col = { ...col, id: col_.id, row_id: row_id }
        const elements_ = await Elements(col, col_.id, row.selector_id);
        col = { ...col, elements: elements_ }
        return col;
    }) : [] as colType[]);
    return tempCols as unknown as colType[];
};
async function Elements(col: colType, col_id: number, selector_id: number) {
    const tempEles = await Promise.all(col.elements ? col.elements.sort((a, b) => { if (a.order < b.order) return -1; return 1 }).map(async (ele) => {
        const ele_ = await prisma.element_sel.create({
            data: {
                placement: ele.placement ? ele.placement : ele.id,
                name: ele.name,
                class: ele.class,
                inner_html: ele.inner_html,
                cssText: ele.cssText,
                selectorId: selector_id,
                col_id: col_id,
                eleId: ele.eleId,
                img: ele.img ? ele.img : null,
                imgKey: ele.imgKey ? ele.imgKey : null,
                attr: ele.attr,
                order: ele.order
            },
        });
        ele = { ...ele, id: ele_.id, col_id: col_id }
        return ele;
    }) : [] as element_selType[]) as unknown[] as element_selType[];
    return tempEles
}

async function deleteSeletors(blog: blogType) {
    if (blog && blog.id) {
        try {
            await prisma.selector.deleteMany({
                where: { blog_id: blog.id }
            });
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            await prisma.$disconnect()
        }
    }
}
async function deleteElements(blog: blogType) {
    if (blog && blog.id) {
        try {
            await prisma.element.deleteMany({
                where: { blog_id: blog.id }
            });
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            await prisma.$disconnect()
        }
    }
}
async function deleteCodes(blog: blogType) {
    if (blog && blog.id) {
        try {
            await prisma.code.deleteMany({
                where: { blog_id: blog.id }
            });
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            await prisma.$disconnect()
        }
    }
}
async function deleteCharts(blog: blogType) {
    if (blog && blog.id) {
        try {
            await prisma.chart.deleteMany({
                where: { blog_id: blog.id }
            });
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            await prisma.$disconnect()
        }
    }
}



