"use client"
import React from 'react'
// import { useEditor } from '../context/editorContext';
import { blogType, userType } from '../editor/Types';
import DisplayBlog from "@/components/blog/displayBlog";
import ModSelector from "@/components/editor/modSelector";
import Service from '../common/services';
import User from '../user/userMain';
// import Message from '@/components/common/message';
import ShapeOutside from '../editor/shapeOutside';
import Misc from '../common/misc';
import NewCode from '../editor/newCode';
import ChartJS from '../chart/chartJS';
import Message from '../common/message';
import { useSession } from 'next-auth/react';
// import { Session } from 'next-auth';

// const url = process.env.BASE_URL as string;

function Index({ blog, user }: { blog: blogType | null, user: userType | null }) {
    const clientRef = React.useRef(null);
    const countRef = React.useRef(0);




    React.useEffect(() => {
        if (countRef.current > 0) return;
        if (typeof window !== "undefined" && clientRef.current) {
            const _modSelector = new ModSelector();
            const maxWidth = window.innerWidth < 900 ? "100%" : "75%";
            const target = document.querySelector("section#client_blog") as HTMLElement;
            if (target) {
                const _service = new Service(_modSelector);
                const _user = new User(_modSelector, _service);
                const shapeOutside = new ShapeOutside(_modSelector, _service, _user);
                const code = new NewCode(_modSelector, _service, _user);
                const chart = new ChartJS(_modSelector, _service, _user);
                if (target) {
                    target.style.maxWidth = "auto";
                    Misc.matchMedia({ parent: target, maxWidth: 420, cssStyle: { maxWidth: maxWidth, width: "100%", paddngInline: "0rem" } })
                };
                // GET BLOG
                const message = new Message(_modSelector, _service, blog);
                const displayBlog = new DisplayBlog(_modSelector, _service, _user, shapeOutside, code, chart, message);
                displayBlog._onlyMeta = true;
                displayBlog.main({ parent: target, blog: blog, user: user });
                countRef.current++;
            }
        }

    }, [countRef, blog, user]);


    return (
        <div className="container-fluid mx-auto">
            <section className="client_blog" id="client_blog" ref={clientRef}></section>
        </div>
    )
}

export default Index

