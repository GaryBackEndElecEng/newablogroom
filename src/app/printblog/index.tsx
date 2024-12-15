"use client";
import { blogType, userType } from '@/components/editor/Types';
import React from 'react'
import PrintPdf from './printPdf';
import ModSelector from '@/components/editor/modSelector';
import Service from '@/components/common/services';
import User from '@/components/user/userMain';
import ShapeOutside from '@/components/editor/shapeOutside';
import NewCode from '@/components/editor/newCode';
import ChartJS from '@/components/chart/chartJS';
import CodeElement from '@/components/common/codeElement';
import DisplayBlog from '@/components/blog/displayBlog';
import Message from '@/components/common/message';
import Header from '@/components/editor/header';

export default function Index({ blog, user }: { blog: blogType, user: userType | null }) {
    const clientRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && clientRef.current) {
            const target = document.getElementById("show-blog-index") as HTMLElement;
            if (target && blog) {
                // Header.cleanUpByID(target, "div#show-blog-index")
                const _modSelector = new ModSelector();
                const _service = new Service(_modSelector);
                const _user = new User(_modSelector, _service);
                const shapeOutside = new ShapeOutside(_modSelector, _service, _user);
                const code = new NewCode(_modSelector, _service, _user);
                const chart = new ChartJS(_modSelector, _service, _user);
                const codeElement = new CodeElement(_modSelector, _service);
                const message = new Message(_modSelector, _service, blog);
                const displayBlog = new DisplayBlog(_modSelector, _service, _user, shapeOutside, code, chart, message, codeElement);
                const printpdf = new PrintPdf(_service, displayBlog, blog, user);
                printpdf.main({ parent: target });
            }
        }
    }, [blog, user]);

    return (
        <div className=" mx-auto my-2">

            <div id="show-blog-index" ref={clientRef}></div>
        </div>
    )
}
