"use client";
import React from 'react';
import Blogs from "@/components/blogs/blogsInjection";
// import { useEditor } from '../context/editorContext';
import { blogType, } from '../editor/Types';
import ModSelector from "@/components/editor/modSelector";
import Service from "@/components/common/services";
import User from '../user/userMain';
import Nav from '../nav/headerNav';
import styles from "./blogs.module.css";
import Header from '../editor/header';



export default function Index({ blogs }: { blogs: blogType[] }) {
    // const { data: session, status } = useSession();
    const inRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && inRef.current && countRef.current === 0) {
            const modSelector = new ModSelector();
            const service = new Service(modSelector);
            // const user = new User(modSelector, service);
            const initBlogs = new Blogs(modSelector, service);
            const injectBlogs = document.getElementById("injectBlogs") as HTMLElement;
            if (blogs) {
                initBlogs.showBlogs({ parent: injectBlogs, home: false, blogs }).then(() => {
                    countRef.current++; //controls run once
                    Nav.cleanUpByQueryKeep(injectBlogs, "section#blogs-container");//removes duplicates on useEffect() double execution on run dev
                    initBlogs.blogsLoading({ parent: injectBlogs, loaded: true });
                });
            } else {
                initBlogs.blogsLoading({ parent: injectBlogs, loaded: false });
            }
        }
    }, [blogs, inRef, countRef]);

    return (
        <div className={styles.injectBlogs}>

            <div id="injectBlogs" ref={inRef}></div>
        </div>
    )
}

