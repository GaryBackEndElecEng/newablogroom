"use client";
import { blogType, userType } from '@/components/editor/Types';
import React from 'react'
import PrintPdf from './printPdf';
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import User from '@/components/user/userMain';
import ShapeOutside from '@/components/editor/shapeOutside';
import ChartJS from '@/components/chart/chartJS';
import DisplayBlog from '@/components/blog/displayBlog';
import Message from '@/components/common/message';
import Headerflag from '@/components/editor/headerFlag/headerflag';
import Dataset from '@/components/common/dataset';
import Design from '@/components/common/design';
import Ven from '@/components/common/venDiagram';
import Reference from '@/components/editor/reference';
import PasteCode from '@/components/common/pasteCode';
import HtmlElement from '@/components/editor/htmlElement';
import AuthService from '@/components/common/auth';
import RegSignIn from '@/components/nav/regSignin';
import styles from "./printPdf.module.css";

export default function Index({ blog, owner, user }: { blog: blogType, owner: userType | null, user: userType | null }) {
    const clientRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && clientRef.current && countRef.current === 0) {
            const target = document.getElementById("show-blog-index") as HTMLElement;
            if (target && blog) {
                target.className = styles.printpdfMain;

                const dataset = new Dataset();
                const _modSelector = new ModSelector(dataset);
                const _service = new Service(_modSelector);
                const auth = new AuthService(_modSelector, _service);
                _modSelector.awaitLoadBlog(blog);
                auth.getUser({ user, count: countRef.current }).then(async (_res) => {
                    if (_res) {
                        countRef.current = _res.count + 1;
                        const design = new Design(_modSelector);
                        const regSignIn = new RegSignIn(_modSelector, _service, _res.user, _res.status)
                        const _user = new User(_modSelector, _service, _res.status, regSignIn, _res.user);
                        const ven = new Ven(_modSelector);
                        const reference = new Reference(_modSelector);
                        const pasteCode = new PasteCode(_modSelector, _service);
                        const headerFlag = new Headerflag(_modSelector, _service, _user);
                        const shapeOutside = new ShapeOutside(_modSelector, _service, _user);
                        const message = new Message(_modSelector, _service, blog, null, null);
                        const chart = new ChartJS(_modSelector, _service, _user, message);
                        const htmlElement = new HtmlElement(_modSelector, _service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode);
                        const displayBlog = new DisplayBlog(_modSelector, _service, _user, blog, chart, message, htmlElement);
                        const printpdf = new PrintPdf(_modSelector, _service, displayBlog, blog, owner);
                        printpdf.main({ parent: target });
                    }
                });


            }
        }
    }, [blog, owner, user]);

    return (
        <div className=" mx-auto my-2">

            <div id="show-blog-index" ref={clientRef} ></div>
        </div>
    )
}
