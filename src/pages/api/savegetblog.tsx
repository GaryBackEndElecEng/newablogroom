import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, element_selType, elementType, codeType, rowType, colType, chartType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { findCountKeys } from "@/lib/ultils/functions";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        // console.log("BLOG:=>>>", getBlog)
        if (getBlog && typeof (getBlog) === "object") {
            await deleteElements({ blog: getBlog });
            await deleteSelectors({ blog: getBlog });
            await deleteCharts({ blog: getBlog });
            const selects = (getBlog.selectors && getBlog.selectors.length > 0) ? getBlog.selectors as unknown[] as selectorType[] : null;
            const eles = (getBlog.elements && getBlog.elements.length > 0) ? getBlog.elements as unknown[] as elementType[] : null;
            const codes = (getBlog.codes && getBlog.codes.length > 0) ? getBlog.codes as unknown[] as codeType[] : null;
            const charts = (getBlog.charts && getBlog.charts.length > 0) ? getBlog.charts as unknown[] as chartType[] : null;
            if (getBlog.user_id) {
                console.log("USER ID", getBlog.user_id, "blog.id", getBlog.id)//works
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
                            //SELECT.ROWS=> STRING JSON.STRINGIFY ON DB SIDE: CLIENT SIDE:ROWS[]
                            updateSelects = await Promise.all(
                                selects && selects.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (select) => {
                                    const select_ = await prisma.selector.upsert({
                                        where: { id: select.id },
                                        update: {
                                            class: select.class,
                                            cssText: select.cssText,
                                            rows: select.rows,
                                            inner_html: select.inner_html,
                                            placement: select.placement,
                                            header: select.header,
                                            rowNum: select.rowNum,
                                            colNum: select.colNum,
                                            footer: select.footer,
                                            headerType: select.headerType ? select.headerType : null
                                        },
                                        create: {
                                            placement: select.placement,
                                            name: select.name,
                                            eleId: select.eleId,
                                            class: select.class,
                                            cssText: select.cssText,
                                            blog_id: blog.id,
                                            header: select.header,
                                            rowNum: select.rowNum,
                                            colNum: select.colNum,
                                            rows: select.rows,
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
                                    // console.log("select", select)
                                    return select


                                }) as unknown[] as selectorType[]
                            );

                        }
                        if (eles && eles.length > 0) {
                            // console.log("eles", eles)//works
                            update_elements = await Promise.all(
                                eles.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (ele) => {
                                    const ele_ = await prisma.element.upsert({
                                        where: { id: ele.id },
                                        create: {
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
                                        update: {
                                            class: ele.class,
                                            inner_html: ele.inner_html,
                                            cssText: ele.cssText,
                                            img: !ele.imgKey ? ele.img : null,
                                            imgKey: ele.imgKey,
                                            attr: ele.attr,
                                            placement: ele.placement ? ele.placement : ele.id,
                                        },
                                    });
                                    return { ...ele, blog_id: blog.id, id: ele_.id };
                                }) as unknown[] as elementType[]
                            );
                        }
                        if (codes && codes.length > 0) {
                            update_codes = await Promise.all(
                                codes.sort((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (code) => {
                                    const code_ = await prisma.code.upsert({
                                        where: { id: code.id },
                                        create: {
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
                                        update: {
                                            class: code.class,
                                            cssText: code.cssText,
                                            img: code.cssText,
                                            inner_html: code.inner_html,
                                            placement: code.placement ? code.placement as number : null,
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

                                const chart_ = await prisma.chart.upsert({
                                    where: { id: chart.id },
                                    create: {
                                        type: chart.type,
                                        chartOption: chart.chartOption,
                                        placement: chart.placement,
                                        eleId: chart.eleId,
                                        blog_id: blog.id
                                    },
                                    update: {
                                        type: chart.type,
                                        chartOption: chart.chartOption,
                                    },
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
        } else {
            res.status(400).json({ msg: "no blogs recieved" });
        };
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

export async function deleteElements(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog && blog.elements && blog.elements.length > 0)) {

        const elements: elementType[] = blog.elements;

        try {
            const getElements = await prisma.element.findMany({
                where: { blog_id: blog.id }
            });
            if ((getElements && getElements.length > 0)) {

                await Promise.all(getElements.map(async (ele) => {
                    if (ele && ele.id) {
                        const isInDb = elements.find(ele_ => (ele_.id === ele.id));
                        if (!isInDb) {
                            await prisma.element.delete({
                                where: { id: ele.id }
                            });
                        }
                    }
                }));
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            return await prisma.$disconnect();
        }
    };
}
export async function deleteSelectors(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog && blog.selectors && blog.selectors.length > 0)) {

        const selectors: selectorType[] = blog.selectors
        try {
            const getSelectors = await prisma.selector.findMany({
                where: { blog_id: blog.id }
            });
            if ((getSelectors && getSelectors.length > 0)) {

                await Promise.all(getSelectors.map(async (sel) => {
                    if (sel && sel.id) {
                        const isInDb = selectors.find(sel_ => (sel_.id === sel.id));
                        if (!isInDb) {
                            await prisma.selector.delete({
                                where: { id: sel.id }
                            });
                        }
                    }
                }));
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            return await prisma.$disconnect();
        }
    };
}
export async function deleteCharts(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog && blog.charts && blog.charts.length > 0)) {

        const charts: chartType[] = blog.charts
        try {
            const getCharts = await prisma.chart.findMany({
                where: { blog_id: blog.id }
            });
            if ((getCharts && getCharts.length > 0)) {

                await Promise.all(getCharts.map(async (cht) => {
                    if (cht && cht.id) {
                        const isInDb = charts.find(cht_ => (cht_.id === cht.id));
                        if (!isInDb) {
                            await prisma.chart.delete({
                                where: { id: cht.id }
                            });
                        }
                    }
                }));
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            return await prisma.$disconnect();
        }
    };
}




