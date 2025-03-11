"use client";
import React from "react";
import { useEditor } from "./editorContext";
import ModSelector from "@/components/editor/modSelector";
import { blogType } from "../editor/Types";
import Dataset from "../common/dataset";

export const BlogGetter = () => {
    const { blog_, blogs } = useEditor();
    React.useEffect(() => {
        const dataset = new Dataset()
        const modSelector = new ModSelector(dataset);
        if (blog_) {
            modSelector.awaitLoadBlog(blog_).then(async (blog) => {
                blog.blog();
            });
        }
        if (blogs) {
            modSelector.awaitLoadBlogs(blogs).then(async (blogs) => {
                blogs.blogs();
            });
        }
    }, [blog_, blogs]);

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

    return <></>

}