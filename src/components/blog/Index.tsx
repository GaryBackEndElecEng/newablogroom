"use client"
import React from 'react'
import { blogType, userType } from '../editor/Types';
import DisplayBlog from "@/components/blog/displayBlog";
import ModSelector from "@/components/editor/modSelector";
import Service from '../common/services';
import User from '../user/userMain';
import ShapeOutside from '../editor/shapeOutside';
import Misc from '../common/misc';
import NewCode from '../editor/newCode';
import ChartJS from '../chart/chartJS';
import Message from '../common/message';
import Headerflag from '../editor/headerflag';
import styles from "./blog.module.css";
import Dataset from '../common/dataset';
import HtmlElement from '../editor/htmlElement';
import Design from '../common/design';
import Ven from '../common/venDiagram';
import Reference from '../editor/reference';
import PasteCode from '../common/pasteCode';
import AuthService from '../common/auth';


function Index({ blog, user }: { blog: blogType | null, user: userType | null }) {
    const clientRef = React.useRef(null);
    const countRef = React.useRef(0);




    React.useEffect(() => {
        if (countRef.current > 0) return;
        if (typeof window !== "undefined" && clientRef.current) {
            const target = document.querySelector("section#client_blog") as HTMLElement;
            if (target) {
                const maxWidth = window.innerWidth < 900 ? "100%" : "75%";
                const dataset = new Dataset();
                const _modSelector = new ModSelector(dataset);
                const _service = new Service(_modSelector);
                const auth = new AuthService(_modSelector, _service);
                const _user = new User(_modSelector, _service, auth);
                if (blog) {

                    _modSelector.awaitLoadBlog(blog).then(async (res) => {
                        const _blog = res.blog();
                        if (_blog) {
                            const design = new Design(_modSelector);
                            const ven = new Ven(_modSelector);
                            const reference = new Reference(_modSelector);
                            const shapeOutside = new ShapeOutside(_modSelector, _service, _user);
                            const headerFlag = new Headerflag(_modSelector, _service, _user);
                            const pasteCode = new PasteCode(_modSelector, _service);
                            const htmlElement = new HtmlElement(_modSelector, _service, _user, shapeOutside, design, ven, reference, headerFlag, pasteCode)
                            target.style.maxWidth = "auto";
                            Misc.matchMedia({ parent: target, maxWidth: 420, cssStyle: { maxWidth: maxWidth, width: "100%", paddngInline: "0rem" } })

                            // GET BLOG
                            const message = new Message(_modSelector, _service, _blog, null);
                            const chart = new ChartJS(_modSelector, _service, _user, message);
                            const displayBlog = new DisplayBlog(_modSelector, _service, _user, _blog, chart, message, htmlElement);
                            displayBlog._onlyMeta = true;
                            displayBlog.main({ parent: target, blog: _blog, user: user });
                            countRef.current++;
                        }
                    });
                }
            }
        }

    }, [countRef, clientRef, blog, user]);


    return (
        <div className={styles.client_blog}>
            <section className="client_blog" id="client_blog" ref={clientRef}></section>
        </div>
    )
}

export default Index

