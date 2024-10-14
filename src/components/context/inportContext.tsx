"use client";
import React from "react";
import { useEditor } from "./editorContext";
import ModSelector from "@/components/editor/modSelector";
import { blogType } from "../editor/Types";

export const BlogGetter = () => {
    const { blog_, blogs } = useEditor();
    React.useEffect(() => {
        const modSelector = new ModSelector();
        if (blog_) {
            modSelector.awaitBlog(blog_).then(async (blog) => {
                blog.blog();
            });
        }
        if (blogs) {
            modSelector.awaitBlogs(blogs).then(async (blogs) => {
                blogs.blogs();
            });
        }
    }, [blog_, blogs]);
    // const Icon = <IconComponent style={css} /> as React.ReactNode;
    // const doc = createRoot(parent);
    // doc.render(Icon);
    return <></>

}
export const BlogSetter = ({ blog, blogs }: { blog: blogType, blogs: blogType[] }) => {
    const { setBlog_, setBlogs } = useEditor();

    React.useEffect(() => {
        if (blog) {
            setBlog_(blog);
        }
        if (blogs) {
            setBlogs(blogs)
        }
    }, [blog, blogs, setBlogs, setBlog_]);
    // const Icon = <IconComponent style={css} /> as React.ReactNode;
    // const doc = createRoot(parent);
    // doc.render(Icon);
    return <></>

}