import { NextApiRequest, NextApiResponse } from "next";
import { blogType, selectorType, elementType, codeType, chartType } from "@/components/editor/Types";
import { getErrorMessage } from "@/lib/errorBoundaries";
import { findCountKeys } from "@/lib/ultils/functions";
import prisma from "@/prisma/prismaclient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        const getBlog = req.body as blogType;
        const rand = Math.floor(Math.random() * 1000);
        // console.log("BLOG:=>>>", getBlog)
        if (getBlog && typeof (getBlog) === "object") {
            const selects = (getBlog?.selectors.length > 0) ? getBlog.selectors as unknown[] as selectorType[] : null;
            const eles = (getBlog?.elements.length > 0) ? getBlog.elements as unknown[] as elementType[] : null;
            const codes = (getBlog?.codes.length > 0) ? getBlog.codes as unknown[] as codeType[] : null;
            const charts = (getBlog?.charts.length > 0) ? getBlog.charts as unknown[] as chartType[] : null;
            await deleteElements({ blog: getBlog });
            await deleteSelectors({ blog: getBlog });
            await deleteCharts({ blog: getBlog });
            await deleteCodes({ blog: getBlog });
            const { id, name, user_id } = getBlog;

            if (user_id && name && id) {
                // console.log("USER ID", getBlog.user_id, "blog.id", getBlog.id)//works
                try {
                    const blog = await prisma.blog.upsert({
                        where: { id, name: name as string, user_id },
                        create: {
                            name: name,
                            desc: getBlog.desc ? getBlog.desc : "blog's description",
                            user_id: getBlog.user_id as string,
                            img: getBlog.img ? getBlog.img : null,
                            eleId: getBlog.eleId,
                            class: getBlog.class,
                            inner_html: getBlog.inner_html ? getBlog.inner_html : null,
                            cssText: getBlog.cssText,
                            show: getBlog.show,
                            attr: getBlog.attr || "circle",
                            username: getBlog.username,
                            rating: getBlog.rating || 1,
                            title: getBlog.title || "title",

                        },
                        update: {
                            title: getBlog.title || "title",
                            desc: getBlog.desc,
                            img: getBlog.img,
                            imgKey: getBlog.imgKey,
                            imgBgKey: getBlog.imgBgKey || null,
                            class: getBlog.class,
                            inner_html: getBlog.inner_html || null,
                            cssText: getBlog.cssText,
                            show: getBlog.show,
                            attr: getBlog.attr || "circle",
                            username: getBlog.username,
                        }
                    });
                    if (blog) {
                        // console.log("blog.id", blog.id, "blog.name", blog.name);//works
                        let newBlog: blogType = {} as blogType;
                        let updateSelects: selectorType[] = [];
                        let update_elements: elementType[] = [];
                        let update_codes: codeType[] = [];
                        let update_charts: chartType[] = [];
                        if (selects && selects?.length > 0) {
                            //SELECT.ROWS=> STRING JSON.STRINGIFY ON DB SIDE: CLIENT SIDE:ROWS[]
                            updateSelects = await Promise.all(
                                selects.toSorted((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (select) => {
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
                                            rows: select.rows,
                                            inner_html: select.inner_html,
                                            footer: select.footer,
                                            headerType: select.headerType ? select.headerType : null
                                        },
                                    });
                                    if (select_) {

                                        const tempColAttr = await Promise.all(select?.colAttr.map(async (colA) => {
                                            const colAttr_ = await prisma.colAttr.create({

                                                data: {
                                                    selector_id: select_.id,
                                                    T: colA.T,
                                                    B: colA.B
                                                }
                                            });
                                            return colAttr_;
                                        }));
                                        select = { ...select_, colAttr: tempColAttr, id: select_.id, blog_id: blog.id } as unknown as selectorType
                                    }
                                    // console.log("select", select)
                                    return select


                                }) as unknown[] as selectorType[]
                            );

                        };
                        if (eles && eles.length > 0) {
                            // console.log("eles", eles)//works
                            update_elements = await Promise.all(
                                eles.toSorted((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (ele) => {
                                    const ele_ = await prisma.element.create({
                                        data: {
                                            blog_id: blog.id,
                                            class: ele.class,
                                            inner_html: ele.inner_html,
                                            cssText: ele.cssText,
                                            name: ele.name,
                                            eleId: ele.eleId,
                                            placement: ele.placement ? ele.placement : ele.id,
                                            img: ele.img,
                                            imgKey: ele.imgKey,
                                            attr: ele.attr,
                                            type: ele.type
                                        }
                                    });
                                    ele = { ...ele_ } as unknown as elementType
                                    return ele;
                                }) as unknown[] as elementType[]
                            );
                        };
                        if (codes && codes.length > 0) {
                            update_codes = await Promise.all(
                                codes.toSorted((a, b) => { if (a.placement < b.placement) return -1; return 1 }).map(async (code) => {
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
                                        }
                                    });

                                    if (code_) {
                                        const linecodes = await Promise.all(code.linecode.toSorted((a, b) => { if (a.id < b.id) return -1; return 1 }).map(async (linecode) => {
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
                                        return { ...code_, linecode: linecodes }
                                    }
                                })
                            ) as unknown[] as codeType[];
                        };
                        if (charts && charts.length > 0) {
                            // console.log("charts", charts)//works
                            update_charts = await Promise.all(charts.toSorted((a, b) => { if (a.placement < b.placement) return -1; else return 1 }).map(async (chart) => {

                                const chart_ = await prisma.chart.create({
                                    data: {
                                        type: chart.type as unknown as string,
                                        chartOption: chart.chartOption,
                                        placement: chart.placement,
                                        eleId: chart.eleId,
                                        cssText: chart.cssText,
                                        class: chart.class,
                                        blog_id: blog.id
                                    }
                                });
                                return chart_ as chartType;

                            })) as chartType[];


                        };
                        newBlog = { ...blog, selectors: updateSelects, elements: update_elements, codes: update_codes, charts: update_charts } as blogType;
                        await findCountKeys(blog as unknown as blogType); //adds count to imgKeys
                        res.status(200).json(newBlog);
                        return await prisma.$disconnect();
                    } else {
                        res.status(400).json({ message: "no body provided" });
                        return await prisma.$disconnect();
                    };

                } catch (error) {
                    const msg = getErrorMessage(error);
                    console.log("error: ", msg)
                    res.status(400).json({ message: msg })
                    return await prisma.$disconnect();
                };
            } else {
                res.status(400).json({ message: "no user_id" })
                return await prisma.$disconnect();
            };
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
            res.status(200).json(blogs)
        } catch (error) {
            const msg = getErrorMessage(error);
            console.log("error: ", msg)
            res.status(400).json({ message: msg })
            return await prisma.$disconnect();
        };

    } else {
        res.status(400).json({ msg: "nothing recieved" });
        await prisma.$disconnect();
    }


}

export async function deleteElements(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog?.elements && blog?.elements?.length > 0)) {

        const elements: elementType[] = blog.elements;

        try {
            if ((elements && elements.length > 0)) {

                const getElements = await prisma.element.findMany({
                    where: { blog_id: blog.id }
                });
                if (getElements) {
                    await Promise.all(getElements.map(async (ele) => {
                        if (ele) {
                            await prisma.element.delete({
                                where: { id: ele.id }
                            });
                        }
                    }));
                }

            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return await prisma.$disconnect();
        };
    };
};


export async function deleteSelectors(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog?.selectors && blog.selectors.length > 0)) {

        const selectors: selectorType[] = blog.selectors

        try {
            if (selectors && selectors.length > 0) {

                const getSelectors = await prisma.selector.findMany({
                    where: { blog_id: blog.id }
                });
                if ((getSelectors && getSelectors.length > 0)) {
                    await Promise.all(getSelectors.map(async (sel) => {
                        if (sel) {
                            await prisma.selector.delete({
                                where: { id: sel.id }
                            });
                        }
                    }));
                };

            };
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return await prisma.$disconnect();
        };
    };
};


export async function deleteCharts(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog?.charts && blog.charts.length > 0)) {

        const charts: chartType[] = blog.charts
        try {
            if (charts && charts.length > 0) {

                const getCharts = await prisma.chart.findMany({
                    where: { blog_id: blog.id }
                });
                if ((getCharts && getCharts.length > 0)) {

                    await Promise.all(getCharts.map(async (cht) => {
                        if (cht) {
                            await prisma.chart.delete({
                                where: { id: cht.id }
                            });
                        }
                    }));
                };

            };
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return await prisma.$disconnect();
        };
    };
};


export async function deleteCodes(item: { blog: blogType }) {
    const { blog } = item;
    if ((blog?.codes && blog.codes.length > 0)) {

        const codes: codeType[] = blog.codes
        try {
            if (codes) {

                const getCodes = await prisma.code.findMany({
                    where: { blog_id: blog.id }
                });
                if ((getCodes && getCodes.length > 0)) {

                    await Promise.all(getCodes.map(async (cht) => {
                        if (cht) {
                            await prisma.chart.delete({
                                where: { id: cht.id }
                            });
                        }
                    }));
                }

            };
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return await prisma.$disconnect();
        };
    };
}




