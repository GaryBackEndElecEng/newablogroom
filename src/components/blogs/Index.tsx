"use client";
import React from 'react';
import Blogs from "@/components/blogs/blogsInjection";
// import { useEditor } from '../context/editorContext';
import { blogType, } from '../editor/Types';
import ModSelector from "@/components/editor/modSelector";
import Service from "@/components/common/services";



export default function Index() {
    // let window: CustomWindow
    const inRef = React.useRef(null);
    React.useEffect(() => {
        if (typeof window !== "undefined" && inRef.current) {
            const url = `/api/savegetblog`;
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            const initBlogs = new Blogs(modSelector, service);
            const injectBlogs = document.getElementById("injectBlogs") as HTMLElement;
            const option = {
                Headers: { "Content-Type": "application/json" },
                method: "GET"
            }
            fetch(url, option).then(async (res) => {

                if (res) {
                    const body = await res.json() as blogType[];
                    modSelector._blogs = body;
                    if (injectBlogs && body) {
                        modSelector._blogs = body;
                        await initBlogs.showBlogs(injectBlogs, false, body);
                    }
                    return
                }
            });
        }
    }, []);

    return (
        <div className="container-fuid mx-auto">

            <div id="injectBlogs" ref={inRef}></div>
        </div>
    )
}

