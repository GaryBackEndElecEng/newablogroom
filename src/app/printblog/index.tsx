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
import DisplayBlog from '@/components/blog/displayBlog';
import Message from '@/components/common/message';
import Headerflag from '@/components/editor/headerflag';
import Dataset from '@/components/common/dataset';
import Design from '@/components/common/design';
import Ven from '@/components/common/venDiagram';
import Reference from '@/components/editor/reference';
import PasteCode from '@/components/common/pasteCode';
import HtmlElement from '@/components/editor/htmlElement';
import AuthService from '@/components/common/auth';

export default function Index({ blog, owner }: { blog: blogType, owner: userType | null }) {
    const clientRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && clientRef.current) {
            const target = document.getElementById("show-blog-index") as HTMLElement;
            if (target && blog) {
                // Header.cleanUpByID(target, "div#show-blog-index")
                const dataset = new Dataset();
                const _modSelector = new ModSelector(dataset);
                const _service = new Service(_modSelector);
                const auth = new AuthService(_modSelector, _service);
                const _user = new User(_modSelector, _service, auth);
                _modSelector.awaitLoadBlog(blog).then(async (res) => {
                    const _blog = res.blog();
                    if (_blog) {

                        const design = new Design(_modSelector);
                        const ven = new Ven(_modSelector);
                        const reference = new Reference(_modSelector);
                        const pasteCode = new PasteCode(_modSelector, _service);
                        const headerFlag = new Headerflag(_modSelector, _service, _user);
                        const shapeOutside = new ShapeOutside(_modSelector, _service, _user);
                        const code = new NewCode(_modSelector, _service, _user);
                        const chart = new ChartJS(_modSelector, _service, _user);
                        const message = new Message(_modSelector, _service, _blog, null);
                        const htmlElement = new HtmlElement(_modSelector, _service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode);
                        const displayBlog = new DisplayBlog(_modSelector, _service, _user, code, chart, message, htmlElement);
                        const printpdf = new PrintPdf(_modSelector, _service, displayBlog, _blog, owner);
                        printpdf.main({ parent: target });
                    }
                });
            }
        }
    }, [blog, owner]);

    return (
        <div className=" mx-auto my-2">

            <div id="show-blog-index" ref={clientRef}></div>
        </div>
    )
}
