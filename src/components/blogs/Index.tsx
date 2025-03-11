"use client";
import React from 'react';
import Blogs from "@/components/blogs/blogsInjection";
import { blogType, } from '../editor/Types';
import ModSelector from "@/components/editor/modSelector";
import Service from "@/components/common/services";
import Nav from '../nav/headerNav';
import styles from "./blogs.module.css";
import Dataset from '../common/dataset';



export default function Index({ blogs }: { blogs: blogType[] }) {

    const inRef = React.useRef(null);
    const countRef = React.useRef(0);
    React.useEffect(() => {
        if (typeof window !== "undefined" && inRef.current && countRef.current === 0) {
            const dataset = new Dataset();
            const modSelector = new ModSelector(dataset);
            const service = new Service(modSelector);
            const injectBlogs = document.getElementById("injectBlogs") as HTMLElement;
            const initBlogs = new Blogs(modSelector, service);

            initBlogs.awaitBlogs(blogs).then(async (_blogs) => {
                if (_blogs) {
                    if (countRef.current === 0) {
                        countRef.current++; //controls run once
                        initBlogs.showBlogs({ parent: injectBlogs, home: false, blogs: _blogs }).then(() => {
                            Nav.cleanUpByQueryKeep(injectBlogs, "section#blogs-container");//removes duplicates on useEffect() double execution on run dev
                        });
                    };
                }
            });
        }
    }, [blogs, inRef, countRef]);

    return (
        <div className={styles.injectBlogs}>

            <div id="injectBlogs" ref={inRef}></div>
        </div>
    )
}

